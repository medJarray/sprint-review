import React, { ReactNode } from 'react';
import { useSprint } from '../../context/SprintContext';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  const { state } = useSprint();
  const { styles } = state;

  return (
    <div
      className={`bg-white shadow-md p-6 ${className}`}
      style={{ borderRadius: `${styles.borderRadius}px` }}
    >
      {title && (
        <h3
          className="text-lg font-semibold mb-4"
          style={{
            fontFamily: styles.headingFontFamily,
            color: styles.primaryColor,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
