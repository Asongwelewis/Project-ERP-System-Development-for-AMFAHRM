import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { getStudentAssignments } from '../../services/studentService';

export default function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getStudentAssignments(user?.id);
        if (mounted) setAssignments(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-orange-700">Assignments</h1>
        <p className="text-muted-foreground">Submit and track your assignments</p>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">My Assignments</CardTitle>
          <CardDescription>Coursework and due dates</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : assignments.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No assignments found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800">Course</TableHead>
                  <TableHead className="text-blue-800">Title</TableHead>
                  <TableHead className="text-blue-800">Due Date</TableHead>
                  <TableHead className="text-blue-800">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.course}</TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === 'submitted' ? 'success' : a.status === 'overdue' ? 'destructive' : 'default'}>
                        {a.status}
                      </Badge>
                    </TableCell>
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
