// Mock student service with async functions returning sample data
export async function getStudentCourses(studentId) {
  // simulate network delay
  await new Promise(r => setTimeout(r, 200));
  return [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', progress: 75, credits: 3 },
    { id: 2, code: 'MATH201', name: 'Advanced Calculus', instructor: 'Prof. Johnson', progress: 60, credits: 4 },
    { id: 3, code: 'PHYS101', name: 'Physics Fundamentals', instructor: 'Dr. Brown', progress: 85, credits: 3 },
  ];
}

export async function getStudentAssignments(studentId) {
  await new Promise(r => setTimeout(r, 200));
  return [
    { id: 'A1', course: 'CS101', title: 'Algorithms Basics', dueDate: '2025-09-05', status: 'pending' },
    { id: 'A2', course: 'MATH201', title: 'Integrals Set 2', dueDate: '2025-09-08', status: 'submitted' },
    { id: 'A3', course: 'PHYS101', title: 'Kinematics Lab', dueDate: '2025-09-12', status: 'overdue' },
  ];
}

export async function getStudentExams(studentId) {
  await new Promise(r => setTimeout(r, 200));
  return [
    { id: 'E1', course: 'CS101', name: 'Midterm', date: '2025-10-02', time: '10:00', venue: 'Hall A' },
    { id: 'E2', course: 'MATH201', name: 'Quiz 1', date: '2025-09-20', time: '14:00', venue: 'Room 204' },
  ];
}

export async function getStudentGrades(studentId) {
  await new Promise(r => setTimeout(r, 200));
  return [
    { course: 'CS101', name: 'Introduction to Computer Science', grade: 'A-', credits: 3 },
    { course: 'MATH201', name: 'Advanced Calculus', grade: 'B+', credits: 4 },
    { course: 'PHYS101', name: 'Physics Fundamentals', grade: 'A', credits: 3 },
  ];
}

export async function getStudentSchedule(studentId) {
  await new Promise(r => setTimeout(r, 200));
  return [
    { id: 'S1', day: 'Mon', time: '09:00 - 11:00', course: 'CS101', venue: 'Lab 1' },
    { id: 'S2', day: 'Wed', time: '12:00 - 14:00', course: 'MATH201', venue: 'Room 210' },
    { id: 'S3', day: 'Fri', time: '10:00 - 12:00', course: 'PHYS101', venue: 'Hall B' },
  ];
}
