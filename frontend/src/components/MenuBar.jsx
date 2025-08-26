import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function MenuBar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const getMenuItems = () => {
    switch (user?.role) {
      case 'system_admin':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'User Management', path: '/admin/users' },
          { label: 'System Settings', path: '/admin/settings' },
          { label: 'Security', path: '/admin/security' },
          { label: 'Reports', path: '/admin/reports' }
        ];
      case 'academic_staff':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Courses', path: '/academic/courses' },
          { label: 'Students', path: '/academic/students' },
          { label: 'Grades', path: '/academic/grades' },
          { label: 'Schedule', path: '/academic/schedule' }
        ];
      case 'student':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'My Courses', path: '/academic/courses' },
          { label: 'My Grades', path: '/academic/grades' },
          { label: 'Schedule', path: '/academic/schedule' },
          { label: 'Fee Payments', path: '/marketing-finance/tuition' }
        ];
      case 'hr_personnel':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Employees', path: '/admin-hr/employees' },
          { label: 'Payroll', path: '/admin-hr/payroll' },
          { label: 'Leave Management', path: '/admin-hr/leave' },
          { label: 'Performance', path: '/admin-hr/performance' }
        ];
      case 'finance_staff':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Invoices', path: '/marketing-finance/tuition' },
          { label: 'Expenses', path: '/marketing-finance/expenses' },
          { label: 'Reports', path: '/marketing-finance/reports' },
          { label: 'Budget', path: '/marketing-finance/budget' }
        ];
      case 'marketing_team':
        return [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Campaigns', path: '/marketing-finance/campaigns' },
          { label: 'Analytics', path: '/marketing-finance/analytics' },
          { label: 'Events', path: '/marketing-finance/events' },
          { label: 'Reports', path: '/marketing-finance/reports' }
        ];
      default:
        return [{ label: 'Dashboard', path: '/dashboard' }];
    }
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
      >
        <Menu className="h-6 w-6 text-orange-600" />
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Items */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-orange-200 shadow-lg z-50 p-4">
            <div className="pt-14 space-y-1">
              {getMenuItems().map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
