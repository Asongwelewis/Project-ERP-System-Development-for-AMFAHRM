import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { GraduationCap, User, Shield, Users, DollarSign, Target } from 'lucide-react';
import { useJwtAuth } from '../context/JwtAuthContext';

// Animation variants
const leftCardVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const rightCardVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, delay: 0.2 }
  }
};

export function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student' // Default role
  });
  const [errors, setErrors] = useState({});
  const { register, user, isLoading, error } = useJwtAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName || '',
        role: formData.role,
        username: formData.email.split('@')[0]
      });
      
      // On successful registration, redirect to login or dashboard
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      console.error('Signup error:', err);
      // Error will be handled by the JwtAuthContext
    }
  };

  const userRoles = [
    {
      value: 'student',
      label: 'Student',
      description: 'Access to courses, assignments, and grades',
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />,
      permissions: ['View Grades', 'Check Attendance', 'Submit Assignments', 'Access Materials']
    },
    {
      value: 'teacher',
      label: 'Teacher',
      description: 'Create and manage courses, assignments, and grades',
      icon: <User className="h-5 w-5 text-green-500" />,
      permissions: ['Create Courses', 'Grade Assignments', 'Track Attendance', 'Manage Content']
    },
    {
      value: 'admin',
      label: 'Administrator',
      description: 'Full system access and management',
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      permissions: ['Manage Users', 'Configure System', 'Generate Reports', 'Backup/Restore Data']
    },
    {
      value: 'academic_staff',
      label: 'Academic Staff',
      description: 'Manage courses and student academics',
      icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
      permissions: ['Manage Courses', 'Track Attendance', 'Grade Students', 'Schedule Exams']
    }
  ];

  const selectedRole = userRoles.find(r => r.value === formData.role);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-orange-50 p-4 md:p-0">
      {/* Left side - Welcome and Features */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center p-8 md:py-16 space-y-8 bg-orange-50"
        variants={leftCardVariants}
        initial="hidden"
        animate="visible"
      >
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
            <motion.div variants={leftCardVariants}>
              <Card className="border-orange-200 bg-white shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    {React.cloneElement(selectedRole.icon, { className: 'h-5 w-5' })}
                    {selectedRole.label} Access
                  </CardTitle>
                  <CardDescription className="text-gray-700">{selectedRole.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRole.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* System Features */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={leftCardVariants}
          >
            <div className="p-4 rounded-lg border border-orange-200 bg-white">
              <GraduationCap className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-medium text-orange-700">Academic</h3>
              <p className="text-xs text-gray-700">Course & Student Management</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 bg-white">
              <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium text-blue-700">Finance</h3>
              <p className="text-xs text-gray-700">Fee & Payment Tracking</p>
            </div>
            <div className="p-4 rounded-lg border border-orange-200 bg-white">
              <Users className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-medium text-orange-700">HR</h3>
              <p className="text-xs text-gray-700">Employee Management</p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 bg-white">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium text-blue-700">Marketing</h3>
              <p className="text-xs text-gray-700">Campaign Analytics</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Signup Form */}
      <motion.div 
        className="w-full flex items-center justify-center p-8 md:py-16"
        variants={rightCardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full max-w-md shadow-xl border-orange-200 bg-white">
          <CardHeader className="text-center bg-white rounded-t-lg p-6">
            <CardTitle className="text-orange-700">Create Your Account</CardTitle>
            <CardDescription className="text-gray-600">Join us and get started with your educational journey</CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name (Optional)</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          {role.icon}
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default SignupPage;
