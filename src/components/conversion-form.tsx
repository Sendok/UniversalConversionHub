
"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { ConversionOption, FileType } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { convertFile, getFileExtension } from '@/lib/conversion';
import { FileIcon } from './file-icon';
import { AdsenseBlock } from './adsense-block';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UploadCloud, XCircle, DownloadCloud, Loader2, CheckCircle2, Repeat } from 'lucide-react';

interface ConversionFormProps {
  conversionOption: ConversionOption | null;
}

export function ConversionForm({ conversionOption }: ConversionFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [convertedFileName, setConvertedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    // Reset state when conversion option changes
    setSelectedFile(null);
    setIsConverting(false);
    setConversionProgress(0);
    setConvertedFileUrl(null);
    setConvertedFileName(null);
    setError(null);
    setShowAd(false);
  }, [conversionOption]);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!conversionOption) {
      toast({ title: "Error", description: "Please select a conversion type first.", variant: "destructive" });
      return;
    }
    if (files && files[0]) {
      const file = files[0];
      const fileExt = getFileExtension(file.name) as FileType;
      if (!conversionOption.sourceType.includes(fileExt) && !conversionOption.allowedMimeTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `Please upload a ${conversionOption.sourceType.join(' or ')} file for ${conversionOption.label}.`,
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setConvertedFileUrl(null); // Reset previous conversion
      setConvertedFileName(null);
      setError(null);
      setShowAd(false);
    }
  }, [conversionOption, toast]);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(isOver);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleConvert = async () => {
    if (!selectedFile || !conversionOption) return;

    setIsConverting(true);
    setConversionProgress(0);
    setError(null);
    setConvertedFileUrl(null);
    setConvertedFileName(null);
    setShowAd(false);

    try {
      const url = await convertFile(selectedFile, conversionOption, setConversionProgress);
      setConvertedFileUrl(url);
      setConvertedFileName(`converted_${selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'))}${conversionOption.targetExtension}`);
      setShowAd(true); // Show ad after successful conversion
      toast({
        title: "Conversion Successful!",
        description: `${selectedFile.name} converted to ${conversionOption.targetType}.`,
        action: <CheckCircle2 className="text-green-500" />,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({ title: "Conversion Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsConverting(false);
    }
  };
  
  const clearFile = () => {
    setSelectedFile(null);
    setConvertedFileUrl(null);
    setConvertedFileName(null);
    setError(null);
    setConversionProgress(0);
    setShowAd(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  }

  if (!conversionOption) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-10rem)]">
        <Repeat className="w-16 h-16 mb-4 text-primary/50" />
        <h2 className="text-2xl font-semibold mb-2 text-foreground/80">Welcome to Universal Conversion Hub</h2>
        <p className="text-muted-foreground">Please select a conversion type from the menu above to get started.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">
            {conversionOption.label}
          </CardTitle>
          <CardDescription>
            Convert your {conversionOption.sourceType.join(' / ')} files to {conversionOption.targetType.toUpperCase()} format quickly and easily.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={cn(`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out
              ${dragOver ? 'border-primary bg-primary/10 scale-105' : 'border-border hover:border-primary/70'}
              ${selectedFile ? 'border-green-500 bg-green-500/5' : ''}`)}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(e) => handleDragEvents(e, true)}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="File upload area"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              accept={conversionOption.allowedMimeTypes.join(',')}
            />
            {!selectedFile ? (
              <>
                <UploadCloud className="mx-auto h-16 w-16 text-primary/70 mb-4 transition-transform group-hover:scale-110" />
                <p className="font-semibold text-lg text-foreground">Drag & drop your file here</p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
                <p className="text-xs text-muted-foreground mt-2">Supports: .{conversionOption.sourceType.join(', .')}</p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FileIcon type={getFileExtension(selectedFile.name)} className="h-16 w-16 mb-3" />
                <p className="font-medium text-foreground truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); clearFile(); }} className="mt-3 text-destructive hover:text-destructive-foreground hover:bg-destructive/90">
                  <XCircle className="mr-2 h-4 w-4" /> Clear file
                </Button>
              </div>
            )}
          </div>

          {selectedFile && !isConverting && !convertedFileUrl && (
            <Button
              onClick={handleConvert}
              disabled={isConverting || !selectedFile}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              aria-label={`Convert ${selectedFile.name} to ${conversionOption.targetType}`}
            >
              <Repeat className="mr-2 h-5 w-5" /> Convert to {conversionOption.targetType.toUpperCase()}
            </Button>
          )}

          {isConverting && (
            <div className="space-y-3 text-center">
              <div className="flex justify-center items-center">
                 <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                 <p className="text-lg font-medium text-primary">Converting, please wait...</p>
              </div>
              <Progress value={conversionProgress} className="w-full h-3 bg-primary/20" indicatorClassName="bg-primary" />
              <p className="text-sm text-muted-foreground">{conversionProgress}% complete</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="shadow-md">
              <XCircle className="h-5 w-5" />
              <AlertTitle>Conversion Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {convertedFileUrl && convertedFileName && (
            <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg shadow-lg text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h3 className="text-2xl font-semibold text-green-700">Conversion Complete!</h3>
              <p className="text-muted-foreground">Your file <span className="font-medium text-foreground">{convertedFileName}</span> is ready for download.</p>
              <Button
                asChild
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                <a href={convertedFileUrl} download={convertedFileName} aria-label={`Download ${convertedFileName}`}>
                  <DownloadCloud className="mr-2 h-5 w-5" /> Download File
                </a>
              </Button>
            </div>
          )}
          
          {showAd && <AdsenseBlock className="mt-8" />}

        </CardContent>
      </Card>
    </div>
  );
}
