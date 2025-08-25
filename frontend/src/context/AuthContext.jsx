import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Map old roles to new roles for backward compatibility
    const roleMappings = {
      'admin': 'system_admin',
      'teacher': 'academic_staff',
      'student': 'student',
      'hr_manager': 'hr_personnel',
      'finance_manager': 'finance_staff'
    };

    const mappedRole = roleMappings[userData.role] || userData.role;
    
    setUser({
      ...userData,
      role: mappedRole,
      originalRole: userData.role // Keep original for compatibility
    });
  };

  const logout = () => {
    setUser(null);
    // Clear any stored data
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
