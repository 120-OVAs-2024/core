import { ConfigA11y } from './types/types';

export const CONTRAST = Object.freeze({
  highContrast: 'high-contrast',
  grayScale: 'grayscale',
  invertColors: 'invert-colors',
  yellowOnBlack: 'yellow-on-black',
  whiteOnRed: 'red-on-white',
  greenOnBlue: 'green-on-blue',
  yellowOnBlue: 'yellow-on-blue',
  whiteOnBlack: 'white-on-black',
  noContrast: 'no-contrast'
});

export const INITIAL_STATE: ConfigA11y = {
  fontSize: '1',
  contrast: 'no-contrast',
  lineHeight: 'none',
  letterSpacing: 'none',
  darkMode: false,
  stopAnimations: false,
  audio: false
};

export const BASIC_VALUES = Object.freeze({
  '1': '1',
  '2': '2',
  '3': '3',
  none: 'none'
});

export const INVALID_VALUES = ['no-contrast', 'none', false];

// Constantes para las etiquetas de navegación en múltiples idiomas
export const i18n = {
  es: {
    title: 'Menú de accesibilidad',
    titleA11y: 'Menú de accesibilidad, puedes utilizar las teclas Ctrl + Alt + A para abrir y cerrar este menu.',
    btnModal: 'Cerrar modal',
    darkMode: 'Modo oscuro',
    stopAnimations: 'Detener animaciones',
    contrast: 'Ajuste del contraste',
    contrastTitle: 'Contraste personalizado',
    contrastMain: 'Ajusta el contraste del sitio.',
    grayScale: 'Escala de grises',
    highContrast: 'Alto contraste',
    invertColors: 'Invertir colores',
    yellowOnBlack: 'Amarillo con negro',
    whiteOnRed: 'Blanco con rojo',
    greenOnBlue: 'Verde con azul',
    yellowOnBlue: 'Amarillo con azul',
    whiteOnBlack: 'Blanco con negro',
    fontSize: 'Ajuste del tamaño de fuente',
    fontSizeTitle: 'Tamaño de fuente',
    fontSizeMain: 'Aumentar y disminuir el tamaño de la fuente.',
    fontSizeSmall: 'Tamaño de letra 1',
    fontSizeMid: 'Tamaño de letra 2',
    fontSizeBig: 'Tamaño de letra 3',
    lineHeight: 'Ajuste la altura de la línea',
    lineHeightTitle: 'Altura de la línea',
    lineHeightMain: 'Aumenta el tamaño de la línea.',
    lineHeightSmall: 'Altura x1.5',
    lineHeightMid: 'Altura x1.75',
    lineHeightBig: 'Altura x2',
    letterSpacing: 'Ajuste el espaciado de texto',
    letterSpacingTitle: 'Espaciado de texto',
    letterSpacingMain: 'Aumenta el espaciado de texto.',
    letterSpacingSmall: 'Espaciado ligero',
    letterSpacingMid: 'Espaciado medio',
    letterSpacingBig: 'Espaciado pesado'
  },
  en: {
    title: 'Accessibility menu',
    titleA11y: 'Accessibility menu, you can use the Ctrl + Alt + A keys to open and close this menu.',
    btnModal: 'Close modal',
    darkMode: 'Dark mode',
    stopAnimations: 'Stop animations',
    contrast: 'Contrast adjustment',
    contrastTitle: 'Custom contrast',
    contrastMain: "Adjust site's contrast.",
    grayScale: 'Gray scale',
    highContrast: 'High contrast',
    invertColors: 'Invert colors',
    yellowOnBlack: 'Yellow on black',
    whiteOnRed: 'White on red',
    greenOnBlue: 'Green on blue',
    yellowOnBlue: 'Yellow on blue',
    whiteOnBlack: 'White on black',
    fontSize: 'Font size adjustment',
    fontSizeTitle: 'Font size',
    fontSizeMain: 'Increase and decrease the font size.',
    fontSizeSmall: 'Font size 1',
    fontSizeMid: 'Font size 2',
    fontSizeBig: 'Font size 3',
    lineHeight: 'Adjust line height',
    lineHeightTitle: 'Line height',
    lineHeightMain: 'Increase the line height.',
    lineHeightSmall: 'Height x1.5',
    lineHeightMid: 'Height x1.75',
    lineHeightBig: 'Height x2',
    letterSpacing: 'Adjust text spacing',
    letterSpacingTitle: 'Text spacing',
    letterSpacingMain: 'Increase the text spacing.',
    letterSpacingSmall: 'Light spacing',
    letterSpacingMid: 'Medium spacing',
    letterSpacingBig: 'Heavy spacing'
  }
};
