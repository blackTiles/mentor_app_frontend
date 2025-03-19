export interface Teacher {
  id: string;
  name: string;
  subject: string;
  students: string[]; // Array of student IDs assigned to the teacher
}