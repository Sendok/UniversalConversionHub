import type { ConversionOption } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Repeat } from 'lucide-react';

interface AppHeaderProps {
  conversionOptions: ConversionOption[];
  onConversionTypeChange: (option: ConversionOption) => void;
  currentConversionTypeLabel?: string;
}

export function AppHeader({ conversionOptions, onConversionTypeChange, currentConversionTypeLabel }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <Repeat className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">Universal Conversion Hub</h1>
        </div>
        <nav className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {currentConversionTypeLabel || "Select Conversion"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              {conversionOptions.map((option) => (
                <DropdownMenuItem key={option.id} onClick={() => onConversionTypeChange(option)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
