export interface partBlank {
  type: 'space';
  content: string;
  index: number;
}

export interface letterProp {
  index: string;
  letter: string;
  enable: boolean;
}

export type spaceProp = {
  index: string;
  letter: string;
} | null;

export interface TypeWord {
  word: string;
  content?: string;
  a11y?: string;
}
