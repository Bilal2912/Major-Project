import {
  Grid,
  GridItem,
  Text,
  VStack,
  Button,
  RadioGroup,
  Radio,
  Box,
  SimpleGrid,
  Circle,
  Flex,
  Spacer
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const QuizWindow = props => {
  const { onClose, quizdata, shuffled , ids  } = props;
  let courseid = ids.modules[0].courseId;
  let moduleid = ids.modules[0]._id;
  const [useranswer, setUserAnswer] = useState(
    shuffled.map(v => ({ ...v, userAnswer: {content : null , isCorrect : false } }))
  );
  const { user } = useSelector(state => state.user);
  const [current, setCurrent] = useState(0);
  const fetchData = async () => {
    let score = 0 ; 
    useranswer.map((ele) => {
      if(ele.userAnswer.isCorrect) {
        score = score + 1 ;
    }})
    let payload = {
      level : 1 ,
      score : score , 
      qna : useranswer ,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/storeUserQuizData/${courseid}?moduleId=${moduleid}&userId=${user._id}`,
      payload,
      config
    );
    if(data.success){
      onClose();
    }
   }

  return (
    <>
      <Grid templateColumns="repeat(7, 1fr)" gap={6}>
        <GridItem colSpan={4}>
          Q. {current + 1}
          <Text fontSize={'lg'}>{shuffled[current].question}</Text>
          <RadioGroup
            onChange={e => {
              let arr = [...useranswer];
              arr[current].userAnswer.content = e;
              arr[current].options.map((item )=> {
                if(e === item.content){
                  arr[current].userAnswer.isCorrect = item.isCorrect;
                }
              })
              setUserAnswer(arr);
            }}
            value={useranswer[current].userAnswer.content ? useranswer[current].userAnswer.content : ""}
          >
            <VStack spacing={2} p={'3px'} align="stretch">
              {shuffled[current].options.map((ele, index) => (
                <Radio value={ele.content}>{ele.content}</Radio>
              ))}
            </VStack>
          </RadioGroup>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid columns={5} spacing={10}>
            {shuffled.map((ele, index) => (
              <>
                <Circle
                h = {'20px'}
                  as={'button'}
                  bg=
                  {useranswer[current].userAnswer.content === null ?  "tomato" : "green"}
                  p={4}
                  color={"white"}
                  onClick={() => {
                    setCurrent(index);
                  }}
                >
                  {index + 1}
                </Circle>
              </>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
      <Flex>
      <Button onClick = {() => {let arr = [...useranswer];
              arr[current].userAnswer.content  = null;
              setUserAnswer(arr);}}>Reset</Button>
              <Spacer></Spacer>
      <Button
        onClick={() => {
          if (current < quizdata.numberOfQuestions - 1) {
            setCurrent(current + 1);
          }
          if(current === quizdata.numberOfQuestions-1 ){
            fetchData();

          }
        }}
      >
       {current !== quizdata.numberOfQuestions-1 ?  "Next" : "Submit"}
      </Button>
      </Flex>
    </>
  );
};

export default QuizWindow;
