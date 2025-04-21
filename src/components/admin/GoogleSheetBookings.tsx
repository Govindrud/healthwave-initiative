
import React from "react";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DEMO_SHEET_ID = "1abcDEFgHiJKLmnoPQRSTuVwXyZ1234567890abcdefg"; // <- REPLACE with your actual sheetId
const BOOKINGS_SHEET_NAME = "Bookings"; // <- The tab name holding your booking data

const GoogleSheetBookings: React.FC = () => {
  const { data, loading, error } = useGoogleSheet({ sheetId: DEMO_SHEET_ID, sheetName: BOOKINGS_SHEET_NAME });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Live Bookings (from Google Sheets)</CardTitle>
        <CardDescription>
          This data is synced in real time with a public Google Sheet.
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
                  {data.length > 0 &&
                    Object.keys(data[0]).map((k) => (
                      <th key={k} className="border px-2 py-1 bg-meant-50">
                        {k}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((v, i) => (
                      <td key={i} className="border px-2 py-1">
                        {v !== null && v !== undefined ? String(v) : ""}
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
