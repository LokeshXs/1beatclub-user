"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { WS_SERVER_URL } from "@/lib/config";
import { signOut, useSession } from "next-auth/react";
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
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);
  const pathname = usePathname();
  const session = useSession();
  const selectedMusicClub = useMusicClub();

  const userId = session.data?.user.id || "";
  const selectedMusicClubId = selectedMusicClub.selectedClub?.id || "";

  const connectWebSocket = useCallback(() => {
    if (pathname === "/dashboard" && userId) {
      if (wsClientRef.current) {
        wsClientRef.current.close();
        wsClientRef.current = null;
      }

      const ws = new WebSocket(`${WS_SERVER_URL}?userid=${userId}`);

      ws.onopen = () => {
        wsClientRef.current = ws;
        setWsClient(ws);
        console.log("WebSocket connected ✅");
      };

      ws.onmessage = (event) => {
        // handle messages if needed
        // console.log("Message:", event.data);
      };

      ws.onclose = () => {
        console.log("WebSocket closed ❌");
        wsClientRef.current = null;
        setWsClient(null);
        // Attempt reconnect after delay
        if (pathname === "/dashboard") {
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000); // try again in 3 seconds
        }
      };

      ws.onerror = () => {
        ws.close();
        toast.error("WebSocket error, will retry.");
      };
    }
  }, [pathname, userId]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsClientRef.current = null;
      setWsClient(null);
    };
  }, [pathname, userId, connectWebSocket]);

  // Send club-change when club changes
  useEffect(() => {
    if (wsClientRef.current?.readyState === WebSocket.OPEN) {
      wsClientRef.current.send(
        JSON.stringify({
          type: "club-change",
          clubId: selectedMusicClubId,
          userId: userId,
        })
      );
    }
  }, [selectedMusicClubId, userId]);

  // Ping every 10s to keep alive
  useEffect(() => {
    const interval = setInterval(() => {
      if (wsClientRef.current?.readyState === WebSocket.OPEN) {
        wsClientRef.current.send(JSON.stringify({ type: "ping" }));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WebSocketClientContext.Provider value={{ wsClient }}>
      {children}
    </WebSocketClientContext.Provider>
  );
}
