import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { MOCK_ATTENDANCE } from './constants';
import { Layout } from '../../components/Layout';

export function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceStats = {
    totalPresent: MOCK_ATTENDANCE.filter(e => e.status === 'present').length,
    totalAbsent: MOCK_ATTENDANCE.filter(e => e.status !== 'present').length,
    avgHours: MOCK_ATTENDANCE.reduce((sum, e) => sum + e.hours, 0) / MOCK_ATTENDANCE.length,
    attendanceRate: (MOCK_ATTENDANCE.filter(e => e.status === 'present').length / MOCK_ATTENDANCE.length) * 100
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Attendance Management</h1>
            <p className="text-muted-foreground">
              Track and manage employee attendance
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceStats.totalPresent}</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceStats.totalAbsent}</div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{attendanceStats.avgHours.toFixed(1)}</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendanceStats.attendanceRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Daily Attendance - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ATTENDANCE.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-700 font-medium">
                            {record.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{record.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.clockIn}</TableCell>
                    <TableCell>{record.clockOut}</TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {record.status === 'present' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {record.status === 'absent' && <XCircle className="h-4 w-4 text-red-500" />}
                        {record.status === 'sick_leave' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        <Badge variant={
                          record.status === 'present' ? 'default' :
                          record.status === 'absent' ? 'destructive' : 'secondary'
                        }>
                          {record.status.replace('_', ' ')}
                        </Badge>
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
