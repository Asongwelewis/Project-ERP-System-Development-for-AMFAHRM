import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { getStudentGrades } from '../../services/studentService';

export default function Grades({ embedded = false }) {
  const { user } = useAuth();
  const [grades, setGrades] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getStudentGrades(user?.id);
        if (mounted) setGrades(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id]);

  return (
    <div className="space-y-6">
      {!embedded && (
        <div>
          <h1 className="text-blue-700">My Transcript</h1>
          <p className="text-muted-foreground">View your official course results</p>
        </div>
      )}

      <Card className="border-blue-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-blue-700">Transcript</CardTitle>
          <CardDescription>Course-by-course results</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : grades.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No grades found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800">Course</TableHead>
                  <TableHead className="text-blue-800">Name</TableHead>
                  <TableHead className="text-blue-800">Credits</TableHead>
                  <TableHead className="text-blue-800">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((g, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{g.course}</TableCell>
                    <TableCell>{g.name}</TableCell>
                    <TableCell>{g.credits}</TableCell>
                    <TableCell>{g.grade}</TableCell>
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