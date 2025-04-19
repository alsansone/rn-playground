import React, { createContext, useContext, useState, ReactNode } from "react";

type ChatOverlayContextType = {
  isExpanded: boolean;
  visible: boolean;
  toggleVisibility: () => void;
  toggleSize: () => void;
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
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const toggleSize = () => setIsExpanded((prev) => !prev);

  return (
    <ChatOverlayContext.Provider
      value={{ isExpanded, visible, toggleVisibility, toggleSize }}
    >
      {children}
    </ChatOverlayContext.Provider>
  );
};

export default ChatOverlayProvider;
