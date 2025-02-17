import { falsePositives, wrongAnswers } from "./constants";

export function isWrongAnswer(answer: string): boolean {
  const isWrong = wrongAnswers.some((wrongAnswer) =>
    answer.toLocaleLowerCase().includes(wrongAnswer)
  );
  if (isWrong) {
    return true;
  }
  const isFalsePositive = falsePositives.some((falsePositive) =>
    answer.toLocaleLowerCase().includes(falsePositive)
  );
  return isFalsePositive;
}
