import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { PlusCircle, Search, BookOpen, Users, Calendar, Archive } from 'lucide-react';
import { COURSE_STATS, COURSE_LIST, DEPARTMENTS, RECENT_ACTIVITIES } from './constants';
import { CourseForm } from '../../components/academics/CourseForm';

export function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courses, setCourses] = useState(COURSE_LIST);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isViewingCourse, setIsViewingCourse] = useState(false);
  const [viewingCourse, setViewingCourse] = useState(null);

  // Filter courses based on search and department
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      (course.title || course.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleCreateCourse = async (data) => {
    try {
      const newCourse = {
        id: Date.now(),
        status: 'upcoming',
        students: 0,
        ...data,
      };
      setCourses(prev => [newCourse, ...prev]);
      setIsAddingCourse(false);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleStartEdit = (course) => {
    setEditingCourse(course);
    setIsEditingCourse(true);
  };

  const handleUpdateCourse = async (data) => {
    try {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...data } : c));
      setIsEditingCourse(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const handleViewCourse = (course) => {
    setViewingCourse(course);
    setIsViewingCourse(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Course Management</h1>
            <p className="text-muted-foreground">
              Manage academic courses, enrollments, and schedules
            </p>
          </div>
          <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <CourseForm 
                onSubmit={handleCreateCourse}
                submitLabel="Create Course"
              />
            </DialogContent>
          </Dialog>

          {/* Edit Course Dialog */}
          <Dialog open={isEditingCourse} onOpenChange={setIsEditingCourse}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Course</DialogTitle>
              </DialogHeader>
              {editingCourse && (
                <CourseForm 
                  initialData={editingCourse}
                  onSubmit={handleUpdateCourse}
                  submitLabel="Update Course"
                />
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-orange-200 bg-white dark:bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-orange-500 mr-2" />
                <div className="text-2xl font-bold text-orange-600">{COURSE_STATS.totalCourses}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-white dark:bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                <div className="text-2xl font-bold text-blue-600">{COURSE_STATS.activeCourses}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-white dark:bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                <div className="text-2xl font-bold text-orange-600">{COURSE_STATS.upcomingCourses}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-white dark:bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Archived Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Archive className="h-4 w-4 text-blue-500 mr-2" />
                <div className="text-2xl font-bold text-blue-600">{COURSE_STATS.archivedCourses}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course List */}
        <Card className="border-blue-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>View and manage all courses</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title || course.name}</TableCell>
                    <TableCell>{course.credits ?? 6}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge variant={
                        course.status === 'active' ? 'default' :
                        course.status === 'upcoming' ? 'secondary' : 'outline'
                      }>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewCourse(course)}>View</Button>
                        <Button variant="outline" size="sm" onClick={() => handleStartEdit(course)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-orange-200 bg-white dark:bg-white">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'course_created' ? 'bg-green-500' :
                    activity.type === 'enrollment' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Course Dialog */}
        <Dialog open={isViewingCourse} onOpenChange={setIsViewingCourse}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Course Details</DialogTitle>
            </DialogHeader>
            {viewingCourse && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Course Code</p>
                    <p className="font-medium">{viewingCourse.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credits</p>
                    <p className="font-medium">{viewingCourse.credits ?? 6}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Course Title</p>
                    <p className="font-medium">{viewingCourse.title || viewingCourse.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{viewingCourse.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                    <p className="font-medium">{viewingCourse.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{viewingCourse.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{viewingCourse.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-medium">{viewingCourse.students}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{viewingCourse.status}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
