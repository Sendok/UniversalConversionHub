import Image from 'next/image';

interface AdsenseBlockProps {
  width?: number;
  height?: number;
  className?: string;
  hint?: string;
}

export function AdsenseBlock({ width = 728, height = 90, className, hint = "advertisement technology" }: AdsenseBlockProps) {
  return (
    <div className={className ? className : "my-4 flex justify-center items-center w-full"}>
      <div 
        className="bg-muted/50 border border-dashed border-muted-foreground/50 rounded-lg p-4 flex flex-col items-center justify-center text-muted-foreground"
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
        aria-label="Advertisement placeholder"
      >
        <Image 
          src={`https://placehold.co/${width}x${height}.png`}
          alt="Ad Placeholder"
          width={width}
          height={height}
          className="max-w-full h-auto rounded"
          data-ai-hint={hint}
        />
        <span className="text-xs mt-2">Ad Placeholder</span>
      </div>
    </div>
  );
}
