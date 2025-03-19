// import { useEffect, useState } from 'react';
// import { Teacher } from '../types/teacher';
// import { featchTeachers } from '@/lib/api';

// const useTeachers = () => {
//     const [teachers, setTeachers] = useState<Teacher[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const getTeachers = async () => {
//             try {
//                 const data = await fetchTeachers();
//                 setTeachers(data);
//             } catch (err) {
//                 setError('Failed to fetch teachers');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getTeachers();
//     }, []);

//     return { teachers, loading, error };
// };

// export default useTeachers;