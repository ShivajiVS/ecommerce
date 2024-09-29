'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextThemesProvider enableSystem={true} attribute='class'>
            {children}
        </NextThemesProvider>
    );
};
