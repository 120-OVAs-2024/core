import { Language } from '@/types/types';

export interface Props {
  currentPage: number;
}

export interface PropsPaginationItem {
  item: ItemType;
  lang: Language;
}

export type PaginationItemType = 'page' | 'next' | 'previous';

export interface ItemType {
  /**
   * Función llamada al hacer clic en el elemento.
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * El tipo de elemento de la paginación.
   */
  type: string;
  /**
   * El número de la página (opcional).
   */
  page: number | null;
  /**
   * Indica si el elemento está seleccionado.
   */
  selected: boolean;
  /**
   * Indica si el elemento está deshabilitado.
   */
  disabled: boolean;
  /**
   * El valor de aria-current para el elemento.
   */
  'aria-current'?: string | undefined;
  /**
   * El valor de aria-label para el elemento.
   */
  'aria-label': string | undefined;
}
