export interface Assignment {
    _id: string;
    title: string;
    description: string;
    course?: string;
    dueDate: string;
    totalPoints?: number;
    attachments?: string[];
    teacher?: any;
    students?: any[];
    workspace: string;
}