import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-5">
            <h2 className="text-lg font-bold mb-4">Mentor Application</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                </li>
                <li className="mb-2">
                    <Link to="/teachers" className="hover:text-gray-400">Teachers</Link>
                </li>
                <li className="mb-2">
                    <Link to="/students" className="hover:text-gray-400">Students</Link>
                </li>
                <li className="mb-2">
                    <Link to="/assignments" className="hover:text-gray-400">Assignments</Link>
                </li>
                <li className="mb-2">
                    <Link to="/courses" className="hover:text-gray-400">Courses</Link>
                </li>
                <li className="mb-2">
                    <Link to="/schedule" className="hover:text-gray-400">Schedule</Link>
                </li>
                <li className="mb-2">
                    <Link to="/messages" className="hover:text-gray-400">Messages</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;