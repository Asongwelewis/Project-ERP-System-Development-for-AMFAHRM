import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Users, Calendar, Award, Clock, DollarSign, TrendingUp, Target,
  BarChart3, FileText, Settings, Shield, CheckCircle, ChartLine
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  // --- System Admin Dashboard ---
  const renderSystemAdminDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">System Administration Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive system management and oversight
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">1,247</div>
            <p className="text-xs text-muted-foreground">+12 new this week</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">342</div>
            <p className="text-xs text-muted-foreground">Current active users</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
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
        <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
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
        <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
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
      </div>
    </div>
  );

  // --- Academic Staff Dashboard ---
  const renderAcademicStaffDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">Academic Staff Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your courses, students, and academic activities
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">234</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <Award className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">15</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Next 2 weeks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/dashboard/student/courses">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <BookOpen className="h-5 w-5" />
                Course Management
              </CardTitle>
              <CardDescription>Manage your course content and materials</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/academic/performance">
          <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                Student Performance
              </CardTitle>
              <CardDescription>Track and analyze student progress</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/academic/grades">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
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
  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">Student Portal</h1>
        <p className="text-muted-foreground">
          Access your academic information and services
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3.85</div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <p className="text-xs text-muted-foreground">Overall rate</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$0</div>
            <p className="text-xs text-muted-foreground">All paid up</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/dashboard/student/courses">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <BookOpen className="h-5 w-5" />
                My Courses
              </CardTitle>
              <CardDescription>Access course materials and content</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/dashboard/student/grades">
          <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Award className="h-5 w-5" />
                My Grades
              </CardTitle>
              <CardDescription>View your academic performance</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/marketing-finance/tuition">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <DollarSign className="h-5 w-5" />
                Fee Payments
              </CardTitle>
              <CardDescription>Manage your tuition and fees</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );

  // --- HR Dashboard ---
  const renderHRDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">HR Management Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive human resource management and operations
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">156</div>
            <p className="text-xs text-muted-foreground">+5 new hires</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-muted-foreground">Requests to review</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Ready</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">98%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Reviews</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin-hr/employees">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
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
          <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
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
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
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
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">Finance Management Dashboard</h1>
        <p className="text-muted-foreground">
          Financial operations, reporting, and budget management
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$125K</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">73%</div>
            <p className="text-xs text-muted-foreground">Current fiscal year</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28.8%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/marketing-finance/tuition">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
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
          <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
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
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
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
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg border border-orange-200">
        <h1 className="text-orange-700">Marketing Team Dashboard</h1>
        <p className="text-muted-foreground">
          Campaign management, lead tracking, and performance analytics
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">347</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3.2x</div>
            <p className="text-xs text-muted-foreground">Return on investment</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/marketing-finance/campaigns">
          <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Target className="h-5 w-5" />
                Campaign Management
              </CardTitle>
              <CardDescription>Create and manage marketing campaigns</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/marketing-finance/analytics">
          <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>View campaign performance and ROI</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Calendar className="h-5 w-5" />
              Event Management
            </CardTitle>
            <CardDescription>Plan and manage marketing events</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  // --- Role Switcher ---
  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'system_admin':
        return renderSystemAdminDashboard();
      case 'academic_staff':
        return renderAcademicStaffDashboard();
      case 'student':
        return renderStudentDashboard();
      case 'hr_personnel':
        return renderHRDashboard();
      case 'finance_staff':
        return renderFinanceDashboard();
      case 'marketing_team':
        return renderMarketingDashboard();
      default:
        return <div className="p-8 text-center text-lg">No dashboard available for this role.</div>;
    }
  };

  return (
    <Layout>
      {renderDashboardByRole()}
    </Layout>
  );
}
