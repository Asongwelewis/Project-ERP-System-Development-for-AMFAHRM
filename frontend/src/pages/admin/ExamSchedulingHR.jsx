import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { listAllExamsWithHR, upsertHRDetails } from '../../services/examService';

export function ExamSchedulingHR() {
  const [exams, setExams] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [savingId, setSavingId] = React.useState(null);
  const [form, setForm] = React.useState({ date: '', time: '', venue: '', invigilators: '' });
  const [selectedExam, setSelectedExam] = React.useState(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await listAllExamsWithHR();
      setExams(data);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const selectExam = (exam) => {
    setSelectedExam(exam);
    const inv = (exam.hr?.invigilators || []).join(', ');
    setForm({ date: exam.hr?.date || '', time: exam.hr?.time || '', venue: exam.hr?.venue || '', invigilators: inv });
  };

  const save = async (e) => {
    e.preventDefault();
    if (!selectedExam) return;
    setSavingId(selectedExam.id);
    try {
      const invigs = form.invigilators
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      await upsertHRDetails({
        examId: selectedExam.id,
        date: form.date,
        time: form.time,
        venue: form.venue,
        invigilators: invigs,
      });
      await load();
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-orange-700">Exam Scheduling (HR)</h1>
        <p className="text-muted-foreground">Assign date, time, venue (hall), and invigilators to exams created by lecturers.</p>
      </div>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">Exams Pending Scheduling</CardTitle>
          <CardDescription>Select an exam to set scheduling details.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : exams.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No exams have been created by lecturers.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="text-orange-800">Course</TableHead>
                  <TableHead className="text-orange-800">Type</TableHead>
                  <TableHead className="text-orange-800">Special Info</TableHead>
                  <TableHead className="text-orange-800">Schedule</TableHead>
                  <TableHead className="text-orange-800">Invigilators</TableHead>
                  <TableHead className="text-orange-800">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map(e => (
                  <TableRow key={e.id} className={selectedExam?.id === e.id ? 'bg-orange-50' : ''}>
                    <TableCell>{e.courseTitle} ({e.courseCode})</TableCell>
                    <TableCell className="capitalize">{e.type}</TableCell>
                    <TableCell className="max-w-[260px] truncate" title={e.specialInfo}>{e.specialInfo || '-'}</TableCell>
                    <TableCell>
                      {e.hr ? (
                        <div className="text-sm">
                          <div><Badge variant="secondary">{e.hr.date}</Badge> <Badge variant="secondary">{e.hr.time}</Badge></div>
                          <div>{e.hr.venue}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>{e.hr?.invigilators?.length ? e.hr.invigilators.join(', ') : '-'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => selectExam(e)}>Set / Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">Schedule Details</CardTitle>
          <CardDescription>Set date, time, venue and invigilators for the selected exam.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedExam ? (
            <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2 text-sm text-muted-foreground">
                Selected: <strong>{selectedExam.courseTitle} ({selectedExam.courseCode})</strong> — <span className="capitalize">{selectedExam.type}</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" value={form.time} onChange={e => setForm(prev => ({ ...prev, time: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Venue (Hall)</label>
                <Input placeholder="e.g., Hall A" value={form.venue} onChange={e => setForm(prev => ({ ...prev, venue: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Invigilators (comma-separated)</label>
                <Input placeholder="e.g., Dr. Adam, Ms. Jane" value={form.invigilators} onChange={e => setForm(prev => ({ ...prev, invigilators: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={savingId === selectedExam.id}>{savingId === selectedExam.id ? 'Saving...' : 'Save Scheduling'}</Button>
              </div>
            </form>
          ) : (
            <div className="text-sm text-muted-foreground">Select an exam from the table above to schedule.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
