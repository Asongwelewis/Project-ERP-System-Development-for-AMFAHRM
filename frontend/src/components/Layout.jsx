import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  User, 
  Moon, 
  Sun,
  GraduationCap,
  Bell,
  Home
} from 'lucide-react';

/**
 * Layout Component
 * Wraps all pages with common elements:
 * - MenuBar (persistent left-side menu)
 * - Logout button
 * - Container for page content
 */
export function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: Home, label: 'Dashboard', allowedRoles: ['system_admin', 'academic_staff', 'student', 'hr_personnel', 'finance_staff', 'marketing_team'] }
    ];

    const roleBasedItems = [
      // Academic Module - Available to Academic Staff and Students
      { path: '/academic/courses', icon: BookOpen, label: 'Academic', allowedRoles: ['academic_staff', 'student', 'system_admin'] },
      
      // Marketing & Finance - Available to Finance Staff, Marketing Team, and System Admin
      { path: '/marketing-finance', icon: DollarSign, label: 'Finance & Marketing', allowedRoles: ['finance_staff', 'marketing_team', 'system_admin'] },
      
      // Admin & HR - Available to HR Personnel and System Admin
      { path: '/admin-hr', icon: Users, label: 'Admin & HR', allowedRoles: ['hr_personnel', 'system_admin'] },
      
      // Live Classroom - Available to Academic Staff and Students
      { path: '/academic/live-classroom', icon: GraduationCap, label: 'Live Classroom', allowedRoles: ['academic_staff', 'student', 'system_admin'] }
    ];

    return [...baseItems, ...roleBasedItems].filter(item => 
      item.allowedRoles.includes(user?.role)
    );
  };

  const getUserRoleDisplay = () => {
    const roleLabels = {
      'system_admin': 'System Administrator',
      'academic_staff': 'Academic Staff',
      'student': 'Student',
      'hr_personnel': 'HR Personnel',
      'finance_staff': 'Finance Staff',
      'marketing_team': 'Marketing Team'
    };
    return roleLabels[user?.role] || 'User';
  };

  const getRoleColor = () => {
    const roleColors = {
      'system_admin': 'text-red-600 dark:text-red-400',
      'academic_staff': 'text-orange-600 dark:text-orange-400',
      'student': 'text-blue-600 dark:text-blue-400',
      'hr_personnel': 'text-green-600 dark:text-green-400',
      'finance_staff': 'text-purple-600 dark:text-purple-400',
      'marketing_team': 'text-pink-600 dark:text-pink-400'
    };
    return roleColors[user?.role] || 'text-gray-600 dark:text-gray-400';
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  EduManage Pro
                </h1>
                <p className="text-xs text-muted-foreground">Educational ERP System</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`flex items-center gap-2 ${
                        isActive 
                          ? "bg-orange-500 hover:bg-orange-600 text-white" 
                          : "hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Dark Mode Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className={`text-xs ${getRoleColor()}`}>{getUserRoleDisplay()}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className={`text-xs ${getRoleColor()}`}>{getUserRoleDisplay()}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  {user?.role === 'system_admin' && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden border-b bg-background p-2">
        <nav className="flex overflow-x-auto space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    isActive 
                      ? "bg-orange-500 hover:bg-orange-600 text-white" 
                      : "hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Banner */}
      <div className={`px-4 py-2 text-center text-sm border-b ${
        user?.role === 'system_admin' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' :
        user?.role === 'academic_staff' ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800' :
        user?.role === 'student' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' :
        user?.role === 'hr_personnel' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
        user?.role === 'finance_staff' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800' :
        'bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800'
      }`}>
        <span className={`font-medium ${getRoleColor()}`}>
          Logged in as {getUserRoleDisplay()}
        </span>
        {user?.permissions && user.permissions.length > 0 && (
          <span className="text-muted-foreground ml-2">
            • {user.permissions.length} permissions granted
          </span>
        )}
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 EduManage Pro. Comprehensive Educational ERP System.</p>
        </div>
      </footer>
    </div>
  );
}
