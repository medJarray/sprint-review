import React, { ReactNode } from 'react';
import Header from './Header';
import { useSprint } from '../../context/SprintContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useSprint();
  const { styles } = state;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: styles.fontFamily,
        fontSize: `${styles.fontSize}px`,
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
      }}
    >
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">{children}</main>
      <footer
        className="text-center py-4 text-sm opacity-60"
        style={{ fontFamily: styles.fontFamily }}
      >
        Sprint Review Dashboard — Scrum Agile
      </footer>
    </div>
  );
};

export default Layout;
