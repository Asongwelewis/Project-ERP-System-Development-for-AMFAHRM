import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DEPARTMENTS } from '../../pages/academics/constants';

export function CourseForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = React.useState({
    code: '',
    name: '',
    department: '',
    instructor: '',
    maxStudents: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Course Code</Label>
          <Input
            id="code"
            name="code"
            placeholder="e.g., CS101"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Course Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Introduction to Programming"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select 
            value={formData.department} 
            onValueChange={(value) => handleSelectChange(value, 'department')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            name="instructor"
            placeholder="e.g., Dr. Smith"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxStudents">Maximum Students</Label>
          <Input
            id="maxStudents"
            name="maxStudents"
            type="number"
            placeholder="e.g., 30"
            value={formData.maxStudents}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Course Description</Label>
        <textarea
          id="description"
          name="description"
          className="min-h-[100px] w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          placeholder="Enter course description..."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
}
