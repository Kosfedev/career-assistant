'use client';

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import tailwindCSS from '../../tailwind.config';

const queryClient = new QueryClient();

// TODO: вынести в lib?
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tailwindCSS.theme.extend.colors.primary[500],
      light: tailwindCSS.theme.extend.colors.primary[600],
    },
    secondary: { main: tailwindCSS.theme.extend.colors.primary[100] },
    info: tailwindCSS.theme.extend.colors.primary,
    text: { primary: tailwindCSS.theme.extend.colors.dark[600] },
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

