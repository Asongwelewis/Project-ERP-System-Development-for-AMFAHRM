import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

// Example data structure; replace with API data when available
const sampleTimetable = [
  {
    id: 1,
    time: '08:00 - 10:00',
    courseCode: 'CSC101',
    courseTitle: 'Introduction to Computing',
    lecturer: 'Dr. A. Smith',
    hall: 'Chunbow Hall'
  },
  {
    id: 2,
    time: '10:00 - 12:00',
    courseCode: 'MAT102',
    courseTitle: 'Calculus II',
    lecturer: 'Prof. J. Doe',
    hall: 'The George Mbarika Hall'
  },
  {
    id: 3,
    time: '13:00 - 15:00',
    courseCode: 'ENG210',
    courseTitle: 'Technical Writing',
    lecturer: 'Mrs. L. Tan',
    hall: 'IT Hall'
  }
];

export default function Timetable({ embedded = false }) {
  // In the future, replace with service data (e.g., getStudentTimetable(user.id))
  const rows = sampleTimetable;

  return (
    <div className="space-y-6">
      {!embedded && (
        <div>
          <h1 className="text-blue-700">Timetable</h1>
          <p className="text-muted-foreground">Your daily class schedule</p>
        </div>
      )}

      <Card className="border-blue-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-blue-700">Class Timetable</CardTitle>
          <CardDescription>Time, courses, lecturers and halls</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No timetable entries available.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800">Time (Start - End)</TableHead>
                  <TableHead className="text-blue-800">Course Code & Title</TableHead>
                  <TableHead className="text-blue-800">Lecturer</TableHead>
                  <TableHead className="text-blue-800">Hall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>
                      <div className="font-medium">{r.courseCode}</div>
                      <div className="text-sm text-muted-foreground">{r.courseTitle}</div>
                    </TableCell>
                    <TableCell>{r.lecturer}</TableCell>
                    <TableCell>{r.hall}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
