import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useSidebar } from '../contexts/SidebarContext';

export default function SidebarToggle(): JSX.Element | null {
  const { hideLeftSidebar, hideRightSidebar, setHideLeftSidebar, setHideRightSidebar } = useSidebar();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    // Apply sidebar hiding and expand content
    const docContainer = document.querySelector('.main-wrapper') as HTMLElement;
    const leftSidebar = document.querySelector('aside.theme-doc-sidebar-container') as HTMLElement;
    const rightSidebar = document.querySelector('.theme-doc-toc-desktop') as HTMLElement;
    const docItemWrapper = document.querySelector('.theme-doc-markdown') as HTMLElement;
    const docItemContainer = document.querySelector('article') as HTMLElement;

    if (hideLeftSidebar && leftSidebar) {
      leftSidebar.style.display = 'none';
      if (docContainer) {
        docContainer.style.setProperty('--doc-sidebar-width', '0px');
      }
    } else if (leftSidebar) {
      leftSidebar.style.display = '';
      if (docContainer) {
        docContainer.style.removeProperty('--doc-sidebar-width');
      }
    }

    if (hideRightSidebar && rightSidebar) {
      rightSidebar.style.display = 'none';
    } else if (rightSidebar) {
      rightSidebar.style.display = '';
    }

    // Expand content area when sidebars are hidden
    if (docItemWrapper) {
      if (hideLeftSidebar || hideRightSidebar) {
        docItemWrapper.style.maxWidth = '100%';
        docItemWrapper.style.width = '100%';
      } else {
        docItemWrapper.style.maxWidth = '';
        docItemWrapper.style.width = '';
      }
    }

    if (docItemContainer) {
      if (hideLeftSidebar || hideRightSidebar) {
        docItemContainer.style.maxWidth = '100%';
        docItemContainer.style.width = '100%';
      } else {
        docItemContainer.style.maxWidth = '';
        docItemContainer.style.width = '';
      }
    }

    // Also expand the main wrapper
    if (docContainer && (hideLeftSidebar || hideRightSidebar)) {
      docContainer.style.setProperty('--ifm-container-width-xl', '100%');
    } else if (docContainer) {
      docContainer.style.removeProperty('--ifm-container-width-xl');
    }
  }, [hideLeftSidebar, hideRightSidebar]);

  if (!ExecutionEnvironment.canUseDOM) return null;

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      {/* Left Sidebar Toggle */}
      <button
        onClick={() => setHideLeftSidebar(!hideLeftSidebar)}
        style={{
          position: 'fixed',
          top: '100px',
          left: hideLeftSidebar ? '10px' : '310px',
          padding: '8px 12px',
          backgroundColor: 'var(--ifm-color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '0 6px 6px 0',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        title={hideLeftSidebar ? 'Show left sidebar' : 'Hide left sidebar'}
        aria-label={hideLeftSidebar ? 'Show left sidebar' : 'Hide left sidebar'}
      >
        <span>{hideLeftSidebar ? '☰' : '←'}</span>
      </button>

      {/* Right Sidebar Toggle */}
      <button
        onClick={() => setHideRightSidebar(!hideRightSidebar)}
        style={{
          position: 'fixed',
          top: '100px',
          right: hideRightSidebar ? '10px' : '310px',
          padding: '8px 12px',
          backgroundColor: 'var(--ifm-color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '6px 0 0 6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '-2px 2px 8px rgba(0,0,0,0.3)',
          transition: 'right 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        title={hideRightSidebar ? 'Show right sidebar' : 'Hide right sidebar'}
        aria-label={hideRightSidebar ? 'Show right sidebar' : 'Hide right sidebar'}
      >
        <span>{hideRightSidebar ? '☰' : '→'}</span>
      </button>
    </div>
  );
}
