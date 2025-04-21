
import { useEffect, useState } from "react";

/**
 * Fetch Google Sheet data using Visualization API.
 * Make sure sheetId and sheetName match your actual Sheet and Tab names in Google Sheets.
 *
 * Example sheetId: 1NSHTVXRwe2kBNYprTNr6tE2nRQa2Wk-q6vVVa-BrM9U
 * Example sheetName: Customers
 */
export function useGoogleSheet({ sheetId, sheetName }: { sheetId: string; sheetName: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSheet() {
      setLoading(true);
      setError(null);
      try {
        // Use the latest sheetId/sheetName provided by the user
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
          sheetName
        )}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        const jsonStartIndex = text.indexOf('{');
        const jsonEndIndex = text.lastIndexOf('}');

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
          throw new Error("Invalid response format from Google Sheets");
        }

        const jsonText = text.substring(jsonStartIndex, jsonEndIndex + 1);
        const parsedData = JSON.parse(jsonText);

        if (!parsedData.table || !parsedData.table.cols || !parsedData.table.rows) {
          throw new Error("Sheet data is in unexpected format");
        }

        const cols = parsedData.table.cols.map((c: any) => c.label || "");
        const rows = parsedData.table.rows.map((r: any) =>
          Object.fromEntries(
            r.c.map((c: any, i: number) => [cols[i], c ? c.v : ""])
          )
        );

        setData(rows);
      } catch (err: any) {
        console.error("Error fetching Google Sheet:", err);
        setError(err.message || "Failed to load sheet data.");
      } finally {
        setLoading(false);
      }
    }

    fetchSheet();

    // Set up polling to refresh data periodically (every 30 seconds)
    const intervalId = setInterval(fetchSheet, 30000);

    return () => clearInterval(intervalId);
  }, [sheetId, sheetName]); // sheetId and sheetName will now be dynamic

  return { data, loading, error };
}
