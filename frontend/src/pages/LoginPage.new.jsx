import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { ArrowRight, GraduationCap, DollarSign, Users, Target, Loader2, AlertCircle } from 'lucide-react';
import { useJwtAuth } from '../context/JwtAuthContext';

// Animation variants for the cards
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

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { login, register, user, isLoading, error } = useJwtAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setUsername('');
    setFormErrors({});
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    try {
      await login('demo@example.com', 'demo123');
      navigate('/dashboard');
    } catch (err) {
      console.error('Demo login failed:', err);
      toast({
        title: 'Demo Login Failed',
        description: 'Could not log in with demo account. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    if (isSignup) {
      if (!username) errors.username = 'Full name is required';
      else if (username.split(' ').length < 2) errors.username = 'Please enter your full name';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isSignup) {
        await register({
          email,
          password,
          first_name: username.split(' ')[0],
          last_name: username.split(' ').slice(1).join(' ') || 'User',
          username: email.split('@')[0]
        });
        
        toast({
          title: 'Success!',
          description: 'Account created successfully! Please log in.',
          variant: 'default'
        });
        
        setIsSignup(false);
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(isSignup ? 'Signup error:' : 'Login error:', err);
      toast({
        title: isSignup ? 'Signup Failed' : 'Login Failed',
        description: error || 'An error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Right side - Login Form */}
      <motion.div 
        className="w-full flex items-center justify-center p-8 md:py-16"
        variants={rightCardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full max-w-md shadow-xl border-orange-200 bg-white">
          <CardHeader className="text-center bg-white rounded-t-lg p-6">
            <CardTitle className="text-orange-700">
              {isSignup ? 'Create an Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSignup ? 'Sign up to get started' : 'Sign in to continue to your account'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your full name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full ${formErrors.username ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.username && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  {formErrors.username && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.username}</p>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${formErrors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isSignup && (
                    <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full ${formErrors.password ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.password && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading || isSubmitting}
              >
                {(isLoading || isSubmitting) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignup ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : isSignup ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                <button 
                  onClick={toggleForm}
                  className="text-orange-600 hover:underline"
                  disabled={isLoading}
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </p>
              
              {!isSignup && (
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or try demo account</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleDemoLogin} 
                    variant="outline" 
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 mt-4"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading Demo...
                      </>
                    ) : 'Try Demo Account'}
                  </Button>
                </div>
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
