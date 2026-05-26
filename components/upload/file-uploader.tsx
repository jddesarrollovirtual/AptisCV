'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export function FileUploader({ onFileSelect, selectedFile }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  if (selectedFile) {
    return (
      <div className="w-full border border-blue-500/50 bg-blue-950/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
            <p className="text-xs text-blue-200/60">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button onClick={() => onFileSelect(null)} className="p-1 hover:bg-white/10 rounded-full shrink-0">
          <X className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
        isDragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-700 hover:border-slate-500 bg-slate-950/50"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className={cn("w-12 h-12 mb-4 transition-colors", isDragActive ? "text-blue-500" : "text-slate-500")} />
      <p className="text-sm font-medium">Arrastra tu CV o haz clic aquí</p>
      <p className="text-xs text-slate-500 mt-2">Solo archivos PDF (máx. 10MB)</p>
    </div>
  );
}
