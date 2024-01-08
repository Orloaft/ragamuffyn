import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// Define the shape of the data you expect to receive
interface BroadcastMessage {
  // ... your data structure here
}

function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<BroadcastMessage[]>([]);

  useEffect(() => {
    // Establish connection
    const newSocket = io(url);
    setSocket(newSocket);

    // Handle incoming messages
    newSocket.on("broadcast", (message: BroadcastMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  // Expose socket and messages to the component
  return { socket, messages };
}

export default useSocket;
