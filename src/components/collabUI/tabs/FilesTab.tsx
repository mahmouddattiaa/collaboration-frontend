import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface FileItem {
  id: string;
  name: string;
  size?: number;
  type?: string;
  uploadedBy?: string;
  uploadedAt?: string | Date;
  url?: string;
}

interface FilesTabProps {
  files: FileItem[];
  onUploadFile: (file: File) => void;
}

export function FilesTab({ files, onUploadFile }: FilesTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Files</h2>
        <Button onClick={() => fileInputRef.current?.click()}>Upload File</Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {files.length === 0 && <div className="text-white/60">No files uploaded yet.</div>}
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.id} className="bg-dark/30 border border-white/10 rounded-lg p-3 flex items-center justify-between">
            <span className="text-white/80">{file.name}</span>
            {file.size && <span className="text-xs text-white/40">{(file.size / 1024).toFixed(1)} KB</span>}
          </li>
        ))}
      </ul>
    </div>
  );
} 