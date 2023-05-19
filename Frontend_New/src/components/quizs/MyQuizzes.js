import SidebarWithHeader from '../SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/v1/getAllQuizDataForUser`);
      setQuizzes(data.quizData);
      console.log(data.quizData[0].quizData);
      // axios.get('‘https://localhost:4000/api/v1/allCourses').then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
    };
    fetchData();
  }, []);
  return (
    <>
      <SidebarWithHeader>
        {quizzes.map((ele, index) => (
          <>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Quiz Number : {index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {ele.quizData.qna.map((item, ind) => (
                    <>
                    <Card padding={'5px'}>
                      <CardBody>
                      <Text fontWeight={'semibold'}>
                        {' '}
                        Question No . {ind + 1} {' : '} {item.question}
                      </Text>
                      <Text>{ele.qType}</Text>
                      <SimpleGrid columns={2} rows={2} spacing={2}>
                        {item.options.map((i, j) => (
                          <Box>
                          <Text paddingRight={'2px'} as={'span'}>{j + 1} .</Text>
                          <Badge
                          borderRadius={10}
                            // w={'20%'}
                            bgColor={
                              item.userAnswer[0].content === i.content
                                ? i.isCorrect
                                  ? 'green.100'
                                  : 'tomato'
                                : 'white'
                            }
                            color={
                              item.userAnswer[0].content === i.content
                                ? i.isCorrect
                                  ? 'black'
                                  : 'white'
                                : 'black'
                            }
                          >
                            <Text>{i.content}</Text>
                          </Badge>
                          </Box>
                        ))}
                      </SimpleGrid>
                      <Text >
                        Correct Answer is :
                        {item.options.map((i, j) => (
                          <>
                            {' '}
                            {i.isCorrect && (
                              <>
                                {' '}
                               {i.content}
                              </>
                            )}{' '}
                          </>
                        ))}
                      </Text>
                      </CardBody>
                      </Card>

                    </>
                  ))}

                  <Text>
                    Score is : {ele.quizData.score} {'/'}{' '}
                    {ele.quizData.qna ? ele.quizData.qna.length : 0}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        ))}
      </SidebarWithHeader>
    </>
  );
};
export default MyQuizzes;
