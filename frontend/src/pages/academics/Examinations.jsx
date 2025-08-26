import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { getStudentExams } from '../../services/studentService';

export default function Examinations() {
  const { user } = useAuth();
  const [exams, setExams] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getStudentExams(user?.id);
        if (mounted) setExams(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-orange-700">Examinations</h1>
        <p className="text-muted-foreground">Your upcoming exams and assessments</p>
      </div>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">Schedule</CardTitle>
          <CardDescription>Dates, times, and venues</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : exams.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No examinations found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="text-orange-800">Course</TableHead>
                  <TableHead className="text-orange-800">Exam</TableHead>
                  <TableHead className="text-orange-800">Date</TableHead>
                  <TableHead className="text-orange-800">Time</TableHead>
                  <TableHead className="text-orange-800">Venue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.course}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell>{e.time}</TableCell>
                    <TableCell>{e.venue}</TableCell>
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
