import { useState } from 'react';
import { useLocalStorage } from 'books-ui';

import { INITIAL_STATE, INVALID_VALUES, KEY_LOCAL_STORAGE } from '../consts';
import type { ConfigA11y } from '../types/types';

type ToggleProps = (property: keyof ConfigA11y, value?: string) => void;

export const useA11y = (): [ConfigA11y, ToggleProps] => {
  const [configLocalStorage, setConfigLocalStorage] = useLocalStorage(KEY_LOCAL_STORAGE, INITIAL_STATE);
  const [config, setConfig] = useState<ConfigA11y>(() => ({ ...configLocalStorage }));

  /**
   * Función utilizada para alternar una propiedad de configuración.
   * @param {keyof Config} property - Propiedad de la configuración a alternar.
   */
  const handleToggleProp: ToggleProps = (property: keyof ConfigA11y, value?: string) => {
    const HTML_SELECTOR = document.querySelector('html');
    if (!HTML_SELECTOR) return;

    let propertyValue = value || !config[property];

    // Reestablece al valor inicial si el valor actual es igual al almacenado
    if (value === config[property]) {
      propertyValue = INITIAL_STATE[property];
    }

    // Convierte la propiedad camelCase a data-attribute
    const propertyDataSet = `data-${property
      .split(/(?<!^)(?=[A-Z])/)
      .map((str) => str.toLowerCase())
      .join('-')}`;

    // Establece o elimina el atributo data-* en <html> según el valor
    if (!INVALID_VALUES.includes(propertyValue)) {
      HTML_SELECTOR.setAttribute(propertyDataSet, String(propertyValue));
    } else {
      HTML_SELECTOR.removeAttribute(propertyDataSet);
    }

    setConfigLocalStorage({ ...configLocalStorage, [property]: propertyValue });
    setConfig({ ...config, [property]: propertyValue });
  };

  return [config, handleToggleProp];
};
