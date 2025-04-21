
import React, { useState, useEffect } from "react";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useSheetDB } from "@/hooks/useSheetDB";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";

// Your real sheet from the link: https://docs.google.com/spreadsheets/d/1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI
const ACTUAL_SHEET_ID = "1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI";
const BOOKINGS_SHEET_NAME = "Bookings"; // Make sure the tab in your Sheet is named "Bookings"!

const GoogleSheetBookings: React.FC = () => {
  // Use both hooks - direct Google Sheet for visualization and SheetDB for CRUD
  const { data: googleSheetData, loading: googleSheetLoading, error: googleSheetError } = 
    useGoogleSheet({ sheetId: ACTUAL_SHEET_ID, sheetName: BOOKINGS_SHEET_NAME });
  
  const { getRecords, loading: sheetDbLoading, error: sheetDbError } = useSheetDB();
  const [sheetDbData, setSheetDbData] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<"googleSheet" | "sheetDb">("googleSheet");

  // If data is missing headers, fallback to an empty array
  const tableHeaders = dataSource === "googleSheet" 
    ? (googleSheetData.length > 0 ? Object.keys(googleSheetData[0]) : [])
    : (sheetDbData.length > 0 ? Object.keys(sheetDbData[0]) : []);
  
  // Load data from SheetDB API
  useEffect(() => {
    const loadSheetDbData = async () => {
      const records = await getRecords({ sheet: 'Bookings' });
      setSheetDbData(records);
    };
    
    loadSheetDbData();
  }, []);

  // Toggle data source
  const handleToggleDataSource = () => {
    setDataSource(prev => prev === "googleSheet" ? "sheetDb" : "googleSheet");
  };

  // Refresh data
  const handleRefresh = async () => {
    if (dataSource === "sheetDb") {
      const records = await getRecords({ sheet: 'Bookings' });
      setSheetDbData(records);
    }
    // Google Sheet data refreshes automatically via useEffect in useGoogleSheet
  };

  // Determine which data to display
  const displayData = dataSource === "googleSheet" ? googleSheetData : sheetDbData;
  const isLoading = dataSource === "googleSheet" ? googleSheetLoading : sheetDbLoading;
  const error = dataSource === "googleSheet" ? googleSheetError : sheetDbError;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Live Bookings</CardTitle>
          <CardDescription>
            Data source: {dataSource === "googleSheet" ? "Google Sheet Direct API" : "SheetDB API"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleDataSource}
          >
            Toggle Data Source
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a
              href="https://docs.google.com/spreadsheets/d/1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open Sheet
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="py-4 text-center">Loading data...</div>}
        {error && <div className="py-4 text-center text-red-500">{error}</div>}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableHead key={header} className="whitespace-nowrap">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((row, rowIdx) => (
                  <TableRow key={rowIdx}>
                    {tableHeaders.map((header) => (
                      <TableCell key={header}>
                        {/* Safely render any value as string */}
                        {row[header] !== null && row[header] !== undefined ? String(row[header]) : ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {displayData.length === 0 && <div className="py-4 text-center">No data found.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleSheetBookings;
