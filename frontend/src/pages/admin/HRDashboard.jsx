import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign,
} from 'lucide-react';
import { HR_STATS, RECENT_HR_ACTIVITIES, DEPARTMENT_STATS } from './constants';
import { Layout } from '../../components/Layout';

export function HRDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-700">Administration & HR</h1>
          <p className="text-muted-foreground">
            Manage employees, attendance, payroll, and HR operations
          </p>
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
              <p className="text-xs text-muted-foreground">
                {HR_STATS.newHires} new hires this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-white dark:bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{HR_STATS.attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                Above target of 90%
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-white dark:bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{HR_STATS.pendingLeaves}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-white dark:bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payroll Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${HR_STATS.payrollBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Monthly allocation
              </p>
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
    </Layout>
  );
}
