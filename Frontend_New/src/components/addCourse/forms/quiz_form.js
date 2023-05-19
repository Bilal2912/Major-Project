import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  SimpleGrid,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

const Quiz_form = props => {
  const {
    open,
    setOpen,
    videocount,
    setVideoCount,
    text,
    type,
    currentModule,
    quizotherdata,
    setQuizOtherData,
  } = props;
  const [videonum, setvideoNum] = useState(0);
  const [numberofquests, setNumberofquests] = useState(0);
  const handleSubmit = e => {
    setvideoNum(e.target.value);
  };
  const handleSubmitQ = e => {
    setNumberofquests(e.target.value);
  };
  const handleClick = () => {
    setOpen(false);
    let data = [...videocount];
    data[currentModule] = videonum;
    if (type === 'quiz') {
      let sample = [...numberofquests];
      let obj = {
        numberofQuestions : numberofquests < videonum ? numberofquests : videonum,
        timelimit : 120,
      }
      sample[currentModule] = obj;
      setQuizOtherData(sample)
    }
    setVideoCount(data);
  };
  return (
    <>
      <SimpleGrid columns={2}>
        <FormControl isRequired>
          <FormLabel>{text}</FormLabel>
          <NumberInput max={50} min={0}>
            <NumberInputField
              name="question_count"
              max={50}
              min={0}
              onChange={e => {
                handleSubmit(e);
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        {type === 'quiz' && (
          <>
            <FormControl isRequired>
              <FormLabel>{'No. of questions to be attempted'}</FormLabel>
              <NumberInput max={50} min={0}>
                <NumberInputField
                  name="numberofquests"
                  max={50}
                  min={0}
                  onChange={e => {
                    handleSubmitQ(e);
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>


          </>
        
      
            
      
        )}
        {type === 'quiz' && <>
        <Box></Box>
        </>}
        <Box  h = {'100% '} w={'100%'}>
          <Stack align={'end'} >
            <Box h = {'25px'}></Box>
        <Button type="submit" onClick={handleClick}>
          {' '}
          Submit
        </Button>
        </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Quiz_form;
