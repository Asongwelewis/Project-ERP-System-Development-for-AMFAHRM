import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Video } from 'lucide-react';

export function NavigationTabs() {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Academics',
      path: '/dashboard/student/courses',
      icon: BookOpen
    },
    {
      label: 'Live Classroom',
      path: '/dashboard/student/live-classroom',
      icon: Video
    }
  ];

  return (
    <div className="bg-white border-b border-orange-200">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPath === tab.path;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  flex items-center gap-2 px-4 py-3 
                  ${isActive 
                    ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/50' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                  }
                  transition-colors
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
