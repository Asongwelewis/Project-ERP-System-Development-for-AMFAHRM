
// Service étudiant connecté au backend Django
const BASE_URL = 'http://localhost:8000';

export async function getStudentCourses(studentId) {
  const res = await fetch(`${BASE_URL}/api/student/${studentId}/courses/`);
  if (!res.ok) throw new Error('Erreur récupération des cours');
  return res.json();
}

export async function getStudentAssignments(studentId) {
  const res = await fetch(`${BASE_URL}/api/student/${studentId}/assignments/`);
  if (!res.ok) throw new Error('Erreur récupération des devoirs');
  return res.json();
}

export async function getStudentExams(studentId) {
  const res = await fetch(`${BASE_URL}/api/student/${studentId}/exams/`);
  if (!res.ok) throw new Error('Erreur récupération des examens');
  return res.json();
}

export async function getStudentGrades(studentId) {
  const res = await fetch(`${BASE_URL}/api/student/${studentId}/grades/`);
  if (!res.ok) throw new Error('Erreur récupération des notes');
  return res.json();
}

export async function getStudentSchedule(studentId) {
  const res = await fetch(`${BASE_URL}/api/student/${studentId}/schedule/`);
  if (!res.ok) throw new Error('Erreur récupération du planning');
  return res.json();
}
