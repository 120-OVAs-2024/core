import { useState } from 'react';

export const useSessionStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  /**
   * Estado que va a almacenar nuestro valor.
   * Pasamos la función para el estado inicial a useState,
   * para que esta solo se ejecute una vez.
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    /**
     * Dado que la API del SessionStorage no está disponible
     * en server-side rendering, comprobamos su existencia.
     */
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Obtenemos el valor del SessionStorage usando la clave.
      const item = window.sessionStorage.getItem(key);

      // Convertimos de JSON si no retornamos el valor inicial.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error, retornamos el valor inicial.
      console.warn(`Error in useSessionStorage: ${error}`);
      return initialValue;
    }
  });

  /**
   * Función utilizada para actualizar el valor del SessionStorage.
   *
   * @param {*} value - Nuevo valor del SessionStorage.
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitimos que 'value' sea una función para tener la misma API que useState.
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Guardamos el valor en el estado.
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        // Guardamos en el SessionStorage.
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Si hay un error, mostramos un mensaje en la consola.
      console.warn(`Error in useSessionStorage: ${error}`);
    }
  };

  return [storedValue, setValue];
};
