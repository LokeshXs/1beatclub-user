"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { WS_SERVER_URL } from "@/lib/config";
import { useSession } from "next-auth/react";
import { useMusicClub } from "@/store/musicClubStore";

type ContextType = {
  wsClient: WebSocket | null;
};

export const WebSocketClientContext = createContext<ContextType>({
  wsClient: null,
});

export default function WebSocketClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wsClientRef = useRef<WebSocket | null>(null);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);
  const pathname = usePathname();
  const session = useSession();
  const selectedMusicClub = useMusicClub();

  const userId = session.data?.user.id || "";
  const selectedMusicClubId = selectedMusicClub.selectedClub?.id || "";

  const wsConnection = useCallback(() => {
    if (pathname === "/dashboard" && userId) {
      if (wsClientRef.current) {
        wsClientRef.current.close();
        wsClientRef.current = null;
      }

      const ws = new WebSocket(
        `${WS_SERVER_URL}?userid=${userId}&clubid=${selectedMusicClubId}`
      );

      ws.onopen = () => {
        toast.success("WebSocket Connection is successfull");
        wsClientRef.current = ws;
        setWsClient(ws);
      };

      ws.onclose = () => {
        toast.info("Websocket connection is closed");
        if (wsClientRef.current === ws) {
          wsClientRef.current = null;
          setWsClient(null);
        }
      };

      ws.onerror = () => {
        toast.error("WebSocket Connection is Failed");
      };
    }
  }, [pathname, selectedMusicClubId, userId]);

  useEffect(() => {
    wsConnection();

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.close();
        wsClientRef.current = null;
      }
      setWsClient(null);
    };
  }, [pathname, userId, selectedMusicClubId, wsConnection]);

  useEffect(() => {
    const invterval = setInterval(() => {
      if (wsClientRef.current?.readyState === WebSocket.OPEN) {
        wsClientRef.current.send(JSON.stringify({ type: "ping" }));
      }
    }, 10000);

    return () => {
      clearInterval(invterval);
    };
  }, []);

  return (
    <WebSocketClientContext.Provider value={{ wsClient: wsClientRef.current }}>
      {children}
    </WebSocketClientContext.Provider>
  );
}
