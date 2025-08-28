// Mock Exam Service with localStorage persistence
// Entities:
// - InstructorExam: { id, courseCode, courseTitle, createdBy, type: 'written'|'practical'|'both', specialInfo, attachments: [{name, url, mime}] }
// - HRDetails: { examId, date, time, venue, invigilators: [string] }

const LS_KEY = 'exam_service_data_v1';

function readStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { exams: [], hr: [] };
  } catch {
    return { exams: [], hr: [] };
  }
}

function writeStore(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function uid() {
  return 'EX' + Math.random().toString(36).slice(2, 9);
}

// Mock courses per instructor
export async function getLecturerCourses(lecturerId) {
  await new Promise(r => setTimeout(r, 150));
  // In absence of backend, return a static set; in real app, filter by lecturerId
  return [
    { code: 'CS101', title: 'Introduction to Computer Science' },
    { code: 'MATH201', title: 'Advanced Calculus' },
    { code: 'PHYS101', title: 'Physics Fundamentals' },
  ];
}

export async function createInstructorExam({ courseCode, courseTitle, createdBy, type, specialInfo, attachments }) {
  await new Promise(r => setTimeout(r, 150));
  const store = readStore();
  const exam = { id: uid(), courseCode, courseTitle, createdBy, type, specialInfo: specialInfo || '', attachments: attachments || [] };
  store.exams.push(exam);
  writeStore(store);
  return exam;
}

export async function listInstructorExams(lecturerId) {
  await new Promise(r => setTimeout(r, 120));
  const store = readStore();
  // Without lecturer ownership mapping, show all exams created by anyone or filter if createdBy provided
  return store.exams.filter(e => !lecturerId || e.createdBy === lecturerId);
}

export async function deleteExam(examId) {
  await new Promise(r => setTimeout(r, 100));
  const store = readStore();
  store.exams = store.exams.filter(e => e.id !== examId);
  store.hr = store.hr.filter(h => h.examId !== examId);
  writeStore(store);
}

export async function upsertHRDetails({ examId, date, time, venue, invigilators }) {
  await new Promise(r => setTimeout(r, 150));
  const store = readStore();
  const idx = store.hr.findIndex(h => h.examId === examId);
  const payload = { examId, date: date || '', time: time || '', venue: venue || '', invigilators: invigilators || [] };
  if (idx >= 0) store.hr[idx] = payload; else store.hr.push(payload);
  writeStore(store);
  return payload;
}

export async function listAllExamsWithHR() {
  await new Promise(r => setTimeout(r, 120));
  const store = readStore();
  return store.exams.map(e => ({
    ...e,
    hr: store.hr.find(h => h.examId === e.id) || null,
  }));
}

export async function getStudentExamTimetable(studentId) {
  await new Promise(r => setTimeout(r, 150));
  // For now, students see all scheduled exams; in a real app, filter by student's enrolled courses
  const all = await listAllExamsWithHR();
  return all
    .filter(e => !!e.hr) // only those with HR schedule set
    .map(e => ({
      id: e.id,
      course: `${e.courseTitle} (${e.courseCode})`,
      name: 'Exam',
      type: e.type,
      date: e.hr?.date || '',
      time: e.hr?.time || '',
      venue: e.hr?.venue || '',
      invigilators: (e.hr?.invigilators || []).join(', '),
      specialInfo: e.specialInfo || '',
    }));
}
