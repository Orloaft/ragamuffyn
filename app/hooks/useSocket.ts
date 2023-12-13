// useSocket.ts
import { useEffect } from "react";
import io from "socket.io-client";

export const useSocket = (url: string) => {
  useEffect(() => {
    const socket = io(url);

    socket.on("connect", () => {
      console.log("connected to socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);
};
