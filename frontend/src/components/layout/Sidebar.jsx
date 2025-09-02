import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/schedule', icon: Calendar, label: 'Schedule' },
    { to: '/reports', icon: FileText, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50';
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-orange-600">AMFA HRM</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col
          ">
            <nav className="flex-1 space-y-1 px-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive(item.to)}`}
                >
                  <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={() => {}}
              className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-6 w-6" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
