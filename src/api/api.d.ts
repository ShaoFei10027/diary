export interface NewsType {
  id: number;
  title: string;
  content: string;
  description?: string;
  auth?: number;
  [propName: string]: any;
}

export interface QuestionType {
  question: string;
  explanation: string;
  id?: number;
}
