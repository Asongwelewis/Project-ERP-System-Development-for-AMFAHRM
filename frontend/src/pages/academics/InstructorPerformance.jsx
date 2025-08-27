import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';

export default function InstructorPerformance({ embedded = false, context = 'instructor' }) {
  // Mock data for UI scaffolding
  const kpis = {
    avgScore: 76.4,
    passRate: 82,
    submissionsOnTime: 91,
  };

  const gradeDistribution = [
    { grade: 'A', count: 42 },
    { grade: 'B', count: 58 },
    { grade: 'C', count: 31 },
    { grade: 'D', count: 12 },
    { grade: 'F', count: 7 },
  ];

  const atRisk = [
    { id: 1, name: 'Jane Doe', course: 'MAT102', avg: 49, attendance: 62 },
    { id: 2, name: 'John Smith', course: 'CSC101', avg: 52, attendance: 58 },
    { id: 3, name: 'Liu Wei', course: 'ENG103', avg: 54, attendance: 65 },
  ];

  return (
    <div className="space-y-6">
      {!embedded && (
        <div>
          <h1 className="text-2xl font-bold text-orange-700">{context === 'hr' ? 'Lecturer Performance' : 'My Students Performance'}</h1>
          <p className="text-muted-foreground">Course KPIs, distributions, and at-risk list</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-orange-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-orange-700">Average Score</CardTitle>
            <CardDescription>Across selected course(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">{kpis.avgScore}%</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-blue-700">Pass Rate</CardTitle>
            <CardDescription>Students with >= 50%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{kpis.passRate}%</span>
              <span className="text-sm font-medium">Target 80%</span>
            </div>
            <Progress value={kpis.passRate} className="h-2" />
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-orange-700">On-time Submissions</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{kpis.submissionsOnTime}%</span>
              <span className="text-sm font-medium">Goal 90%</span>
            </div>
            <Progress value={kpis.submissionsOnTime} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-blue-700">Grade Distribution</CardTitle>
          <CardDescription>Count of grades awarded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {gradeDistribution.map((g) => (
              <div key={g.grade} className="text-center">
                <div className="text-sm text-muted-foreground">{g.grade}</div>
                <div className="text-xl font-semibold">{g.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">At-Risk Students</CardTitle>
          <CardDescription>Low average or attendance</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50">
                <TableHead className="text-orange-800">Student</TableHead>
                <TableHead className="text-orange-800">Course</TableHead>
                <TableHead className="text-orange-800">Avg Score</TableHead>
                <TableHead className="text-orange-800">Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRisk.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.course}</TableCell>
                  <TableCell>{s.avg}%</TableCell>
                  <TableCell>{s.attendance}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
