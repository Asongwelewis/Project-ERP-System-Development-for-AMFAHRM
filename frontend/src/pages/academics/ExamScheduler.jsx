import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { getLecturerCourses, createInstructorExam, listInstructorExams, deleteExam } from '../../services/examService';

export function ExamScheduler() {
  const { user } = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    courseCode: '',
    courseTitle: '',
    type: 'written',
    specialInfo: '',
    attachments: [],
  });

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [c, e] = await Promise.all([
          getLecturerCourses(user?.id),
          listInstructorExams(user?.id)
        ]);
        if (!mounted) return;
        setCourses(c);
        setExams(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id]);

  const onSelectCourse = (code) => {
    const c = courses.find(x => x.code === code);
    setForm(prev => ({ ...prev, courseCode: code, courseTitle: c?.title || '' }));
  };

  const onFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const reads = await Promise.all(files.map(f => new Promise(res => {
      const reader = new FileReader();
      reader.onload = () => res({ name: f.name, mime: f.type, dataUrl: reader.result });
      reader.readAsDataURL(f);
    })));
    setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...reads] }));
  };

  const removeAttachment = (name) => {
    setForm(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.name !== name) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.courseCode) return;
    setSubmitting(true);
    try {
      const created = await createInstructorExam({
        courseCode: form.courseCode,
        courseTitle: form.courseTitle,
        createdBy: user?.id,
        type: form.type,
        specialInfo: form.specialInfo,
        attachments: form.attachments,
      });
      setExams(prev => [created, ...prev]);
      setForm({ courseCode: '', courseTitle: '', type: 'written', specialInfo: '', attachments: [] });
    } finally {
      setSubmitting(false);
    }
  };

  const onDeleteExam = async (id) => {
    await deleteExam(id);
    setExams(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-orange-700">Exam Scheduler</h1>
        <p className="text-muted-foreground">Create exams for your courses. HR will schedule date, hall, time, and invigilators.</p>
      </div>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">Create Exam</CardTitle>
          <CardDescription>Select course, exam type, and special information. Upload written exam if applicable.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={form.courseCode} onValueChange={onSelectCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c.code} value={c.code}>{c.title} ({c.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam Type</label>
              <Select value={form.type} onValueChange={(v) => setForm(prev => ({ ...prev, type: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="written">Written</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Special Information</label>
              <Textarea rows={3} placeholder="e.g., Open book, calculator allowed, materials, instructions" value={form.specialInfo} onChange={e => setForm(prev => ({ ...prev, specialInfo: e.target.value }))} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Upload Exam (images or documents)</label>
              <Input type="file" accept="image/*,.pdf,.doc,.docx" multiple onChange={onFileChange} />
              {form.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.attachments.map(a => (
                    <Badge key={a.name} variant="secondary" className="flex items-center gap-2">
                      <span>{a.name}</span>
                      <button type="button" onClick={() => removeAttachment(a.name)} className="text-red-600">×</button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting || !form.courseCode}>
                {submitting ? 'Creating...' : 'Create Exam'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-white dark:bg-white">
        <CardHeader>
          <CardTitle className="text-orange-700">My Exams</CardTitle>
          <CardDescription>Exams you have created</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading...</div>
          ) : exams.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No exams yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="text-orange-800">Course</TableHead>
                  <TableHead className="text-orange-800">Type</TableHead>
                  <TableHead className="text-orange-800">Special Info</TableHead>
                  <TableHead className="text-orange-800">Attachments</TableHead>
                  <TableHead className="text-orange-800">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map(e => (
                  <TableRow key={e.id}>
                    <TableCell>{e.courseTitle} ({e.courseCode})</TableCell>
                    <TableCell className="capitalize">{e.type}</TableCell>
                    <TableCell className="max-w-[320px] truncate" title={e.specialInfo}>{e.specialInfo || '-'}</TableCell>
                    <TableCell>
                      {e.attachments?.length ? `${e.attachments.length} file(s)` : '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" className="text-red-600" onClick={() => onDeleteExam(e.id)}>Delete</Button>
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
