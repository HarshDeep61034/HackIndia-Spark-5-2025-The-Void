import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Upload, Delete, CloudUpload } from '@mui/icons-material';

const AdminDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses] = useState([
    { id: 'course-1', name: 'Mathematics' },
    { id: 'course-2', name: 'Physics' },
    { id: 'course-3', name: 'Computer Science' },
  ]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents/list');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedCourse) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);
    formData.append('courseId', selectedCourse);

    setLoading(true);
    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      // Add new document to list with processing status
      setDocuments(prev => [...prev, {
        id: data.documentId,
        title: file.name,
        courseId: selectedCourse,
        status: 'processing',
        uploadDate: new Date(),
      }]);
      
      // Poll for document status
      pollDocumentStatus(data.documentId);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const pollDocumentStatus = async (documentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/documents/status/${documentId}`);
        const data = await response.json();
        
        if (data.status !== 'processing') {
          clearInterval(interval);
          fetchDocuments(); // Refresh document list
        }
      } catch (error) {
        console.error('Status polling error:', error);
        clearInterval(interval);
      }
    }, 5000);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/documents/delete?id=${id}`, {
        method: 'DELETE',
      });
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Document Management
        </Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Select Course"
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              disabled={!selectedCourse || loading}
            >
              Upload Document
              <input
                type="file"
                hidden
                accept=".pdf,.docx,.txt,.md"
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Upload Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>
                    {courses.find(c => c.id === doc.courseId)?.name || doc.courseId}
                  </TableCell>
                  <TableCell>
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {doc.status === 'processing' ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} />
                        Processing
                      </Box>
                    ) : (
                      doc.status
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
