import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Spacer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import QuizOption from './QuizOption';
import Timer from './Timer';
import QuizWindow from './QuizWindow';
const QuizModal = props => {
  const { quizdata , ids } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [optionselect , setOptionSelect] = useState(0);
  let shuffled = quizdata.qna
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value).slice(0 , quizdata.numberOfQuestions);
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Attempt Quiz
      </Button>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={'lg'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>

          
           <Text>  Quiz </Text>
            <Spacer />
            <Timer optionselect = {optionselect}   onClose = {onClose} />
            <Spacer/>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <QuizOption onClose={onClose} quizdata={quizdata} setOptionSelect = {setOptionSelect} optionselect = {optionselect} /> */}
            <QuizWindow onClose={onClose} quizdata={quizdata}  shuffled= {shuffled} ids = {ids} />
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuizModal;
