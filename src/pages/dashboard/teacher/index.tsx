import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Calendar, LogOut, User, Users, Bell } from 'lucide-react';

// Mock data for students
const mockStudents = [
  { id: 1, name: 'Jane Cooper', email: 'jane.cooper@example.com', subject: 'Mathematics', progress: 75, lastActive: '2 hours ago', avatarUrl: '' },
  { id: 2, name: 'Alex Rodriguez', email: 'alex.r@example.com', subject: 'Physics', progress: 60, lastActive: '1 day ago', avatarUrl: '' },
  { id: 3, name: 'Michael Smith', email: 'michael.s@example.com', subject: 'Chemistry', progress: 90, lastActive: '3 hours ago', avatarUrl: '' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah.j@example.com', subject: 'Biology', progress: 45, lastActive: 'Just now', avatarUrl: '' },
];

const TeacherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Filter students based on search query
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your students and track their progress</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search students..." 
                className="pl-10 bg-white border-gray-300 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-gray-800 hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="bg-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-gray-800">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-gray-800">{mockStudents.length}</p>
                    <Users size={32} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-gray-800">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-gray-800">3</p>
                    <Calendar size={32} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-gray-800">Unread Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-gray-800">5</p>
                    <MessageSquare size={32} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Students */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800">Recent Students</CardTitle>
                <CardDescription>Your recently active students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.slice(0, 3).map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback className="bg-gray-300">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-600">Active {student.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge className="mr-3 bg-gray-200 text-gray-700 hover:bg-gray-300">{student.subject}</Badge>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                          <MessageSquare size={14} className="mr-1" /> Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">All Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                            <AvatarFallback className="bg-gray-300">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          <Badge className="w-fit bg-gray-200 text-gray-700 hover:bg-gray-300">{student.subject}</Badge>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gray-600 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                              <User size={14} className="mr-1" /> Profile
                            </Button>
                            <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                              <MessageSquare size={14} className="mr-1" /> Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No students found matching your search.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder Content for Other Tabs */}
          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your recent messages with students will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your upcoming mentoring sessions will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;