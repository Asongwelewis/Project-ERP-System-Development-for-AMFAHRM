// Course Management Data
export const COURSE_STATS = {
  totalCourses: 24,
  activeCourses: 18,
  upcomingCourses: 4,
  archivedCourses: 2
};

// Student Course Data
export const STUDENT_COURSES = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Robert Smith',
    progress: 75,
    status: 'active',
    grade: 'A-',
    nextClass: '2025-08-26T10:00:00',
    materials: [
      { id: 1, name: 'Week 1 Slides', type: 'pdf', uploadedAt: '2025-08-20T08:00:00' },
      { id: 2, name: 'Programming Basics', type: 'pdf', uploadedAt: '2025-08-22T09:30:00' }
    ],
    assignments: [
      {
        id: 1,
        title: 'Programming Assignment 1',
        dueDate: '2025-09-01T23:59:59',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Quiz 1',
        dueDate: '2025-08-28T15:00:00',
        status: 'upcoming'
      }
    ],
    announcements: [
      {
        id: 1,
        title: 'Welcome to CS101',
        content: 'Please review the course syllabus and complete the introductory survey.',
        date: '2025-08-20T09:00:00'
      },
      {
        id: 2,
        title: 'Lab Session Changed',
        content: "This week's lab session will be held in Room 302 instead of 301.",
        date: '2025-08-23T14:30:00'
      }
    ]
  },
  {
    id: 2,
    code: 'MATH201',
    name: 'Advanced Calculus',
    instructor: 'Dr. Sarah Johnson',
    progress: 60,
    status: 'active',
    grade: 'B+',
    nextClass: '2025-08-26T13:00:00',
    materials: [
      { id: 3, name: 'Calculus Notes', type: 'pdf', uploadedAt: '2025-08-21T10:00:00' }
    ],
    assignments: [
      {
        id: 3,
        title: 'Homework Set 1',
        dueDate: '2025-08-30T23:59:59',
        status: 'pending'
      }
    ],
    announcements: [
      {
        id: 3,
        title: 'Office Hours Update',
        content: 'Additional office hours will be available this Thursday from 2-4 PM.',
        date: '2025-08-24T11:00:00'
      }
    ]
  },
  {
    id: 3,
    code: 'PHY301',
    name: 'Quantum Physics',
    instructor: 'Dr. Michael Chen',
    progress: 45,
    status: 'active',
    grade: 'A',
    nextClass: '2025-08-27T09:00:00',
    materials: [
      { id: 4, name: 'Quantum Mechanics Basics', type: 'pdf', uploadedAt: '2025-08-22T15:00:00' }
    ],
    assignments: [
      {
        id: 4,
        title: 'Problem Set 1',
        dueDate: '2025-09-05T23:59:59',
        status: 'pending'
      }
    ],
    announcements: [
      {
        id: 4,
        title: 'Lab Safety Reminder',
        content: "Please remember to bring your safety goggles to tomorrow's lab session.",
        date: '2025-08-24T16:00:00'
      }
    ]
  }
];

export const COURSE_LIST = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Computer Science',
    instructor: 'Dr. Robert Smith',
    students: 45,
    status: 'active',
    startDate: '2025-09-01',
    endDate: '2025-12-15'
  },
  {
    id: 2,
    code: 'MATH201',
    name: 'Advanced Calculus',
    department: 'Mathematics',
    instructor: 'Dr. Sarah Johnson',
    students: 32,
    status: 'active',
    startDate: '2025-09-01',
    endDate: '2025-12-15'
  },
  {
    id: 3,
    code: 'PHY301',
    name: 'Quantum Physics',
    department: 'Physics',
    instructor: 'Dr. Michael Chen',
    students: 28,
    status: 'upcoming',
    startDate: '2026-01-15',
    endDate: '2026-05-30'
  }
];

export const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering'
];

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'course_created',
    message: 'New course "Machine Learning Basics" created',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'enrollment',
    message: '15 students enrolled in "Advanced Calculus"',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'update',
    message: 'Course materials updated for "Introduction to Computer Science"',
    time: 'Yesterday'
  }
];
