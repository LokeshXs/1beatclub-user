"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();

  const [queryClient] = useState(client);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
