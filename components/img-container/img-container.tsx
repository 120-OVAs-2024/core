import React, { createElement, ReactNode } from 'react';

import css from './img-container.module.css';

interface Props {
  children?: ReactNode | ReactNode[];
  addClass?: string;
  height?: string;
  width?: string;
  background?: string;
  backgroundSize?: string;
  element?: string;
  padding?: string;
  zIndex?: string;
  [key: string]: unknown;
}

export const ImgContainer: React.FC<Props> = ({
  children,
  addClass,
  height,
  width,
  padding,
  background,
  backgroundSize,
  element,
  zIndex,
  ...props
}) => {
  const component = element || 'div';

  const valitationProperties = () => {
    const customProperties: { [key: string]: string } = {};

    if (height) customProperties['--height'] = height;
    if (width) customProperties['--width'] = width;
    if (padding) customProperties['--border-size'] = padding;
    if (zIndex) customProperties['z-index'] = zIndex;
    if (background) customProperties['--img-background'] = `url(${background})`;
    if (backgroundSize) customProperties.borderImageWidth = backgroundSize;

    return customProperties;
  };

  return createElement(
    component,
    {
      className: `${css['c-image-container']} ${addClass ?? ''}`,
      ...(!!Object.keys(valitationProperties()).length && {
        style: { ...valitationProperties() }
      }),
      ...props
    },
    children
  );
};
