import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
const QuizOption = props => {
  const { quizdata, setOptionSelect, optionselect } = props;

  const [questionArray, setQuestionArray] = useState(quizdata.question);
  const [qno, setQno] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    Math.floor(Math.random() * quizdata.question.length) + 1
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const handleAnswerOptionClick = (isCorrect, number) => {
    setOptionSelect(optionselect + 1);
    if (isCorrect) {
      setScore(score + 1);
    }
    setQno(qno + 1);
    nextQuestion(number);
  };
  const nextQuestion = number => {
    const Qnext =
      Math.floor(Math.random() * (quizdata.numberofquests - qno)) + 1;
    setQuestionArray(current => current.filter((_, index) => index !== number));
    setCurrentQuestion(Qnext);
    if (qno === quizdata.numberofquests - 1) {
      setShowScore(true);
    }
  };
  return (
    <>
      {showScore ? (
        <Text>
          You scored {score} out of {quizdata.numberofquests}
        </Text>
      ) : (
        <>
          <Text p={'3px'} size="lg">
            {' '}
            {qno + 1}. {questionArray[currentQuestion].questionText}{' '}
          </Text>
          <VStack spacing={2} p={'3px'} align="stretch">
            {questionArray[currentQuestion].answerOptions.map(answerOption => (
              <Button
                bg="blue"
                color="white"
                px={4}
                h={8}
                onClick={() =>
                  handleAnswerOptionClick(
                    answerOption.isCorrect,
                    currentQuestion
                  )
                }
              >
                {answerOption.answerText}
              </Button>
            ))}
          </VStack>
        </>
      )}
    </>
  );
};

export default QuizOption;
