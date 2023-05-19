import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import QuizModal from './QuizModal';
import { useNavigate } from "react-router-dom";
const Syllabus = (props) => {
  const { modules , ids } = props;
  const navigate = useNavigate();
  let courses = [
    {
      Module: 'Module 1',
      Videos: {
        noOfVideos: 2,
        videoLinks: [
          {
            title: 'Title 1',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
          {
            title: 'Title 2',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
        ],
      },
      quizdata: {
        numberofquests: 5,
        timelimit: 600000,
        question: [
          {
            questionText: 'What is the capital of France?',
            answerOptions: [
              { answerText: 'New York', isCorrect: false },
              { answerText: 'London', isCorrect: false },
              { answerText: 'Paris', isCorrect: true },
              { answerText: 'Dublin', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
              { answerText: 'Jeff Bezos', isCorrect: false },
              { answerText: 'Elon Musk', isCorrect: true },
              { answerText: 'Bill Gates', isCorrect: false },
              { answerText: 'Tony Stark', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
              { answerText: 'Apple', isCorrect: true },
              { answerText: 'Intel', isCorrect: false },
              { answerText: 'Amazon', isCorrect: false },
              { answerText: 'Microsoft', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 1?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 2?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 3?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 4?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 5?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 6?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
        ],
      },
    },
    {
      Module: 'Module 2',
      Videos: {
        noOfVideos: 4,
        videoLinks: [
          {
            title: 'Title 1',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
          {
            title: 'Title 2',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
          {
            title: 'Title 3',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
          {
            title: 'Title 4',
            link: 'https://www.youtube.com/embed/ysz5S6PUM-U',
          },
        ],
      },
      quizdata: {
        numberofquests: 5,
        timelimit: 600000,
        question: [
          {
            questionText: 'What is the capital of France?',
            answerOptions: [
              { answerText: 'New York', isCorrect: false },
              { answerText: 'London', isCorrect: false },
              { answerText: 'Paris', isCorrect: true },
              { answerText: 'Dublin', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
              { answerText: 'Jeff Bezos', isCorrect: false },
              { answerText: 'Elon Musk', isCorrect: true },
              { answerText: 'Bill Gates', isCorrect: false },
              { answerText: 'Tony Stark', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
              { answerText: 'Apple', isCorrect: true },
              { answerText: 'Intel', isCorrect: false },
              { answerText: 'Amazon', isCorrect: false },
              { answerText: 'Microsoft', isCorrect: false },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 1?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 2?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 3?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
            timetaken: 0,
          },
          {
            questionText: 'How many Harry Potter books are there 4?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 5?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
          {
            questionText: 'How many Harry Potter books are there 6?',
            answerOptions: [
              { answerText: '1', isCorrect: false },
              { answerText: '4', isCorrect: false },
              { answerText: '6', isCorrect: false },
              { answerText: '7', isCorrect: true },
            ],
          },
        ],
      },
    },
  ];
  return (
    <>
    <Center>
    <Box borderRadius={'20'} bg = "#DEEDFF" w='100%'paddingBlock={'5px'}  marginRight={'10px'}>
    <Heading size={'md'} margin = '2.5'> Course Plan</Heading>
      <Accordion allowToggle>
        {modules.map(ele => (
          <AccordionItem >
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {ele?.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Accordion allowToggle>
                {ele.videos.map(item => (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {item.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel  pb={4}>
                      <AspectRatio maxW="1060px" ratio={2}>
                        <iframe
                          title={item.title}
                          src={ "https://www.youtube.com/embed" + item.url.substring(16)}
                          allowFullScreen
                        />
                      </AspectRatio>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              <Center h="50px" color="white">
                <HStack>
                  {' '}
                  <QuizModal quizdata = {ele.quizData} ids = {ids} />
                  <Button colorScheme="blue" variant={'outline'} onClick={ () => { window.open(ele.notes ,"_blank") }}>
                    Download Notes
                  </Button>
                </HStack>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      </Box>
      </Center>
    </>
  );
};

export default Syllabus;
