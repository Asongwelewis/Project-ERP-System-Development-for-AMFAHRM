import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Download } from 'lucide-react';
import { MOCK_PAYROLL } from './constants';
import { Layout } from '../../components/Layout';

export function Payroll() {
  const payrollStats = {
    totalPayroll: MOCK_PAYROLL.reduce((sum, p) => sum + p.netPay, 0),
    processed: MOCK_PAYROLL.filter(p => p.status === 'processed').length,
    pending: MOCK_PAYROLL.filter(p => p.status === 'pending').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Payroll Management</h1>
            <p className="text-muted-foreground">
              Process employee salaries and manage payroll
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Payroll
            </Button>
            <Button>Process Payroll</Button>
          </div>
        </div>

        {/* Payroll Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${payrollStats.totalPayroll.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Monthly total</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{payrollStats.processed}</div>
              <p className="text-xs text-muted-foreground">Employees paid</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{payrollStats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Payroll Details - August 2025</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PAYROLL.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-medium">{payroll.name}</TableCell>
                    <TableCell>${payroll.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">+${payroll.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">-${payroll.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">${payroll.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={payroll.status === 'processed' ? 'default' : 'secondary'}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        {payroll.status === 'pending' && (
                          <Button size="sm">Process</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
