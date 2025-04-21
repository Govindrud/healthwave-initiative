
import { useEffect, useState } from "react";

export function useGoogleSheet({ sheetId, sheetName }: { sheetId: string; sheetName: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSheet() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
          sheetName
        )}`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const cols = json.table.cols.map((c: any) => c.label);
        const rows = json.table.rows.map((r: any) =>
          Object.fromEntries(
            r.c.map((c: any, i: number) => [cols[i], c ? c.v : ""])
          )
        );
        setData(rows);
      } catch (err) {
        setError("Failed to load sheet data.");
      } finally {
        setLoading(false);
      }
    }
    fetchSheet();
  }, [sheetId, sheetName]);

  return { data, loading, error };
}
