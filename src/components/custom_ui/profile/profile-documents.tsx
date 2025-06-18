'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, MoreHorizontal } from 'lucide-react';

const mockDocuments = [
  {
    id: '1',
    name: 'Resume_JennyferFranklin.pdf',
    size: '2.4 MB',
    type: 'PDF',
    uploadDate: '2024-01-15',
    category: 'Resume'
  },
  {
    id: '2',
    name: 'Portfolio_2024.pdf',
    size: '15.8 MB',
    type: 'PDF',
    uploadDate: '2024-01-10',
    category: 'Portfolio'
  },
  {
    id: '3',
    name: 'Certificates.zip',
    size: '8.2 MB',
    type: 'ZIP',
    uploadDate: '2024-01-05',
    category: 'Certificates'
  }
];

export function ProfileDocuments() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.size} • {doc.type} • {doc.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}