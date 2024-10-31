import React, { createContext, useContext, useState } from 'react';

// Define los tipos para los valores almacenados en el contexto
export interface SvgContextValues {
  pointplayer1: number;
  pointplayer2: number;
  move1: number;
  move2: number;
}

// Define el tipo completo del contexto incluyendo el setter
interface SvgContextType {
  state: SvgContextValues;
  setState: React.Dispatch<React.SetStateAction<SvgContextValues>>;
}

// Valores por defecto para el contexto
const defaultValues: SvgContextType = {
  state: { pointplayer1: 0, pointplayer2: 0, move1: 0, move2: 0 },
  setState: () => {}
};

// Crea el contexto
const ContextValuesSvg = createContext<SvgContextType>(defaultValues);

// Componente Provider
interface SvgProviderProps {
  children: React.ReactNode; // Definir children como parte de las props
}

export const RaceCardProvider: React.FC<SvgProviderProps> = ({ children }) => {
  const [state, setState] = useState<SvgContextValues>({
    pointplayer1: 0,
    pointplayer2: 0,
    move1: 0,
    move2: 0
  });

  return <ContextValuesSvg.Provider value={{ state, setState }}>{children}</ContextValuesSvg.Provider>;
};

// Hook personalizado para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useSvgContext = () => useContext(ContextValuesSvg);
