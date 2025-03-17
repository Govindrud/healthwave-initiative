
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const SalesDashboard: React.FC = () => {
  // Sample data for the sales chart
  const salesData = [
    { month: "Jan", revenue: 4000, profit: 2400 },
    { month: "Feb", revenue: 5000, profit: 3100 },
    { month: "Mar", revenue: 6000, profit: 3700 },
    { month: "Apr", revenue: 7000, profit: 4300 },
    { month: "May", revenue: 8000, profit: 5000 },
    { month: "Jun", revenue: 9500, profit: 5800 },
  ];

  // Sample sales data for the table
  const recentSales = [
    {
      id: "S-5001",
      client: "Corporate Wellness Inc.",
      service: "Mental Health Workshop",
      amount: 1800,
      date: "2023-06-12",
      status: "Paid",
    },
    {
      id: "S-5002",
      client: "Sarah Johnson",
      service: "Therapy Package (10 Sessions)",
      amount: 1200,
      date: "2023-06-14",
      status: "Paid",
    },
    {
      id: "S-5003",
      client: "Innovative Tech Co.",
      service: "Team Building Sessions",
      amount: 2500,
      date: "2023-06-15",
      status: "Pending",
    },
    {
      id: "S-5004",
      client: "David Wilson",
      service: "Premium Counseling",
      amount: 500,
      date: "2023-06-15",
      status: "Paid",
    },
    {
      id: "S-5005",
      client: "Education First School",
      service: "Student Wellness Program",
      amount: 3200,
      date: "2023-06-16",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Overview</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{ revenue: { color: "#7c3aed" }, profit: { color: "#10b981" } }}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Sales</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sales..."
              className="w-full bg-background pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.client}</TableCell>
                  <TableCell>{sale.service}</TableCell>
                  <TableCell>${sale.amount.toLocaleString()}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sale.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <span className="sr-only">View details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end mt-4 space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
