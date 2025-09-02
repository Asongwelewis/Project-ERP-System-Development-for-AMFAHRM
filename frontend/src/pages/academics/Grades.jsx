import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Save, PlusCircle, Trash2, Edit3, Send, RefreshCw, Undo2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Simple storage helpers (localStorage-backed mock API)
const STORAGE_KEYS = {
  drafts: 'examDrafts',
  published: 'examPublished',
};

function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function uid() { return Math.random().toString(36).slice(2, 10); }

export function Grades() {
  const { user } = useAuth();
  const role = user?.role; // 'academic_staff' | 'hr_personnel' | others
  const author = user?.username || 'anonymous';

  // Tabs: entry | drafts | published
  const [tab, setTab] = useState('entry');

  // Metadata
  const [course, setCourse] = useState('');
  const [examName, setExamName] = useState('');
  const [term, setTerm] = useState('');
  const [examDate, setExamDate] = useState('');

  // Rows: {id, studentId, studentName, score}
  const [rows, setRows] = useState([
    { id: uid(), studentId: '', studentName: '', score: '' },
    { id: uid(), studentId: '', studentName: '', score: '' },
    { id: uid(), studentId: '', studentName: '', score: '' },
  ]);

  const [editingDraftId, setEditingDraftId] = useState(null);

  // Filters for published view
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterExam, setFilterExam] = useState('all');

  const allDrafts = readStore(STORAGE_KEYS.drafts);
  const allPublished = readStore(STORAGE_KEYS.published);

  // Derived buckets
  const myDrafts = useMemo(() => allDrafts.filter(d => d.author === author && d.status === 'Draft'), [author, allDrafts.length]);
  const mySubmitted = useMemo(() => allDrafts.filter(d => d.author === author && d.status === 'SubmittedToHR'), [author, allDrafts.length]);
  const pendingHR = useMemo(() => allDrafts.filter(d => d.status === 'SubmittedToHR'), [allDrafts.length]);

  const coursesFromData = useMemo(() => {
    const set = new Set();
    [...allDrafts, ...allPublished].forEach(r => { if (r.course) set.add(r.course); });
    return Array.from(set);
  }, [allDrafts.length, allPublished.length]);

  const examsFromData = useMemo(() => {
    const set = new Set();
    [...allDrafts, ...allPublished].forEach(r => { if (r.examName) set.add(r.examName); });
    return Array.from(set);
  }, [allDrafts.length, allPublished.length]);

  function resetForm() {
    setCourse('');
    setExamName('');
    setTerm('');
    setExamDate('');
    setRows([{ id: uid(), studentId: '', studentName: '', score: '' }]);
    setEditingDraftId(null);
  }

  function addRow() {
    setRows(prev => [...prev, { id: uid(), studentId: '', studentName: '', score: '' }]);
  }
  function removeRow(id) {
    setRows(prev => prev.filter(r => r.id !== id));
  }
  function updateRow(id, patch) {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
  }

  function validate() {
    if (!course || !examName || !term || !examDate) return 'Please fill in Course, Exam Name, Term and Date.';
    if (rows.length === 0) return 'Please add at least one student row.';
    for (const r of rows) {
      if (!r.studentId || !r.studentName) return 'Each row needs Student ID and Name.';
      if (r.score === '' || isNaN(Number(r.score))) return 'Each row needs a numeric Score.';
    }
    return null;
  }

  function upsertDraft(next) {
    const drafts = readStore(STORAGE_KEYS.drafts);
    const idx = drafts.findIndex(d => d.id === next.id);
    if (idx >= 0) drafts[idx] = next; else drafts.unshift(next);
    writeStore(STORAGE_KEYS.drafts, drafts);
  }

  function buildPayload(status) {
    return {
      id: editingDraftId || uid(),
      course, examName, term, examDate,
      rows,
      status, // 'Draft' | 'SubmittedToHR'
      author, // username of academic staff
      createdAt: editingDraftId ? allDrafts.find(d => d.id === editingDraftId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Academic action: save draft
  function saveDraft() {
    const err = validate();
    if (err) { alert(err); return; }
    const draft = buildPayload('Draft');
    upsertDraft(draft);
    setEditingDraftId(draft.id);
    alert('Draft saved.');
  }

  // Academic action: submit to HR
  function submitToHR() {
    const err = validate();
    if (err) { alert(err); return; }
    const submitted = buildPayload('SubmittedToHR');
    upsertDraft(submitted);
    setEditingDraftId(submitted.id);
    alert('Submitted to HR for review.');
    setTab('drafts');
  }

  // Academic action: submit an existing draft row (from table) to HR
  function submitExistingDraft(draftLike) {
    const payload = { ...draftLike, status: 'SubmittedToHR', updatedAt: new Date().toISOString() };
    upsertDraft(payload);
    alert('Draft submitted to HR.');
  }

  // HR action: publish to students
  function hrPublish(draftLike) {
    const payload = draftLike; // must be status SubmittedToHR
    if (!payload || payload.status !== 'SubmittedToHR') { alert('Only submissions can be published.'); return; }

    const published = readStore(STORAGE_KEYS.published);
    published.unshift({
      ...payload,
      status: 'Published',
      publishedAt: new Date().toISOString(),
      reviewer: author, // HR username who published
    });
    writeStore(STORAGE_KEYS.published, published);

    // remove from drafts
    const remaining = readStore(STORAGE_KEYS.drafts).filter(d => d.id !== payload.id);
    writeStore(STORAGE_KEYS.drafts, remaining);
    alert('Results published to students.');
  }

  // HR action: request changes (send back to Draft)
  function requestChanges(draftLike) {
    const payload = { ...draftLike, status: 'Draft', updatedAt: new Date().toISOString() };
    upsertDraft(payload);
    alert('Sent back to Academic Staff for changes.');
  }

  // Academic action: withdraw submission back to draft
  function withdrawSubmission(draftLike) {
    const payload = { ...draftLike, status: 'Draft', updatedAt: new Date().toISOString() };
    upsertDraft(payload);
  }

  function loadDraftToEditor(draft) {
    setCourse(draft.course || '');
    setExamName(draft.examName || '');
    setTerm(draft.term || '');
    setExamDate(draft.examDate || '');
    setRows(draft.rows?.length ? draft.rows : [{ id: uid(), studentId: '', studentName: '', score: '' }]);
    setEditingDraftId(draft.id);
    setTab('entry');
  }

  function deleteDraft(id) {
    const drafts = readStore(STORAGE_KEYS.drafts).filter(d => d.id !== id);
    writeStore(STORAGE_KEYS.drafts, drafts);
  }

  function gradeFromScore(score) {
    const s = Number(score);
    if (isNaN(s)) return '';
    if (s >= 85) return 'A';
    if (s >= 70) return 'B';
    if (s >= 55) return 'C';
    if (s >= 40) return 'D';
    return 'F';
  }

  const filteredPublished = useMemo(() => {
    return readStore(STORAGE_KEYS.published).filter(r => {
      const byCourse = filterCourse === 'all' || r.course === filterCourse;
      const byExam = filterExam === 'all' || r.examName === filterExam;
      return byCourse && byExam;
    });
  }, [filterCourse, filterExam, allPublished.length]);

  const canEditEntry = role === 'academic_staff';
  const showHRQueue = role === 'hr_personnel';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Exam Results</h1>
            <p className="text-muted-foreground">Two-step publishing: Academic submits to HR, HR publishes</p>
          </div>
          <div className="flex gap-2">
            <Button variant={tab === 'entry' ? 'default' : 'outline'} onClick={() => setTab('entry')}>Enter Results</Button>
            <Button variant={tab === 'drafts' ? 'default' : 'outline'} onClick={() => setTab('drafts')}>Drafts & Review</Button>
            <Button variant={tab === 'published' ? 'default' : 'outline'} onClick={() => setTab('published')}>Published</Button>
          </div>
        </div>

        {/* Entry Tab */}
        {tab === 'entry' && (
          <div className="space-y-4">
            {!canEditEntry && (
              <Card className="border-orange-200">
                <CardHeader><CardTitle>Read-only</CardTitle><CardDescription>Only Academic Staff can create or edit entries.</CardDescription></CardHeader>
              </Card>
            )}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle>{editingDraftId ? 'Edit Draft' : 'New Results Entry'}</CardTitle>
                <CardDescription>Fill in exam details and student scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Course</label>
                    <Input disabled={!canEditEntry} value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g., MTH101" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Exam Name</label>
                    <Input disabled={!canEditEntry} value={examName} onChange={e => setExamName(e.target.value)} placeholder="e.g., Midterm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Term</label>
                    <Input disabled={!canEditEntry} value={term} onChange={e => setTerm(e.target.value)} placeholder="e.g., 2025/2026 T1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input disabled={!canEditEntry} type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Student Scores</h3>
                  {canEditEntry && (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={addRow}><PlusCircle className="h-4 w-4 mr-1" />Add Row</Button>
                      <Button variant="outline" onClick={resetForm}><RefreshCw className="h-4 w-4 mr-1" />Reset</Button>
                    </div>
                  )}
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-[120px]">Score</TableHead>
                        <TableHead className="w-[100px]">Grade</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map(r => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <Input disabled={!canEditEntry} value={r.studentId} onChange={e => updateRow(r.id, { studentId: e.target.value })} placeholder="e.g., STU001" />
                          </TableCell>
                          <TableCell>
                            <Input disabled={!canEditEntry} value={r.studentName} onChange={e => updateRow(r.id, { studentName: e.target.value })} placeholder="Student Name" />
                          </TableCell>
                          <TableCell>
                            <Input disabled={!canEditEntry} value={r.score} onChange={e => updateRow(r.id, { score: e.target.value })} placeholder="0-100" />
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{gradeFromScore(r.score)}</Badge>
                          </TableCell>
                          <TableCell>
                            {canEditEntry && (
                              <Button variant="outline" size="sm" onClick={() => removeRow(r.id)}><Trash2 className="h-4 w-4" /></Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-2 justify-end">
                  {canEditEntry ? (
                    <>
                      <Button onClick={saveDraft}><Save className="h-4 w-4 mr-2" />Save as Draft</Button>
                      <Button variant="outline" onClick={submitToHR}><Send className="h-4 w-4 mr-2" />Submit to HR</Button>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">Only Academic Staff can submit entries.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Drafts & Review Tab */}
        {tab === 'drafts' && (
          <div className="space-y-6">
            {role === 'academic_staff' && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>My Drafts</CardTitle>
                  <CardDescription>Continue editing or submit to HR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Exam</TableHead>
                          <TableHead>Term</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myDrafts.length === 0 && (
                          <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No drafts saved yet.</TableCell></TableRow>
                        )}
                        {myDrafts.map(d => (
                          <TableRow key={d.id}>
                            <TableCell className="font-medium">{d.course}</TableCell>
                            <TableCell>{d.examName}</TableCell>
                            <TableCell>{d.term}</TableCell>
                            <TableCell>{new Date(d.updatedAt || d.createdAt).toLocaleString()}</TableCell>
                            <TableCell><Badge>{d.status}</Badge></TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => loadDraftToEditor(d)}><Edit3 className="h-4 w-4 mr-1" />Edit</Button>
                                <Button variant="outline" size="sm" onClick={() => submitExistingDraft(d)}>Submit</Button>
                                <Button variant="outline" size="sm" onClick={() => { deleteDraft(d.id); }}>Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submitted section visible to Academic (own) and HR (all) */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle>Submissions Awaiting HR Review</CardTitle>
                <CardDescription>{role === 'hr_personnel' ? 'Review and publish' : 'Your submissions pending HR review'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(role === 'hr_personnel' ? pendingHR : mySubmitted).length === 0 && (
                        <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No submissions.</TableCell></TableRow>
                      )}
                      {(role === 'hr_personnel' ? pendingHR : mySubmitted).map(d => (
                        <TableRow key={d.id}>
                          <TableCell className="font-medium">{d.course}</TableCell>
                          <TableCell>{d.examName}</TableCell>
                          <TableCell>{d.term}</TableCell>
                          <TableCell>{d.author}</TableCell>
                          <TableCell>{new Date(d.updatedAt || d.createdAt).toLocaleString()}</TableCell>
                          <TableCell><Badge>{d.status}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {role === 'hr_personnel' ? (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => hrPublish(d)}><Send className="h-4 w-4 mr-1" />Publish</Button>
                                  <Button variant="outline" size="sm" onClick={() => requestChanges(d)}><Undo2 className="h-4 w-4 mr-1" />Request Changes</Button>
                                </>
                              ) : (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => withdrawSubmission(d)}><Undo2 className="h-4 w-4 mr-1" />Withdraw</Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Published Tab */}
        {tab === 'published' && (
          <div className="space-y-4">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle>Published Results</CardTitle>
                <CardDescription>Students can view these</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-[220px]">
                    <label className="text-sm font-medium">Filter by Course</label>
                    <Select value={filterCourse} onValueChange={setFilterCourse}>
                      <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {coursesFromData.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[220px]">
                    <label className="text-sm font-medium">Filter by Exam</label>
                    <Select value={filterExam} onValueChange={setFilterExam}>
                      <SelectTrigger><SelectValue placeholder="Exam" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {examsFromData.map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Entries</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPublished.length === 0 && (
                        <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No published results.</TableCell></TableRow>
                      )}
                      {filteredPublished.map(r => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.course}</TableCell>
                          <TableCell>{r.examName}</TableCell>
                          <TableCell>{r.term}</TableCell>
                          <TableCell>{r.examDate ? new Date(r.examDate).toLocaleDateString() : '-'}</TableCell>
                          <TableCell>{r.publishedAt ? new Date(r.publishedAt).toLocaleString() : '-'}</TableCell>
                          <TableCell>{r.rows?.length || 0}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}