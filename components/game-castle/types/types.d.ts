import { VideoURLs } from "@/shared/hooks/useInterpreter";

export interface question_game {
  question: string;
  answers: string[];
  correct: string;
  audio_description?: string;
  audio_content?: string;
  interpreter: VideoURLs;
}

export interface partText {
  type: 'text';
  content: string;
}

export interface partBlank {
  type: 'space';
  content: string;
  index: number;
}
