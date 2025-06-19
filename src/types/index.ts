export type FileType = 'pdf' | 'doc' | 'docx' | 'txt' | 'xls' | 'xlsx';
export type ConversionTarget = 'doc' | 'txt' | 'pdf';

export interface ConversionOption {
  id: string; // e.g., "pdf-to-doc"
  label: string; // e.g., "PDF to DOC"
  sourceType: FileType[]; // e.g., ["pdf"]
  targetType: ConversionTarget;
  allowedMimeTypes: string[]; // e.g., ["application/pdf"]
  targetMimeType: string;
  targetExtension: string;
}

export const conversionOptions: ConversionOption[] = [
  {
    id: 'pdf-to-doc',
    label: 'PDF to DOC',
    sourceType: ['pdf'],
    targetType: 'doc',
    allowedMimeTypes: ['application/pdf'],
    targetMimeType: 'application/msword',
    targetExtension: '.doc',
  },
  {
    id: 'pdf-to-txt',
    label: 'PDF to TXT',
    sourceType: ['pdf'],
    targetType: 'txt',
    allowedMimeTypes: ['application/pdf'],
    targetMimeType: 'text/plain',
    targetExtension: '.txt',
  },
  {
    id: 'doc-to-pdf',
    label: 'DOC to PDF',
    sourceType: ['doc', 'docx'],
    targetType: 'pdf',
    allowedMimeTypes: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    targetMimeType: 'application/pdf',
    targetExtension: '.pdf',
  },
  {
    id: 'xls-to-pdf',
    label: 'XLS to PDF',
    sourceType: ['xls', 'xlsx'],
    targetType: 'pdf',
    allowedMimeTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    targetMimeType: 'application/pdf',
    targetExtension: '.pdf',
  },
];
