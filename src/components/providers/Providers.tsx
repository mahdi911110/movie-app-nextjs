'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClien = new QueryClient();

export default function Proivders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClien}>
      {children}
    </QueryClientProvider>
  );
}