import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DEPARTMENTS } from '../../pages/academics/constants';

export function CourseForm({ onSubmit, isLoading = false, initialData = null, submitLabel }) {
  const [formData, setFormData] = React.useState({
    code: '',
    title: '',
    department: '',
    instructor: '',
    maxStudents: '',
    startDate: '',
    endDate: '',
    description: '',
    credits: 6,
  });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        title: initialData.title || initialData.name || '',
        department: initialData.department || '',
        instructor: initialData.instructor || '',
        maxStudents: initialData.maxStudents || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        description: initialData.description || '',
        credits: initialData.credits || 6,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (data) => {
    const errs = {};
    // Code: 2-4 uppercase letters + 3 digits (e.g., CS201)
    const codeRegex = /^[A-Z]{2,4}\d{3}$/;
    if (!data.code || !codeRegex.test(data.code.trim())) {
      errs.code = 'Use format like CS201 (2-4 uppercase letters followed by 3 digits).';
    }
    if (!data.title || !data.title.trim()) {
      errs.title = 'Course title is required.';
    }
    if (!data.department) {
      errs.department = 'Department is required.';
    }
    const max = Number(data.maxStudents);
    if (!Number.isInteger(max) || max <= 0) {
      errs.maxStudents = 'Enter a positive integer.';
    }
    if (!data.startDate) {
      errs.startDate = 'Start date is required.';
    }
    if (!data.endDate) {
      errs.endDate = 'End date is required.';
    }
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (end < start) {
        errs.endDate = 'End date must be on or after start date.';
      }
    }
    return errs;
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
          {errors.code && (<p className="text-sm text-red-600">{errors.code}</p>)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., Data Structures and Algorithms"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && (<p className="text-sm text-red-600">{errors.title}</p>)}
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
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (<p className="text-sm text-red-600">{errors.department}</p>)}
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
          {errors.maxStudents && (<p className="text-sm text-red-600">{errors.maxStudents}</p>)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="credits">Credits</Label>
          <Input
            id="credits"
            name="credits"
            type="number"
            value={formData.credits}
            readOnly
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
          {errors.startDate && (<p className="text-sm text-red-600">{errors.startDate}</p>)}
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
          {errors.endDate && (<p className="text-sm text-red-600">{errors.endDate}</p>)}
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
          {isLoading
            ? (initialData ? 'Updating...' : 'Creating...')
            : (submitLabel || (initialData ? 'Update Course' : 'Create Course'))}
        </Button>
      </div>
    </form>
  );
}
