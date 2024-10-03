import type { PaginationItemType as PaginationItemTypeUI } from 'books-ui'

import { Language } from '@/types/types';

export interface Props {
  currentPage: number;
}

export interface PaginationItemProps {
  item: PaginationItemTypeUI;
  lang: Language;
  titles: string[];
}

export type PaginationItemType = 'page' | 'next' | 'previous';
