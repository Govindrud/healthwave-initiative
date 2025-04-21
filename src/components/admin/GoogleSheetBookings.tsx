
import React from "react";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Your real sheet from the link: https://docs.google.com/spreadsheets/d/1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI
const ACTUAL_SHEET_ID = "1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI";
const BOOKINGS_SHEET_NAME = "Bookings"; // Make sure the tab in your Sheet is named "Bookings"!

const GoogleSheetBookings: React.FC = () => {
  const { data, loading, error } = useGoogleSheet({ sheetId: ACTUAL_SHEET_ID, sheetName: BOOKINGS_SHEET_NAME });

  // If data is missing headers, fallback to an empty array
  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Live Bookings (from Google Sheets)</CardTitle>
        <CardDescription>
          This data is synced in real time with your public Google Sheet.&nbsp;
          <a
            href="https://docs.google.com/spreadsheets/d/1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Open the sheet
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-sm">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="border px-2 py-1 bg-meant-50 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {tableHeaders.map((header) => (
                      <td key={header} className="border px-2 py-1">
                        {/* Safely render any value as string */}
                        {row[header] !== null && row[header] !== undefined ? String(row[header]) : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && <div>No data found.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleSheetBookings;
