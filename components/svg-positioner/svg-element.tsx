
import React, { useState, useLayoutEffect, useContext } from 'react';

import { SvgPositionerContext } from './svg-positioner';

import css from './svg-positioner.module.css';

interface SvgDimensions {
  height: number;
  width: number;
}

interface SvgPositionerContextType {
  dimensions: SvgDimensions;
}

interface Props {
  top: number;
  left: number;
  width: number;
  height: number;
  addClass?: string;
  type?: keyof JSX.IntrinsicElements;
  children: React.ReactNode; // Changed to support a wider variety of children types
}

export const SvgElement: React.FC<Props> = ({
  top,
  left,
  width,
  height,
  addClass = '', // Providing a default value for addClass
  type = 'div', // Providing a default value for type
  children,
  ...props
}) => {
  // Use the context to get SVG dimensions
  const { dimensions: svgDimensions } = useContext<SvgPositionerContextType>(SvgPositionerContext);

  // Initialize local state for element dimensions
  const [dimensions, setDimensions] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0
  });

  // Update dimensions when SVG dimensions or props change
  useLayoutEffect(() => {
    if (!svgDimensions.height && !svgDimensions.width) {
      return;
    }

    const nextDimensions = {
      top: (top / svgDimensions.height) * 100,
      left: (left / svgDimensions.width) * 100,
      width: (width / svgDimensions.width) * 100,
      height: (height / svgDimensions.height) * 100
    };
    setDimensions(nextDimensions);
  }, [svgDimensions, top, left, width, height]);

  // Ensure required props are provided
  if (!top || !left || !width || !height) {
    return (
      <p>
        Elemento no disponible. Agregar las propiedades{' '}
        <code>
          <b>top</b>
        </code>
        ,{' '}
        <code>
          <b>left</b>
        </code>
        ,{' '}
        <code>
          <b>width</b>
        </code>{' '}
        y{' '}
        <code>
          <b>height</b>
        </code>{' '}
        en el componente{' '}
        <code>
          <b>SvgElement</b>
        </code>
      </p>
    );
  }

  // Define the type of HTML element to render
  const ElementType = type as keyof JSX.IntrinsicElements;

  // Render the element with calculated dimensions and additional props
  return (
    <ElementType
      className={`${css.element} ${addClass}`}
      style={{
        '--svg-element-x-position': `${dimensions.left}%`,
        '--svg-element-y-position': `${dimensions.top}%`,
        '--svg-element-width': `${dimensions.width}%`,
        '--svg-element-height': `${dimensions.height}%`
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </ElementType>
  );
};