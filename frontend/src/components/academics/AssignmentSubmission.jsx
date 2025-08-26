import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';

export function AssignmentSubmission({ assignment, onSubmit }) {
  const [files, setFiles] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('comment', comment);
      formData.append('assignmentId', assignment.id);
      
      await onSubmit(formData);
      
      // Clear form after successful submission
      setFiles([]);
      setComment('');
    } catch (error) {
      console.error('Error submitting assignment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-white">
      <CardHeader>
        <CardTitle>Submit Assignment: {assignment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="files">Upload Files</Label>
            <div className="flex items-center gap-2">
              <Input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label 
                htmlFor="files"
                className="flex items-center gap-2 px-4 py-2 border border-orange-200 rounded-md cursor-pointer hover:bg-orange-50"
              >
                <Upload className="h-4 w-4" />
                Choose Files
              </label>
              {files.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {files.length} file(s) selected
                </span>
              )}
            </div>
            {files.length > 0 && (
              <ul className="text-sm space-y-1 mt-2">
                {files.map((file, index) => (
                  <li key={index} className="text-muted-foreground">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Optional)</Label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder="Add any comments about your submission..."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={submitting || files.length === 0}>
              {submitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
