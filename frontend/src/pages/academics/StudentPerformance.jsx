import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';

export default function StudentPerformance({ embedded = false }) {
  // Mock data for UI scaffolding
  const gpa = 3.62;
  const courseProgress = [
    { code: 'CSC101', name: 'Intro to Computing', progress: 82, currentGrade: 'B+' },
    { code: 'MAT102', name: 'Calculus I', progress: 68, currentGrade: 'B' },
    { code: 'ENG103', name: 'Academic Writing', progress: 91, currentGrade: 'A' },
  ];
  const recentAssessments = [
    { id: 1, course: 'CSC101', title: 'Assignment 2', score: 87, max: 100, date: '2025-08-12' },
    { id: 2, course: 'MAT102', title: 'Quiz 1', score: 16, max: 20, date: '2025-08-10' },
    { id: 3, course: 'ENG103', title: 'Essay Draft', score: 18, max: 20, date: '2025-08-07' },
  ];
  const attendance = { present: 34, total: 38 };

  const attendanceRate = Math.round((attendance.present / Math.max(attendance.total, 1)) * 100);

  return (
    <div className="space-y-6">
      {!embedded && (
        <div>
          <h1 className="text-2xl font-bold text-blue-700">My Performance</h1>
          <p className="text-muted-foreground">Track your GPA, progress, and recent assessments</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-blue-700">Current GPA</CardTitle>
            <CardDescription>Out of 4.0</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{gpa.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-orange-700">Attendance</CardTitle>
            <CardDescription>Classes attended</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{attendance.present}/{attendance.total}</span>
              <span className="text-sm font-medium">{attendanceRate}%</span>
            </div>
            <Progress value={attendanceRate} className="h-2" />
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-blue-700">Courses On Track</CardTitle>
            <CardDescription>Progress by course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {courseProgress.map((c) => (
              <div key={c.code}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{c.code}</span>
                  <span className="text-muted-foreground">{c.progress}%</span>
                </div>
                <Progress value={c.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-blue-700">Recent Assessments</CardTitle>
          <CardDescription>Latest submitted or graded items</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="text-blue-800">Course</TableHead>
                <TableHead className="text-blue-800">Title</TableHead>
                <TableHead className="text-blue-800">Score</TableHead>
                <TableHead className="text-blue-800">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAssessments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.course}</TableCell>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.score}/{a.max}</TableCell>
                  <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
