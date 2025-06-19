import { FileText, FileSpreadsheet, FileQuestion, type LucideProps } from 'lucide-react';
import type { FileType } from '@/types';

interface FileIconProps extends LucideProps {
  type?: FileType | string;
}

export function FileIcon({ type, className, ...props }: FileIconProps) {
  const defaultClassName = "h-10 w-10 text-primary";
  switch (type?.toLowerCase()) {
    case 'pdf':
      return <FileText className={cn(defaultClassName, "text-red-500", className)} {...props} />;
    case 'doc':
    case 'docx':
      return <FileText className={cn(defaultClassName, "text-blue-600", className)} {...props} />;
    case 'txt':
      return <FileText className={cn(defaultClassName, "text-gray-500", className)} {...props} />;
    case 'xls':
    case 'xlsx':
      return <FileSpreadsheet className={cn(defaultClassName, "text-green-600", className)} {...props} />;
    default:
      return <FileQuestion className={cn(defaultClassName, "text-gray-400", className)} {...props} />;
  }
}

// Helper to apply cn to defaultClassName and className
function cn(...inputs: any[]): string {
  // Simplified cn for this component, use the one from lib/utils in real scenarios
  return inputs.filter(Boolean).join(' ');
}
