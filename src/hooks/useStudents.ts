// import { useEffect, useState } from 'react';
// import { Student } from '../types/student';
// import { fetchStudents } from '../lib/api';

// const useStudents = (teacherId: string) => {
//     const [students, setStudents] = useState<Student[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const getStudents = async () => {
//             try {
//                 setLoading(true);
//                 const data = await fetchStudents(teacherId);
//                 setStudents(data);
//             } catch (err) {
//                 setError('Failed to fetch students');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getStudents();
//     }, [teacherId]);

//     return { students, loading, error };
// };

// export default useStudents;