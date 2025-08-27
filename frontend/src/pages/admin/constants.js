// HR Statistics
export const HR_STATS = {
  totalEmployees: 85,
  activeEmployees: 82,
  pendingLeaves: 5,
  newHires: 3,
  attendanceRate: 94.2,
  payrollBudget: 450000
};

// Departments List
export const DEPARTMENTS = ['Lecturers', 'Administrative', 'IT Support', 'Maintenance'];

// Mock Employees Data
export const MOCK_EMPLOYEES = [
  { 
    id: 1, 
    name: 'Dr. Robert Smith', 
    email: 'r.smith@institution.edu', 
    department: 'Lecturers', 
    position: 'Professor', 
    joinDate: '2020-01-15',
    salary: 75000,
    status: 'active',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Jane Johnson',
    email: 'j.johnson@institution.edu',
    department: 'Administrative',
    position: 'HR Manager',
    joinDate: '2019-03-20',
    salary: 65000,
    status: 'active',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'm.brown@institution.edu',
    department: 'IT Support',
    position: 'IT Specialist',
    joinDate: '2021-06-10',
    salary: 55000,
    status: 'active',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    email: 's.davis@institution.edu',
    department: 'Lecturers',
    position: 'Assistant Professor',
    joinDate: '2022-08-01',
    salary: 60000,
    status: 'on_leave',
    phone: '+1 (555) 456-7890'
  }
];

// Attendance Data
export const MOCK_ATTENDANCE = [
  { id: 1, name: 'Dr. Robert Smith', department: 'Lecturers', clockIn: '8:30 AM', clockOut: '5:15 PM', status: 'present', hours: 8.75 },
  { id: 2, name: 'Jane Johnson', department: 'Administrative', clockIn: '9:00 AM', clockOut: '6:00 PM', status: 'present', hours: 9 },
  { id: 3, name: 'Michael Brown', department: 'IT Support', clockIn: '8:45 AM', clockOut: '5:30 PM', status: 'present', hours: 8.75 },
  { id: 4, name: 'Sarah Davis', department: 'Lecturers', clockIn: '-', clockOut: '-', status: 'sick_leave', hours: 0 },
  { id: 5, name: 'John Wilson', department: 'Maintenance', clockIn: '7:00 AM', clockOut: '3:00 PM', status: 'present', hours: 8 }
];

// Payroll Data
export const MOCK_PAYROLL = [
  { id: 1, name: 'Dr. Robert Smith', baseSalary: 75000, allowances: 5000, deductions: 8000, netPay: 72000, status: 'processed' },
  { id: 2, name: 'Jane Johnson', baseSalary: 65000, allowances: 3000, deductions: 6800, netPay: 61200, status: 'processed' },
  { id: 3, name: 'Michael Brown', baseSalary: 55000, allowances: 2000, deductions: 5700, netPay: 51300, status: 'pending' },
  { id: 4, name: 'Sarah Davis', baseSalary: 60000, allowances: 2500, deductions: 6250, netPay: 56250, status: 'processed' }
];

// Leave Requests
export const MOCK_LEAVE_REQUESTS = [
  { id: 1, employee: 'Sarah Davis', type: 'Sick Leave', startDate: '2025-08-20', endDate: '2025-08-22', days: 3, status: 'pending', reason: 'Medical appointment and recovery' },
  { id: 2, employee: 'Michael Brown', type: 'Vacation', startDate: '2025-09-01', endDate: '2025-09-05', days: 5, status: 'approved', reason: 'Family vacation' },
  { id: 3, employee: 'Dr. Robert Smith', type: 'Conference', startDate: '2025-08-25', endDate: '2025-08-26', days: 2, status: 'approved', reason: 'Academic conference attendance' },
  { id: 4, employee: 'Jane Johnson', type: 'Personal', startDate: '2025-08-30', endDate: '2025-08-30', days: 1, status: 'pending', reason: 'Personal matters' }
];

// Department Statistics
export const DEPARTMENT_STATS = [
  {
    name: "Academic Department",
    count: 45,
    budget: 85000,
    utilization: 78,
  },
  {
    name: "Administrative Staff",
    count: 28,
    budget: 52000,
    utilization: 85,
  },
  {
    name: "Support Services",
    count: 32,
    budget: 48000,
    utilization: 92,
  },
  {
    name: "IT Department",
    count: 18,
    budget: 42000,
    utilization: 73,
  },
];

// Recent HR Activities
export const RECENT_HR_ACTIVITIES = [
  {
    id: 1,
    type: "hire",
    message: "New faculty member joined the Computer Science department",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "leave",
    message: "Leave request approved for Sarah Johnson",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "payroll",
    message: "Monthly payroll processing completed",
    time: "Yesterday"
  },
  {
    id: 4,
    type: "review",
    message: "Performance reviews scheduled for IT department",
    time: "2 days ago"
  },
  {
    id: 5,
    type: "hire",
    message: "Two new administrative assistants onboarded",
    time: "3 days ago"
  }
];
