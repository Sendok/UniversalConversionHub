"use client";

import React, { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { ConversionForm } from '@/components/conversion-form';
import { conversionOptions as defaultConversionOptions, type ConversionOption } from '@/types';
import { Repeat } from 'lucide-react'; // Icon for page content when no type selected

export default function Home() {
  const [currentConversionOption, setCurrentConversionOption] = useState<ConversionOption | null>(null);

  const handleConversionTypeChange = (option: ConversionOption) => {
    setCurrentConversionOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader 
        conversionOptions={defaultConversionOptions} 
        onConversionTypeChange={handleConversionTypeChange}
        currentConversionTypeLabel={currentConversionOption?.label}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ConversionForm conversionOption={currentConversionOption} />
      </main>
      <AppFooter />
    </div>
  );
}
