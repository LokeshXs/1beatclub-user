"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { WS_SERVER_URL } from "@/lib/config";
import { useSession } from "next-auth/react";
import { useMusicClub } from "@/store/musicClubStore";

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
  const session = useSession();
  const selectedMusicClub = useMusicClub();

  const userId = session.data?.user.id || "";
  const selectedMusicClubId = selectedMusicClub.selectedClub?.id || "";

  const wsConnection = useCallback(() => {
    if (pathname === "/dashboard" && userId) {
      const ws = new WebSocket(
        `${WS_SERVER_URL}?userid=${userId}&clubid=${selectedMusicClubId}`
      );

      ws.onopen = () => {
        toast.success("WebSocket Connection is successfull");
        setWsClient(ws);
      };

      ws.onclose = () => {
        toast.info("Websocket connection is closed");
      };

      ws.onerror = () => {
        toast.error("WebSocket Connection is Failed");
      };
    }
  }, [pathname, selectedMusicClubId, userId]);

  useEffect(() => {
    wsConnection();
  }, [pathname, userId, selectedMusicClubId, wsConnection]);

  useEffect(() => {
    const invterval = setInterval(() => {
      if (wsClient?.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: "ping" }));
      }
    }, 10000);

    return () => {
      clearInterval(invterval);
    };
  }, [wsClient]);

  return (
    <WebSocketClientContext.Provider value={{ wsClient }}>
      {children}
    </WebSocketClientContext.Provider>
  );
}
