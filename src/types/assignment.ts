export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    teacherId: string;
    studentIds: string[];
}