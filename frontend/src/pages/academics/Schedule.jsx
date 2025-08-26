import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { getStudentSchedule } from '../../services/studentService';

export default function Schedule() {
  const { user } = useAuth();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getStudentSchedule(user?.id);
        if (mounted) setItems(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-blue-700">Schedule</h1>
        <p className="text-muted-foreground">Your weekly timetable</p>
      </div>

      <Card className="border-blue-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-blue-700">Classes</CardTitle>
          <CardDescription>Day, time, and venues</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No schedule entries found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800">Day</TableHead>
                  <TableHead className="text-blue-800">Time</TableHead>
                  <TableHead className="text-blue-800">Course</TableHead>
                  <TableHead className="text-blue-800">Venue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.day}</TableCell>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.course}</TableCell>
                    <TableCell>{s.venue}</TableCell>
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
