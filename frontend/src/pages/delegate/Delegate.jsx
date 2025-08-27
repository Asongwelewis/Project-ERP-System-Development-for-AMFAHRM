import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export function Delegate() {
  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    signed: false,
  });
  const [records, setRecords] = React.useState([]);

  const handleEmailChange = (e) => {
    let value = e.target.value;
    // If user types '@' or starts domain completion, auto-complete to institutional domain
    const atIndex = value.indexOf('@');
    const domain = '@ictuniversity.edu.cm';
    if (atIndex !== -1) {
      // Replace anything after the first '@' with the domain
      value = value.substring(0, atIndex) + domain;
    }
    setForm((f) => ({ ...f, email: value }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    if (!form.email.trim()) return;
    if (!form.signed) return; // require signature checkbox

    setRecords((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        signed: form.signed,
      },
    ]);
    setForm({ fullName: '', email: '', signed: false });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-700">Class Delegate Panel</h1>
          <p className="text-sm text-muted-foreground">Record in-class attendance directly on this device.</p>
        </div>

        <Card className="border-orange-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-orange-700">Add Attendance Entry</CardTitle>
            <CardDescription>Format: S/N (auto), Full Name, School Email, Signature</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addRecord} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end">
              <div className="md:col-span-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="e.g., Jane Doe" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="email">School Email</Label>
                <Input id="email" name="email" type="email" placeholder="username@ictuniversity.edu.cm" value={form.email} onChange={handleEmailChange} required />
              </div>
              <div className="flex items-center gap-2 md:col-span-1">
                <input id="signed" name="signed" type="checkbox" checked={form.signed} onChange={handleChange} className="h-4 w-4 border-input rounded" />
                <Label htmlFor="signed">Signature (tick to sign)</Label>
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button type="submit">Add</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle className="text-blue-700">Attendance Sheet</CardTitle>
            <CardDescription>Entries for this class session</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {records.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No entries yet. Add the first attendee above.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-800 w-20">S/N</TableHead>
                    <TableHead className="text-blue-800">Full Name</TableHead>
                    <TableHead className="text-blue-800">School Email</TableHead>
                    <TableHead className="text-blue-800">Signature</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((r, idx) => (
                    <TableRow key={r.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-medium">{r.fullName}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.signed ? '✓' : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default Delegate;
