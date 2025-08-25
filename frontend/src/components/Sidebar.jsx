import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  DollarSign,
  Calendar,
  Clock
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isHRPersonnel = user?.role === 'hr_personnel' || user?.role === 'system_admin';
  const isAcademicStaff = user?.role === 'academic_staff' || user?.role === 'system_admin';

  const hrLinks = [
    {
      title: 'Employees',
      href: '/admin-hr/employees',
      icon: Users,
    },
    {
      title: 'Attendance',
      href: '/admin-hr/attendance',
      icon: Clock,
    },
    {
      title: 'Leave Management',
      href: '/admin-hr/leave',
      icon: Calendar,
    },
    {
      title: 'Payroll',
      href: '/admin-hr/payroll',
      icon: DollarSign,
    },
  ];

  const academicLinks = [
    {
      title: 'Courses',
      href: '/academic/courses',
      icon: GraduationCap,
    },
    {
      title: 'Assignments',
      href: '/academic/assignments',
      icon: ClipboardCheck,
    },
    // Add other academic links as needed
  ];

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
          <div className="space-y-1">
            {/* HR Management Section */}
            {isHRPersonnel && (
              <div className="space-y-1">
                <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">HR Management</h3>
                {hrLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-orange-900 ${
                        location.pathname === link.href 
                          ? 'bg-orange-100 text-orange-900' 
                          : 'text-gray-500 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Academic Section */}
            {isAcademicStaff && (
              <div className="space-y-1">
                <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">Academic</h3>
                {academicLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-orange-900 ${
                        location.pathname === link.href 
                          ? 'bg-orange-100 text-orange-900' 
                          : 'text-gray-500 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
