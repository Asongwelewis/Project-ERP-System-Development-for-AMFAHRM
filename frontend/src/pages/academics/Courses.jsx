import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Search, Book, Calendar, Bell, FileText } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Progress } from '../../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { STUDENT_COURSES } from './constants';

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredCourses = STUDENT_COURSES.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCourseDetails = (course) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-orange-700">My Courses</h1>
          <p className="text-muted-foreground">View your enrolled courses and progress</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full md:w-[300px]"
          />
        </div>

        {/* Upcoming Assignments Overview */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {STUDENT_COURSES.flatMap(course => 
                course.assignments
                  .filter(assignment => assignment.status === 'pending')
                  .map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <Badge variant="outline" className="text-orange-600">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border-orange-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{course.code}</CardTitle>
                    <CardDescription className="font-medium text-orange-700">
                      {course.name}
                    </CardDescription>
                  </div>
                  <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Course Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium">{course.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Class</p>
                    <p className="font-medium">
                      {formatDate(course.nextClass)}
                    </p>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => openCourseDetails(course)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedCourse?.code} - {selectedCourse?.name}</DialogTitle>
            </DialogHeader>
            
            {selectedCourse && (
              <Tabs defaultValue="materials" className="w-full">
                <TabsList>
                  <TabsTrigger value="materials">
                    <Book className="h-4 w-4 mr-2" />
                    Materials
                  </TabsTrigger>
                  <TabsTrigger value="assignments">
                    <FileText className="h-4 w-4 mr-2" />
                    Assignments
                  </TabsTrigger>
                  <TabsTrigger value="schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger value="announcements">
                    <Bell className="h-4 w-4 mr-2" />
                    Announcements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="materials" className="space-y-4">
                  {selectedCourse.materials.map((material) => (
                    <Card key={material.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  {selectedCourse.assignments.map((assignment) => (
                    <Card key={assignment.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Due {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={
                          assignment.status === 'pending' ? 'default' :
                          assignment.status === 'upcoming' ? 'secondary' : 'outline'
                        }>
                          {assignment.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="schedule">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Next Class</p>
                          <p className="text-muted-foreground">
                            {formatDate(selectedCourse.nextClass)}
                          </p>
                        </div>
                        {/* Add more schedule information here */}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="announcements" className="space-y-4">
                  {selectedCourse.announcements.map((announcement) => (
                    <Card key={announcement.id}>
                      <CardContent className="p-4">
                        <p className="font-medium">{announcement.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(announcement.date).toLocaleDateString()}
                        </p>
                        <p className="mt-2">{announcement.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
