import { Answer } from "./answer.model";

export interface AnswerSheet{
  title: string;
  answerList: AnswerBlock[];
  result: number;
}
export interface AnswerBlock{
  answerBlock: Answer[];
  id: number;
}
