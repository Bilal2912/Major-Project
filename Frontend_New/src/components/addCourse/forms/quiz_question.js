import {
  FormControl,
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
  HStack,
  SimpleGrid,
  Radio,
  RadioGroup,
  Stack,
  Text,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
const Quiz_Question = props => {
  const {
    videocount,
    optionopen,
    setOptionOpen,
    question_data,
    setQuestionData,
    index_main,
  } = props;
  const [question, setQuestion] = useState(question_data[index_main]);
  const [checkedItems, setCheckedItems] = useState([true, false, false, false]);
  const handleInputChange = (e, index, type) => {
    let data = e.target.value;
    let temp = { ...question };
    switch (type) {
      case 'question':
        temp.question = data;
        break;
      case 'option':
        temp.options[index].content = data;
        break;
      default:
        console.log(data);
    }
    // console.log(index , temp.options)
    setQuestion(temp);
  };
  useEffect(() => {
    let temp = [...question_data];
    temp[index_main] = question;
    setQuestionData(temp);
  }, [question]);
  const [value, setValue] = useState('1');

  const changeSelect = (e , index) => {
    let temp = [...question_data];
    // console.log(temp , e);
    if (value === '1') {
      console.log(value)
      temp[index].qType = 'scq';
      //////////////////////////////// LOGIC CONFUSION
    } else {
      temp[index].qType = 'mcq';
    }
    setQuestionData(temp);
  }
  useEffect(() => {
    let temp = [...question_data];
    checkedItems.map((ele, index) => {
      temp[index_main].options[index].isCorrect = ele;
    });
    setQuestionData(temp);
  }, [checkedItems]);
  const changeValue = (e, index) => {
    let temp = [...checkedItems];
    temp[index] = e.target.checked;
    setCheckedItems(temp);
  };
  return (
    <>
      <FormControl>
        <Grid templateRows={'repeat(2, 1fr)'}>
          <GridItem>
            <FormLabel> Question Content </FormLabel>
            <Input
              name={'question_' + index_main}
              input={question.question}
              onChange={e => {
                handleInputChange(e, index_main, 'question');
              }}
            />
          </GridItem>
          <GridItem w="100%">
            <FormLabel> Image Link </FormLabel>
            <HStack>
              <Input
                name={'question_image' + index_main}
                // value={question[index_main].question}
                // onChange={e => {
                //   handleInputChange(e,  index_main , "image");
                // }}
              />
              <>
                <RadioGroup
                  onChange={e => {
                    setValue(e)
                    changeSelect(e, index_main);
                  }}
                  value={value}
                >
                  <FormLabel>Question Type </FormLabel>
                  <Stack direction="row">
                    <Radio value="1">SCQ</Radio>
                    <Radio value="2">MCQ</Radio>
                  </Stack>
                </RadioGroup>
              </>
            </HStack>
          </GridItem>
        </Grid>
        <SimpleGrid columns={2}>
          <CheckboxGroup>
            {question.options.map((ele, index) => {
              return (
                <>
                  <Box>
                    <FormLabel>Option {index + 1}</FormLabel>
                    <Input
                      w={'50%'}
                      input={ele}
                      onChange={e => {
                        handleInputChange(e, index, 'option');
                      }}
                    />
                    <Checkbox
                      size="lg"
                      isChecked={checkedItems[index]}
                      onChange={e => {
                        changeValue(e, index);
                      }}
                    >
                      Right Answer
                    </Checkbox>
                  </Box>
                </>
              );
            })}
          </CheckboxGroup>
        </SimpleGrid>
      </FormControl>
    </>
  );
};

export default Quiz_Question;
