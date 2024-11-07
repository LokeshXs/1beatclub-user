"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { WS_SERVER_URL } from "@/lib/config";

type ContextType = {
  wsClient: WebSocket | undefined;
};

export const WebSocketClientContext = createContext<ContextType>({
  wsClient: undefined,
});

export default function WebSocketClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wsClient, setWsClient] = useState<WebSocket | undefined>();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      const ws = new WebSocket(WS_SERVER_URL);
      ws.onopen = () => {
        toast.success("WebSocket Connection is successfull");
        setWsClient(ws);
      };

      ws.onerror = () => {
        toast.error("WebSocket Connection is Failed");
      };
    }
  }, [pathname]);

  return (
    <WebSocketClientContext.Provider value={{ wsClient }}>
      {children}
    </WebSocketClientContext.Provider>
  );
}
