interface Attendance {
    date: string;
    status: string; // 'present' or 'absent'
}

interface Assignment {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    marks?: number; // Optional, only for completed assignments
}

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    status: string;
    assignedClasses: string[];
    assignedSubjects: string[];
    profilePicture: string;
    dateOfJoining: string;
    dateOfAssignment: string;
    dateOfCompletion: string;
    assignments: Assignment[];
    attendance: Attendance[];
}

interface Teacher {
    id: number;
    name: string;
    subject: string;
    email: string;
    phone: string;
    address: string;
    experience: number;
    qualifications: string;
    profilePicture: string;
    dateOfBirth: string;
    dateOfJoining: string;
    status: string;
    assignedClasses: string[];
    assignedSubjects: string[];
    assignedStudents: Student[];
}

export const teachersData:Teacher[] = [
    {
        id: 1,
        name: 'John Doe',
        subject: 'Mathematics',
        email: '123@gmail.com',
        phone: '123-456-7890',
        address: '123 Main St, City, Country',
        experience: 5,
        qualifications: 'M.Sc. in Mathematics',
        profilePicture: 'https://via.placeholder.com/150',
        dateOfBirth: '1990-01-01',
        dateOfJoining: '2015-08-01',
        status: 'active',
        assignedClasses: ['Class 1', 'Class 2'],
        assignedSubjects: ['Math', 'Science'],
        assignedStudents: [
            {
                id: 1,
                name: 'Jane Smith',
                email: 'abc@gmail.com',
                phone: '987-654-3210',
                address: '456 Elm St, City, Country',
                dateOfBirth: '2005-05-15',
                status: 'active',
                assignedClasses: ['Class 1'],
                assignedSubjects: ['Math'],
                profilePicture: 'https://via.placeholder.com/150',
                dateOfJoining: '2020-01-01',
                dateOfAssignment: '2020-01-01',
                dateOfCompletion: '2021-01-01',
                assignments: [
                    {
                        id: 1,
                        title: 'Math Assignment 1',
                        description: 'Solve the problems in Chapter 1',
                        dueDate: '2023-10-01',
                        status: 'completed',
                        marks: 95,
                    },
                    {
                        id: 2,
                        title: 'Math Assignment 2',
                        description: 'Solve the problems in Chapter 2',
                        dueDate: '2023-10-15',
                        status: 'pending',
                    },
                ],
                attendance: [
                    {
                        date: '2023-09-01',
                        status: 'present',
                    },
                    {
                        date: '2023-09-02',
                        status: 'absent',
                    },
                    {
                        date: '2023-09-03',
                        status: 'present',
                    },
                ],
            },
        ],
    },

]

export const studentsData:Student[] = [
    {
        id: 1,
        name: 'Jane Smith',
        email: 'abc@gmail.com',
        phone: '987-654-3210',
        address: '456 Elm St, City, Country',
        dateOfBirth: '2005-05-15',
        status: 'active',
        assignedClasses: ['Class 1'],
        assignedSubjects: ['Math'],
        profilePicture: 'https://via.placeholder.com/150',

        dateOfJoining: '2020-01-01',
        dateOfAssignment: '2020-01-01',
        dateOfCompletion: '2021-01-01',
        assignments: [
            {
                id: 1,
                title: 'Math Assignment 1',
                description: 'Solve the problems in Chapter 1',
                dueDate: '2023-10-01',
                status: 'completed',
                marks: 95,
            },
            {
                id: 2,
                title: 'Math Assignment 2',
                description: 'Solve the problems in Chapter 2',
                dueDate: '2023-10-15',
                status: 'pending',
            },
        ],
        attendance: [
            {
                date: '2023-09-01',
                status: 'present',
            },
            {
                date: '2023-09-02',
                status: 'absent',
            },
            {
                date: '2023-09-03',
                status: 'present',
            },
        ],
    },
    {
        id: 2,
        name: 'John Doe',
        email: '123@gmail.com',
        phone: '123-456-7890',
        address: '123 Main St, City, Country',
        dateOfBirth: '2005-05-15',
        status: 'active',
        assignedClasses: ['Class 1'],
        assignedSubjects: ['Math'],
        profilePicture: 'https://via.placeholder.com/150',
        dateOfJoining: '2020-01-01',
        dateOfAssignment: '2020-01-01',
        dateOfCompletion: '2021-01-01',
        assignments: [
            {
                id: 1,
                title: 'Math Assignment 1',
                description: 'Solve the problems in Chapter 1',
                dueDate: '2023-10-01',
                status: 'completed',
                marks: 95,
            },
            {
                id: 2,
                title: 'Math Assignment 2',
                description: 'Solve the problems in Chapter 2',
                dueDate: '2023-10-15',
                status: 'pending',
            },
        ],
        attendance: [
            {
                date: '2023-09-01',
                status: 'present',
            },
            {
                date: '2023-09-02',
                status: 'absent',
            },
            {
                date: '2023-09-03',
                status: 'present',
            },
        ],
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'wey@gmail.com',
        phone: '123-456-7890',
        address: '123 Main St, City, Country',
        dateOfBirth: '2005-05-15',
        status: 'active',
        assignedClasses: ['Class 1'],
        assignedSubjects: ['Math'],
        profilePicture: 'https://via.placeholder.com/150',
        dateOfJoining: '2020-01-01',
        dateOfAssignment: '2020-01-01',
        dateOfCompletion: '2021-01-01',
        assignments: [
            {
                id: 1,
                title: 'Math Assignment 1',
                description: 'Solve the problems in Chapter 1',
                dueDate: '2023-10-01',
                status: 'completed',
                marks: 95,
            },
            {
                id: 2,
                title: 'Math Assignment 2',
                description: 'Solve the problems in Chapter 2',
                dueDate: '2023-10-15',
                status: 'pending',
            },
        ],

        attendance: [
            {
                date: '2023-09-01',
                status: 'present',
            },
            {
                date: '2023-09-02',
                status: 'absent',
            },
            {
                date: '2023-09-03',
                status: 'present',
            },
        ],
    },
]