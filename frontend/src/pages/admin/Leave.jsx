import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MOCK_LEAVE_REQUESTS } from './constants';
import { Layout } from '../../components/Layout';

export function Leave() {
  const leaveStats = {
    pending: MOCK_LEAVE_REQUESTS.filter(l => l.status === 'pending').length,
    approved: MOCK_LEAVE_REQUESTS.filter(l => l.status === 'approved').length,
    rejected: MOCK_LEAVE_REQUESTS.filter(l => l.status === 'rejected').length,
    totalDays: MOCK_LEAVE_REQUESTS.reduce((sum, l) => sum + l.days, 0)
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Leave Management</h1>
            <p className="text-muted-foreground">
              Manage employee leave requests and policies
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Leave Policy
          </Button>
        </div>

        {/* Leave Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{leaveStats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{leaveStats.approved}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{leaveStats.rejected}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{leaveStats.totalDays}</div>
              <p className="text-xs text-muted-foreground">Leave days requested</p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests Table */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Leave Requests</CardTitle>
            <CardDescription>Manage employee leave applications</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LEAVE_REQUESTS.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.employee}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{request.days}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {request.status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                        {request.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {request.status === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />}
                        <Badge variant={
                          request.status === 'approved' ? 'default' :
                          request.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">View</Button>
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
