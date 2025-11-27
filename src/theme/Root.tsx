import React from 'react';
import { SidebarProvider } from '../contexts/SidebarContext';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
