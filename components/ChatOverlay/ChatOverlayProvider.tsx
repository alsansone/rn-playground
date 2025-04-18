import React, { createContext, useContext, useState, ReactNode } from "react";

type ChatOverlayContextType = {
  isExpanded: boolean;
  expand: () => void;
  minimize: () => void;
  toggle: () => void;
};

const ChatOverlayContext = createContext<ChatOverlayContextType | undefined>(
  undefined
);

export const useChatOverlay = (): ChatOverlayContextType => {
  const context = useContext(ChatOverlayContext);
  if (!context) {
    throw new Error("useChatOverlay must be used within a ChatOverlayProvider");
  }
  return context;
};

type ChatOverlayProviderProps = {
  children: ReactNode;
};

const ChatOverlayProvider: React.FC<ChatOverlayProviderProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => setIsExpanded(true);
  const minimize = () => setIsExpanded(false);
  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <ChatOverlayContext.Provider
      value={{ isExpanded, expand, minimize, toggle }}
    >
      {children}
    </ChatOverlayContext.Provider>
  );
};

export default ChatOverlayProvider;
