'use client';

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomThemeConfig } from 'tailwindcss/types/config';
import tailwindCSS from '../../tailwind.config';

const queryClient = new QueryClient();

// TODO: вынести в lib?
const tailwindColors = (tailwindCSS.theme?.extend?.colors ?? {}) as CustomThemeConfig;
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tailwindColors.primary[500],
      light: tailwindColors.primary[600],
    },
    secondary: { main: tailwindColors.primary[100] },
    info: tailwindColors.primary,
    text: { primary: tailwindColors.dark[600] },
  },
});

export function Providers({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

