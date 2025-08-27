import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { LiveClassroom } from './academics/LiveClassroom';
import { Courses } from './academics/Courses';
import Assignments from './academics/Assignments';
import Timetable from './academics/Timetable';
import Grades from './academics/Grades';
import StudentPerformance from './academics/StudentPerformance';
import { Layout } from '../components/Layout';
import {
  BookOpen, Users, Calendar, Award, Clock, DollarSign, TrendingUp, Target,
  BarChart3, FileText, Settings, Shield, CheckCircle, ChartLine, Video, Home, Book, FileCheck, ClipboardList, GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Allowed student tabs (module scope)
const ALLOWED_STUDENT_TABS = ['overview', 'live-classroom', 'courses', 'assignments', 'grades', 'timetable', 'performance'];

export function Dashboard() {
  const { user } = useAuth();
  // Note: navigation and params are handled inside StudentDashboard

  // --- System Admin Dashboard ---
  const renderSystemAdminDashboard = () => (
    <div className="space-y-6">
      {/* Removed inner header to avoid duplicate headers with Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">1,247</div>
            <p className="text-xs text-muted-foreground">+12 new this week</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">98.5%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">342</div>
            <p className="text-xs text-muted-foreground">Current active users</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage system users and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Users</span>
                <span>1,247</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              Manage Users
            </Button>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Configure system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Configuration Status</span>
                <span>Optimal</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              Configure System
            </Button>
          </CardContent>
        </Card>
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <BarChart3 className="h-5 w-5" />
              System Reports
            </CardTitle>
            <CardDescription>Generate comprehensive system reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reports Generated</span>
                <span>156</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              Generate Reports
            </Button>
          </CardContent>
        </Card>
        <Link to="/academic/courses">
          <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <BookOpen className="h-5 w-5" />
                Course Management
              </CardTitle>
              <CardDescription>Manage courses and schedules</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );

  // --- Academic Staff Dashboard ---
  const renderAcademicStaffDashboard = () => (
    <div className="space-y-6">
      {/* Removed inner header to avoid duplicate headers with Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">8</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">234</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <Award className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
            <p className="text-xs text-muted-foreground">Next 2 weeks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/dashboard/student/courses">
          <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <BookOpen className="h-5 w-5" />
                Course Management
              </CardTitle>
              <CardDescription>Manage your course content and materials</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/dashboard/student/grades">
          <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <BarChart3 className="h-5 w-5" />
                Student Performance
              </CardTitle>
              <CardDescription>Track and analyze student progress</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/dashboard/student/grades">
          <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Award className="h-5 w-5" />
                Grade Management
              </CardTitle>
              <CardDescription>Enter and manage student grades</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );

  // --- Student Dashboard ---
  const StudentDashboard = () => {
    const { tab = 'overview' } = useParams();
    const navigate = useNavigate();
    // Allowed tabs moved to module scope constant ALLOWED_STUDENT_TABS

    // Guard against invalid tabs by redirecting to overview
    React.useEffect(() => {
      if (!ALLOWED_STUDENT_TABS.includes(tab)) {
        navigate('/dashboard/student/overview', { replace: true });
      }
    }, [tab, navigate]);
    
    const handleTabChange = (value) => {
      navigate(`/dashboard/student/${value}`);
    };
    
    const currentPath = tab;

    return (
      <div className="space-y-6">
        <Tabs 
          key={currentPath}
          value={currentPath} 
          onValueChange={handleTabChange}
        >
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="live-classroom" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Live Classroom
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                My Courses
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="grades" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Transcript
              </TabsTrigger>
              <TabsTrigger value="timetable" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timetable
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Live Classes</CardTitle>
                    <Video className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    <p className="text-xs text-muted-foreground">Sessions today</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" asChild>
                      <Link to="/dashboard/student/live-classroom">Join now</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-orange-200 dark:border-orange-800 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                    <Award className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3.85</div>
                    <p className="text-xs text-muted-foreground">Out of 4.0</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" asChild>
                      <Link to="/dashboard/student/grades">View transcript</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                    <FileText className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    <p className="text-xs text-muted-foreground">Due this week</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" asChild>
                      <Link to="/dashboard/student/assignments">View all</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                    <ClipboardList className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    <p className="text-xs text-muted-foreground">Next 2 weeks</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" asChild>
                      <Link to="/dashboard/student/examinations">View schedule</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Timetable</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Today</div>
                    <p className="text-xs text-muted-foreground">View your class times and halls</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600" asChild>
                      <Link to="/dashboard/student/timetable">View timetable</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="live-classroom" className="mt-6">
              <LiveClassroom embedded />
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Courses embedded />
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              <Assignments embedded />
            </TabsContent>

            <TabsContent value="grades" className="mt-6">
              <Grades embedded />
            </TabsContent>
            <TabsContent value="timetable" className="mt-6">
              <Timetable embedded />
            </TabsContent>
            <TabsContent value="performance" className="mt-6">
              <StudentPerformance embedded />
            </TabsContent>
          </Tabs>
      </div>
    );
  };

  // --- HR Dashboard ---
  const renderHRDashboard = () => (
    <div className="space-y-6">
      {/* Removed inner header to avoid duplicate headers with Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">156</div>
            <p className="text-xs text-gray-400">+5 new hires</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Leave</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-gray-400">Requests to review</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Payroll Ready</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">98%</div>
            <p className="text-xs text-gray-400">This month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Performance Reviews</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-gray-400">Due this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin-hr/employees">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Users className="h-5 w-5" />
                Employee Management
              </CardTitle>
              <CardDescription>Manage employee records and information</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/admin-hr/payroll">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <DollarSign className="h-5 w-5" />
                Payroll Processing
              </CardTitle>
              <CardDescription>Process salaries and benefits</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/admin-hr/leave">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Calendar className="h-5 w-5" />
                Leave Management
              </CardTitle>
              <CardDescription>Track and approve leave requests</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );

  // --- Finance Dashboard ---
  const renderFinanceDashboard = () => (
    <div className="space-y-6">
      {/* Removed inner header to avoid duplicate headers with Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$125K</div>
            <p className="text-xs text-gray-400">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-xs text-gray-400">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Budget Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">73%</div>
            <p className="text-xs text-gray-400">Current fiscal year</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28.8%</div>
            <p className="text-xs text-gray-400">Above target</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/marketing-finance/tuition">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <FileText className="h-5 w-5" />
                Invoice Management
              </CardTitle>
              <CardDescription>Create and manage student invoices</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/marketing-finance/expenses">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                Expense Tracking
              </CardTitle>
              <CardDescription>Monitor and categorize expenses</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/marketing-finance/reports">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <ChartLine className="h-5 w-5" />
                Financial Reports
              </CardTitle>
              <CardDescription>Generate comprehensive financial reports</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );

  // --- Marketing Dashboard ---
  const renderMarketingDashboard = () => (
    <div className="space-y-6">
      {/* Removed inner header to avoid duplicate headers with Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-gray-400">Currently running</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">347</div>
            <p className="text-xs text-gray-400">This month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12.5%</div>
            <p className="text-xs text-gray-400">+2.1% improvement</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 bg-white dark:bg-white ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">ROI</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3.2x</div>
            <p className="text-xs text-gray-400">Return on investment</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/marketing-finance/campaigns">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Target className="h-5 w-5" />
                Campaign Management
              </CardTitle>
              <CardDescription className="text-gray-400">Create and manage marketing campaigns</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/marketing-finance/analytics">
          <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400">View campaign performance and ROI</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="border-gray-100 bg-white dark:bg-white hover: transition-shadow cursor-pointer ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Calendar className="h-5 w-5" />
              Event Management
            </CardTitle>
            <CardDescription className="text-gray-400">Plan and manage marketing events</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  // Render the appropriate dashboard based on user role
  const DashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'system_admin':
        return renderSystemAdminDashboard();
      case 'academic_staff':
        return renderAcademicStaffDashboard();
      case 'student':
        return <StudentDashboard />;
      case 'hr_personnel':
        return renderHRDashboard();
      case 'finance_staff':
        return renderFinanceDashboard();
      case 'marketing_team':
        return renderMarketingDashboard();
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
}
