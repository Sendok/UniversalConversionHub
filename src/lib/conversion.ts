import type { ConversionOption } from '@/types';

// Mock conversion function
export async function convertFile(
  file: File,
  conversionOption: ConversionOption,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    let progress = 0;
    onProgress(0);

    // Simulate file processing and progress updates
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        onProgress(progress);
      } else {
        clearInterval(interval);
        // Simulate a successful conversion with a placeholder blob URL
        const mockFileName = `converted_${file.name.substring(0, file.name.lastIndexOf('.'))}${conversionOption.targetExtension}`;
        const mockContent = `This is a mock converted file: ${mockFileName}\nOriginal file: ${file.name}\nConverted to: ${conversionOption.targetType}`;
        const blob = new Blob([mockContent], { type: conversionOption.targetMimeType });
        const url = URL.createObjectURL(blob);
        resolve(url);
      }
    }, 200); // Simulate 2 seconds conversion time

    // Simulate potential error (uncomment to test error handling)
    // setTimeout(() => {
    //   clearInterval(interval);
    //   reject(new Error("Mock conversion failed!"));
    // }, 1000);
  });
}

// Helper function to get file extension
export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
}
