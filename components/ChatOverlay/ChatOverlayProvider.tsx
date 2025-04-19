import React, { createContext, useContext, useState, ReactNode } from "react";

type ChatOverlayContextType = {
  isExpanded: boolean;
  visible: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [visible, setVisible] = useState(false);

  const showOverlay = () => {
    setVisible(true);
  };

  const hideOverlay = () => {
    setVisible(false);
    setIsExpanded(true);
  };

  const toggleSize = () => setIsExpanded((prev) => !prev);

  return (
    <ChatOverlayContext.Provider
      value={{
        isExpanded,
        visible,
        showOverlay,
        hideOverlay,
        toggleSize,
      }}
    >
      {children}
    </ChatOverlayContext.Provider>
  );
};

export default ChatOverlayProvider;
