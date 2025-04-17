
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, FileText, Users, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Student Queries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>1.2% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Recently added documents to the knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Quantum Physics Lecture Notes", type: "PDF", date: "12 Apr 2025", size: "2.4 MB" },
                { title: "Organic Chemistry Handbook", type: "PDF", date: "10 Apr 2025", size: "5.1 MB" },
                { title: "World History Timeline", type: "DOCX", date: "08 Apr 2025", size: "1.8 MB" },
                { title: "Calculus Problem Set", type: "PDF", date: "06 Apr 2025", size: "3.2 MB" },
                { title: "Literary Analysis Guide", type: "DOCX", date: "03 Apr 2025", size: "2.0 MB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-muted-foreground">{doc.date}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">{doc.size}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{doc.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Student Queries</CardTitle>
            <CardDescription>Most frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { query: "How do I solve quadratic equations?", count: 24 },
                { query: "What are the causes of World War II?", count: 18 },
                { query: "Explain DNA replication", count: 15 },
                { query: "What is the meaning of Hamlet's soliloquy?", count: 12 },
                { query: "How does photosynthesis work?", count: 10 },
              ].map((query, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="font-medium">{query.query}</div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{query.count} queries</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
