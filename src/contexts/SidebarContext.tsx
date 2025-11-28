import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  hideLeftSidebar: boolean;
  hideRightSidebar: boolean;
  setHideLeftSidebar: (hide: boolean) => void;
  setHideRightSidebar: (hide: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [hideLeftSidebar, setHideLeftSidebar] = useState(false);
  const [hideRightSidebar, setHideRightSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        hideLeftSidebar,
        hideRightSidebar,
        setHideLeftSidebar,
        setHideRightSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    // Return default values if used outside provider
    return {
      hideLeftSidebar: false,
      hideRightSidebar: false,
      setHideLeftSidebar: () => {},
      setHideRightSidebar: () => {},
    };
  }
  return context;
}
