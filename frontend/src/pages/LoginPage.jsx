
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { GraduationCap, User, Shield, Users, DollarSign, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const { login } = useAuth();

	const handleLogin = () => {
    if (!username || !password || !role) {
      alert('Please fill in all fields');
      return;
    }

    // Check demo credentials
    const isValidCredential = (
      (username === 'admin' && password === 'admin123' && role === 'system_admin') ||
      (username === 'teacher' && password === 'teacher123' && role === 'academic_staff') ||
      (username === 'student' && password === 'student123' && role === 'student') ||
      (username === 'hr' && password === 'hr123' && role === 'hr_personnel')
    );

    if (!isValidCredential) {
      alert('Invalid credentials. Please check your username, password, and role.');
      return;
    }

    // Create user data with role-based permissions
    const userData = {
      username,
      role,
      email: `${username}@institution.edu`,
      id: Math.random().toString(36).substr(2, 9),
      name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
      permissions: getUserPermissions(role)
    };

    // Call the login function from context
    login(userData);
    // The ProtectedRoute will handle the redirect
  };

	const getUserPermissions = (userRole) => {
		const permissions = {
			'system_admin': [
				'manage_users', 'configure_system', 'generate_reports', 'backup_restore', 
				'view_all_modules', 'system_settings'
			],
			'academic_staff': [
				'manage_courses', 'track_attendance', 'grade_students', 'schedule_exams',
				'view_student_performance', 'course_materials'
			],
			'student': [
				'view_grades', 'check_attendance', 'pay_fees', 'access_course_materials',
				'view_events', 'view_financial_reports', 'submit_assignments'
			],
			'hr_personnel': [
				'manage_employees', 'process_payroll', 'track_leave', 'performance_review',
				'employee_records', 'attendance_management'
			],
			'finance_staff': [
				'manage_invoices', 'track_payments', 'generate_financial_reports', 
				'budget_planning', 'expense_management', 'revenue_tracking'
			],
			'marketing_team': [
				'campaign_management', 'lead_tracking', 'roi_analysis', 'event_management',
				'analytics_dashboard', 'marketing_reports'
			]
		};
		return permissions[userRole] || [];
	};

	const userRoles = [
		{
			value: 'system_admin',
			label: 'System Administrator',
			description: 'Full system access and management',
			icon: Shield,
			permissions: ['Manage Users', 'Configure System', 'Generate Reports', 'Backup/Restore Data']
		},
		{
			value: 'academic_staff',
			label: 'Academic Staff',
			description: 'Manage courses and student academics',
			icon: GraduationCap,
			permissions: ['Manage Courses', 'Track Attendance', 'Grade Students', 'Schedule Exams']
		},
		{
			value: 'student',
			label: 'Student',
			description: 'Access courses and academic services',
			icon: User,
			permissions: ['View Grades', 'Check Attendance', 'Pay Fees', 'Access Materials']
		},
		{
			value: 'hr_personnel',
			label: 'HR Personnel',
			description: 'Human resources management',
			icon: Users,
			permissions: ['Manage Employees', 'Process Payroll', 'Track Leave', 'Performance Review']
		},
		{
			value: 'finance_staff',
			label: 'Finance Staff',
			description: 'Financial operations and reporting',
			icon: DollarSign,
			permissions: ['Manage Invoices', 'Track Payments', 'Financial Reports', 'Budget Planning']
		},
		{
			value: 'marketing_team',
			label: 'Marketing Team',
			description: 'Marketing campaigns and analytics',
			icon: Target,
			permissions: ['Campaign Management', 'Lead Tracking', 'ROI Analysis', 'Event Management']
		}
	];

	const selectedRole = userRoles.find(r => r.value === role);

		return (
			<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
			<div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
				{/* Left side - Branding and Info */}
				<div className="space-y-6">
					<div className="text-center md:text-left">
						<div className="flex items-center justify-center md:justify-start gap-3 mb-4">
							<div className="p-3 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl">
								<GraduationCap className="h-8 w-8 text-white" />
							</div>
							<div>
								<h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
									EduManage Pro
								</h1>
								<p className="text-sm text-muted-foreground">Comprehensive Educational ERP System</p>
							</div>
						</div>
						<p className="text-lg text-muted-foreground mb-6">
							Welcome to our integrated platform for academic management, finance tracking, 
							HR operations, and marketing analytics.
						</p>
					</div>

					{/* Role Information Display */}
					{selectedRole && (
						<Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50/50 to-blue-50/50 dark:from-orange-950/20 dark:to-blue-950/20">
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
									<selectedRole.icon className="h-5 w-5" />
									{selectedRole.label} Access
								</CardTitle>
								<CardDescription>{selectedRole.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-2">
									{selectedRole.permissions.map((permission, index) => (
										<div key={index} className="flex items-center gap-2 text-sm">
											<div className="w-2 h-2 bg-orange-500 rounded-full" />
											<span className="text-muted-foreground">{permission}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* System Features */}
					<div className="grid grid-cols-2 gap-4">
						<div className="text-center p-4 rounded-lg border border-orange-200 dark:border-orange-800">
							<GraduationCap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
							<h3 className="font-medium text-orange-700 dark:text-orange-300">Academic</h3>
							<p className="text-xs text-muted-foreground">Course & Student Management</p>
						</div>
						<div className="text-center p-4 rounded-lg border border-blue-200 dark:border-blue-800">
							<DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-2" />
							<h3 className="font-medium text-blue-700 dark:text-blue-300">Finance</h3>
							<p className="text-xs text-muted-foreground">Fee & Payment Tracking</p>
						</div>
						<div className="text-center p-4 rounded-lg border border-orange-200 dark:border-orange-800">
							<Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
							<h3 className="font-medium text-orange-700 dark:text-orange-300">HR</h3>
							<p className="text-xs text-muted-foreground">Employee Management</p>
						</div>
						<div className="text-center p-4 rounded-lg border border-blue-200 dark:border-blue-800">
							<Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
							<h3 className="font-medium text-blue-700 dark:text-blue-300">Marketing</h3>
							<p className="text-xs text-muted-foreground">Campaign Analytics</p>
						</div>
					</div>
				</div>

				{/* Right side - Login Form */}
						<Card className="shadow-xl border-orange-200 bg-white">
							<CardHeader className="text-center bg-gradient-to-r from-orange-50 to-blue-50 rounded-t-lg">
								<CardTitle className="text-orange-700">Sign In to Your Account</CardTitle>
								<CardDescription>Access your personalized dashboard and tools</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6 p-6 bg-white">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
											<Input
												id="username"
												type="text"
												placeholder="Enter your username"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												className="border-orange-200 focus:border-orange-400 bg-white"
											/>
						</div>
            
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
											<Input
												id="password"
												type="password"
												placeholder="Enter your password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="border-orange-200 focus:border-orange-400 bg-white"
											/>
						</div>
            
						<div className="space-y-2">
							<Label htmlFor="role">Role</Label>
											                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400 bg-white dark:bg-white dark:text-gray-900">
                    <SelectValue placeholder="Select your role">{selectedRole?.label}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white border-orange-200">
                    {userRoles.map((roleOption) => (
                      <SelectItem 
                        key={roleOption.value} 
                        value={roleOption.value} 
                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-orange-50 hover:text-orange-600 data-[active]:bg-orange-50 data-[active]:text-orange-600"
                      >
                        <div className="flex items-center gap-2">
                          <roleOption.icon className="h-4 w-4" />
                          {roleOption.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
						</div>
            
						<Button 
							onClick={handleLogin}
							className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white"
							size="lg"
						>
							Sign In
						</Button>

						{/* Demo credentials */}
						<div className="border-t pt-4">
							<p className="text-sm text-muted-foreground text-center mb-3">Demo Credentials:</p>
							<div className="grid grid-cols-2 gap-2 text-xs">
								<div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
									<strong>Admin:</strong> admin/admin123
								</div>
								<div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
									<strong>Teacher:</strong> teacher/teacher123
								</div>
								<div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
									<strong>Student:</strong> student/student123
								</div>
								<div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
									<strong>HR:</strong> hr/hr123
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
