import React, { ReactNode } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

interface MathContainerProps {
  children: ReactNode;
  className?: string;
}

export const MathContainer: React.FC<MathContainerProps> = ({ children, className }) => {
  return (
    <MathJaxContext>
      <MathJax className={className} style={{ display: 'initial !important' }}>
        {typeof children === 'string' ? `\\(${children}\\)` : children}
      </MathJax>
    </MathJaxContext>
  );
};
