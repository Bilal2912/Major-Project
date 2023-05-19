import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import Module_Enter from './Module_Enter';
import { useDispatch, useSelector } from 'react-redux';
const Step2 = props => {
  const { numberofModules , payload , setPayload } = props;
  const [modulearr, setModuleArr] = useState([]);
  const [currentModule, setCurrentModule] = useState(0);
  const { isCreated , course } = useSelector((state) => state.createCourse);

  let temp = [];
  for (let i = 0; i < numberofModules; i++) {
    let format = {
      moduleNum: i + 1,
      id: '',
      moduledata: [],
      questiondata: [],
      numberofQuestions : 0,
      timelimit : 120,
      notes: ""
    };
    temp.push(format);
  }

  useEffect(() => {
  if(numberofModules > 0){
    temp = []
    for (let i = 0; i < numberofModules; i++) {
      let format = {
        moduleNum: i + 1,
        id: '',
        moduledata: [],
        questiondata: [],
        numberofQuestions : 0,
      timeLimit : 120,
      notes : ''
      };
      temp.push(format);
    }
    setAllModules(temp);
    temp = [];}
  }, [numberofModules]);

  const [allModules, setAllModules] = useState(temp);

  const [moduledata, setModuleData] = useState(
    allModules[currentModule].moduledata
  );
  useEffect(() => {
   let data = {};
   let arr = [];
    allModules.map((ele , index) => {
        let obj = {
        name : ele.name,
        videos : ele.moduledata ,
        quizData :  {
          level : 1 ,
          qna : ele.questiondata,
          timeLimit : ele.timelimit,
          numberOfQuestions : ele.numberofQuestions,
        },
        notes : ele.notes,
      }
      arr.push(obj);
    }
    
    )
    data.moduleArray = arr ;
    setPayload(data);
  }, [allModules]);

  return (
    <>
    <Heading paddingBottom={'10px'} size = {'sm'} >{course?.courseName}</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <VStack align={'stretch'}>
            {allModules.map((ele, index) => (
              <Box
                as={'button'}
                onClick={() => {
                  setCurrentModule(index);
                }}
              >
                <Card
                  spacing={2}
                  variant={currentModule === index ? 'filled' : 'elevated'}
                >
                  <CardBody>
                    <Text>{ele?.name}</Text>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </VStack>
        </GridItem>

        <GridItem colSpan={4}>
          <HStack direction={'row '} align={'stretch'}>
            <Divider size={'5px'} orientation="vertical" />
            <Module_Enter
              numberofModules={numberofModules}
              allModules={allModules}
              setAllModules={setAllModules}
              currentModule={currentModule}
              moduledata={moduledata}
              setModuleData={setModuleData}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Step2;
