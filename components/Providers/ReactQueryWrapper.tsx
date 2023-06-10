import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '~/lib/react-query/react-query';

type QueryProps = {
    children?: ReactNode;
};

export const QueryWrapper = ({ children }: QueryProps) => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
    </QueryClientProvider>
);
