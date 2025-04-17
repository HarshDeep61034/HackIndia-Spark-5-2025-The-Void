
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Search, Filter, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  status: 'processed' | 'processing' | 'failed';
}

const MOCK_DOCUMENTS: Document[] = [
  { id: '1', title: 'Advanced Mathematics Textbook', type: 'PDF', date: '12 Apr 2025', size: '8.4 MB', status: 'processed' },
  { id: '2', title: 'Biology Lab Manual', type: 'PDF', date: '10 Apr 2025', size: '5.1 MB', status: 'processed' },
  { id: '3', title: 'Literary Criticism Essays', type: 'DOCX', date: '08 Apr 2025', size: '1.8 MB', status: 'processing' },
  { id: '4', title: 'Physics Problem Sets', type: 'PDF', date: '06 Apr 2025', size: '3.2 MB', status: 'processed' },
  { id: '5', title: 'History Timeline Notes', type: 'DOCX', date: '03 Apr 2025', size: '2.0 MB', status: 'failed' },
  { id: '6', title: 'Chemistry Lecture Notes', type: 'PDF', date: '01 Apr 2025', size: '4.3 MB', status: 'processed' },
  { id: '7', title: 'Art History Slides', type: 'PPTX', date: '29 Mar 2025', size: '6.7 MB', status: 'processed' },
  { id: '8', title: 'Computer Science Algorithms', type: 'PDF', date: '27 Mar 2025', size: '3.9 MB', status: 'processed' },
];

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const { toast } = useToast();

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadingFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadingFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload process
    toast({
      title: "Upload started",
      description: `Uploading ${uploadingFile.name}...`,
    });

    // Add to documents list with "processing" status
    const newDoc: Document = {
      id: (documents.length + 1).toString(),
      title: uploadingFile.name,
      type: uploadingFile.name.split('.').pop()?.toUpperCase() || 'Unknown',
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: `${(uploadingFile.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'processing',
    };

    setDocuments([newDoc, ...documents]);

    // Simulate processing delay
    setTimeout(() => {
      setDocuments(prevDocs => 
        prevDocs.map(doc => 
          doc.id === newDoc.id ? { ...doc, status: 'processed' } : doc
        )
      );
      
      toast({
        title: "Upload complete",
        description: `${uploadingFile.name} has been processed successfully`,
      });
      
      setUploadingFile(null);
      // Clear file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 3000);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from the knowledge base",
    });
  };

  return (
    <AdminLayout title="Knowledge Base">
      <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Knowledge Base Documents</CardTitle>
              <CardDescription>
                Manage your documents and see their processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        <BookOpen className="mx-auto h-8 w-8 mb-2" />
                        No documents found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                doc.status === 'processed' ? 'bg-green-500' : 
                                doc.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                            />
                            <span className="capitalize">{doc.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Upload Documents</CardTitle>
              <CardDescription>
                Add new documents to the knowledge base for student queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-10 text-center bg-muted/20">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium text-lg mb-2">Drag files here or click to browse</h3>
                <p className="text-muted-foreground mb-4">
                  Support for PDF, DOCX, TXT, and other text documents
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt,.pptx"
                  onChange={handleFileChange}
                />
                <Button onClick={() => document.getElementById('file-upload')?.click()}>
                  Select Files
                </Button>
              </div>
              
              {uploadingFile && (
                <div className="mt-6 p-4 border rounded-lg bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{uploadingFile.name}</div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {(uploadingFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Ready to upload
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setUploadingFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveTab('documents')}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!uploadingFile}>
                Upload to Knowledge Base
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Knowledge;
