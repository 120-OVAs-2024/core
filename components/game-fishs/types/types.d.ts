interface video_interpreter {
  contentURL: string;
}

export interface question_game {
  paragraphParts: Array<partBlank | partText>;
  mockAnswers: string[];
  audio_description?: string;
  audio_content?: string;
  interpreter_success?: video_interpreter;
  interpreter_wrong?: video_interpreter;
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

