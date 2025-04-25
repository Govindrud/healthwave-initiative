import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Search, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useSheetDB } from "@/hooks/useSheetDB";
import { Badge } from "@/components/ui/badge";

const SalesDashboard: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const { getRecords, error } = useSheetDB();
  
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const paymentsData = await getRecords({ sheet: 'Payments' });
        setPayments(paymentsData || []);
      } catch (err) {
        console.error("Failed to fetch payments data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);

  const prepareChartData = () => {
    const salesData = [
      { month: "Jan", revenue: 4000, profit: 2400 },
      { month: "Feb", revenue: 5000, profit: 3100 },
      { month: "Mar", revenue: 6000, profit: 3700 },
      { month: "Apr", revenue: 7000, profit: 4300 },
      { month: "May", revenue: 8000, profit: 5000 },
      { month: "Jun", revenue: 9500, profit: 5800 },
    ];
    
    return salesData;
  };

  const salesData = prepareChartData();

  const filteredPayments = payments.filter(payment => 
    (payment.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (payment.PaymentID?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (payment.ServiceType?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
  );
  
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const currentPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalRevenue = filteredPayments.reduce((sum, payment) => {
    const amount = parseFloat(payment.Amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                <ChartContainer 
                  className="h-6 w-6" 
                  config={{}}
                >
                  <></>
                </ChartContainer>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <h3 className="text-2xl font-bold">{payments.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Revenue Overview</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            className="h-[300px]" 
            config={{ 
              revenue: { color: "#7c3aed" }, 
              profit: { color: "#10b981" } 
            }}
          >
            <>
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
            </>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading payment data...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading payments: {error}</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No payment records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPayments.map((payment) => (
                      <TableRow key={payment.PaymentID || payment.id}>
                        <TableCell className="font-medium">{payment.PaymentID || 'N/A'}</TableCell>
                        <TableCell>{payment.CustomerName || 'N/A'}</TableCell>
                        <TableCell>{payment.ServiceType || 'N/A'}</TableCell>
                        <TableCell>${parseFloat(payment.Amount || 0).toLocaleString()}</TableCell>
                        <TableCell>{payment.PaymentDate || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={
                            payment.Status?.toLowerCase() === "paid" 
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }>
                            {payment.Status || 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">View details</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              <div className="flex items-center justify-between mt-4 space-x-2">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredPayments.length)}-{Math.min(currentPage * itemsPerPage, filteredPayments.length)}</span> of{" "}
                  <span className="font-medium">{filteredPayments.length}</span> records
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
