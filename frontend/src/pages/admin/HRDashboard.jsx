import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign,
  BookOpen,
} from 'lucide-react';
import { HR_STATS, RECENT_HR_ACTIVITIES, DEPARTMENT_STATS } from './constants';
import { Layout } from '../../components/Layout';

const HALLS = [
  'Chunbow Hall',
  'The George Mbarika Hall',
  'The Eric Mbarika Hall',
  'IT Hall',
  'Terry & Linda Hall',
  'Pondi Hall',
  'French Hall 1',
  'French Hall 2',
];

export function HRDashboard() {
  const [entries, setEntries] = React.useState([]);
  const [form, setForm] = React.useState({
    timeStart: '',
    timeEnd: '',
    courseCode: '',
    courseTitle: '',
    lecturer: '',
    hall: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const addEntry = (e) => {
    e.preventDefault();
    if (!form.timeStart || !form.timeEnd || !form.courseCode || !form.courseTitle || !form.lecturer || !form.hall) return;
    if (!HALLS.includes(form.hall)) return;
    const newItem = {
      id: Date.now(),
      time: `${form.timeStart} - ${form.timeEnd}`,
      courseCode: form.courseCode.trim(),
      courseTitle: form.courseTitle.trim(),
      lecturer: form.lecturer.trim(),
      hall: form.hall,
    };
    setEntries((prev) => [...prev, newItem]);
    setForm({ timeStart: '', timeEnd: '', courseCode: '', courseTitle: '', lecturer: '', hall: '' });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-orange-700">Administration & HR</h1>
                <p className="text-muted-foreground">Manage employees, attendance, payroll, and HR operations</p>
              </div>

              {/* HR Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-orange-200 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                    <Users className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{HR_STATS.totalEmployees}</div>
                    <p className="text-xs text-muted-foreground">{HR_STATS.newHires} new hires this month</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                    <Clock className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{HR_STATS.attendanceRate}%</div>
                    <p className="text-xs text-muted-foreground">Above target of 90%</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{HR_STATS.pendingLeaves}</div>
                    <p className="text-xs text-muted-foreground">Awaiting approval</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payroll Budget</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">${HR_STATS.payrollBudget.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Monthly allocation</p>
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link to="/admin-hr/employees">
                  <Card className="border-orange-200 bg-white dark:bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-700">
                        <Users className="h-5 w-5" />
                        Employee Management
                      </CardTitle>
                      <CardDescription>Manage staff records and profiles</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link to="/admin-hr/attendance">
                  <Card className="border-blue-200 bg-white dark:bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Clock className="h-5 w-5" />
                        Attendance Tracking
                      </CardTitle>
                      <CardDescription>Monitor employee attendance</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link to="/admin-hr/payroll">
                  <Card className="border-orange-200 bg-white dark:bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-700">
                        <DollarSign className="h-5 w-5" />
                        Payroll Management
                      </CardTitle>
                      <CardDescription>Process salaries and benefits</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link to="/admin-hr/leave">
                  <Card className="border-blue-200 bg-white dark:bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Calendar className="h-5 w-5" />
                        Leave Management
                      </CardTitle>
                      <CardDescription>Handle leave requests and policies</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                {/* Course Management for HR */}
                <Link to="/academic/courses">
                  <Card className="border-orange-200 bg-white dark:bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-700">
                        <BookOpen className="h-5 w-5" />
                        Course Management
                      </CardTitle>
                      <CardDescription>Manage courses and schedules</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Department Overview */}
                <Card className="border-orange-200 bg-white dark:bg-white">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Department Overview</CardTitle>
                    <CardDescription>Staff distribution and budget utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {DEPARTMENT_STATS.map((dept) => (
                        <div key={dept.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{dept.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {dept.count} employees • ${dept.budget.toLocaleString()} budget
                              </p>
                            </div>
                            <Badge variant="outline">{dept.utilization}%</Badge>
                          </div>
                          <Progress value={dept.utilization} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent HR Activities */}
                <Card className="border-blue-200 bg-white dark:bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Recent Activities</CardTitle>
                    <CardDescription>Latest HR operations and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {RECENT_HR_ACTIVITIES.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            activity.type === 'hire' ? 'bg-green-500' :
                            activity.type === 'leave' ? 'bg-yellow-500' :
                            activity.type === 'payroll' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{activity.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timetable">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-orange-700">Create Timetable</h2>
                <p className="text-sm text-muted-foreground">Add class sessions shown to students on their dashboard</p>
              </div>

              <Card className="border-blue-200 bg-white dark:bg-white">
                <CardHeader>
                  <CardTitle className="text-blue-700">New Timetable Entry</CardTitle>
                  <CardDescription>Time (start - end), course, lecturer, hall</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addEntry} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <Label htmlFor="timeStart">Start Time</Label>
                      <Input id="timeStart" name="timeStart" type="time" value={form.timeStart} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="timeEnd">End Time</Label>
                      <Input id="timeEnd" name="timeEnd" type="time" value={form.timeEnd} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="courseCode">Course Code</Label>
                      <Input id="courseCode" name="courseCode" placeholder="e.g., CSC101" value={form.courseCode} onChange={handleChange} required />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="courseTitle">Course Title</Label>
                      <Input id="courseTitle" name="courseTitle" placeholder="e.g., Introduction to Computing" value={form.courseTitle} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lecturer">Lecturer</Label>
                      <Input id="lecturer" name="lecturer" placeholder="e.g., Dr. A. Smith" value={form.lecturer} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="hall">Hall</Label>
                      <select id="hall" name="hall" value={form.hall} onChange={handleChange} required className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled>Select a hall</option>
                        {HALLS.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                      <Button type="submit">Add Entry</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-white dark:bg-white">
                <CardHeader>
                  <CardTitle className="text-blue-700">Timetable Entries</CardTitle>
                  <CardDescription>Preview as students will see it</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {entries.length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">No entries yet. Add one above.</div>
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
                        {entries.map((r) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
