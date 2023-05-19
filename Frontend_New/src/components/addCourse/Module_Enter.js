import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  VStack
} from '@chakra-ui/react';
import Quiz_form from './forms/quiz_form';
import Video_Form from './forms/video_form';
import { useEffect, useState } from 'react';
import Quiz_Question from './forms/quiz_question';
import ModuleName from './forms/module_name';

const Module_Enter = props => {
  const { moduledata, setModuleData, numberofModules  , currentModule , allModules , setAllModules} = props;
  // const  [ moduledata, setModuleData] = useState(allModules[currentModule].moduledata)
  let openArr = [];
  for(let i = 0; i < numberofModules; i++) { 
    let data = {
      video : true ,
      quiz : true ,
    }
    openArr.push(data);
  }
  const [openorclose , setOpenOrClose] = useState(openArr);
  const [videocount, setVideoCount] = useState(1);
  const [open, setOpen] = useState(true);
  const [open_module, setOpenModule] = useState(true);
  const [optionopen, setOptionOpen] = useState(false);
  const [videocountmodule, setVideoCountModule] = useState(new Array(numberofModules));
  const [quizcount, setQuizCount] = useState(new Array(numberofModules));
  const [notes, setNotes] = useState(new Array(numberofModules));
  const [module_names , setModuleNames] = useState(new Array(numberofModules))
  useEffect(() => {
    let arr = new Array(numberofModules);
  for (let i = 0; i < numberofModules ; i++) {
    arr.push(`Module ${i}`);
  }
  setModuleNames(arr);
  } , [])
  
  let sample = {
    qType: 'mcq',
    question: '',
    options: [
      {
        content: '',
        isCorrect: false,
      },
      {
        content: '',
        isCorrect: false,
      },
      {
        content: '',
        isCorrect: false,
      },
      {
        content: '',
        isCorrect: false,
      },
    ],
  };
  let sample2 = {
    title: '',
    url: 'https://www.youtube.com/watch?v=hSl9NKEY8Eg',
    views : 0,
  };
  const [questiondata, setQuestionData] = useState([sample]);
  const [quizotherdata , setQuizOtherData] = useState([new Array(numberofModules)]);
  
  useEffect(() => {
    let data = [];
    for (let i = 0; i < quizcount[currentModule]; i++) {
      data.push(sample);
    }
    setQuestionData(data);
  }, [quizcount]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < videocountmodule[currentModule]; i++) {
      data.push(sample2);
    }
    setModuleData(data);
  }, [videocountmodule]);

  useEffect(() => {
    let temp = [...allModules] ;
    temp[currentModule].moduledata = moduledata ;
    temp[currentModule].questiondata = questiondata;
    temp[currentModule].notes = notes[currentModule];
    setAllModules(temp);
  } , [moduledata , questiondata ]);

  useEffect(() => {

    let temp = [...allModules];
    temp[currentModule].numberofQuestions = quizotherdata[currentModule].numberofQuestions  ;
    temp[currentModule].timelimit = quizotherdata[currentModule].timelimit ;
    setAllModules(temp);
  }, [quizotherdata])

  useEffect(()=> {
      let temp = [...allModules];
      temp[currentModule].notes = notes[currentModule];
      setAllModules(temp);
  } ,[notes , currentModule])

  useEffect(() => {
    let data = [...openorclose];
    data[currentModule].video = open_module ;
    data[currentModule].quiz = open;
    setOpenOrClose(data);
  } ,[open_module , open]);

  useEffect(() => {
    let data = [...openorclose];
    if(data[currentModule].video){
      setOpenModule(true);
    }
    if(data[currentModule].quiz){
      setOpen(true);
    }
  },[currentModule]);

  useEffect(() => {
    let temp = [...allModules];
    temp[currentModule].name = module_names[currentModule];
    setAllModules(temp);
  } , [module_names , currentModule]);

  
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < numberofModules; i++) {
      temp.push('Modules ' + (i+1));
    }
    setModuleNames(temp);
    let temp2 = [...allModules];
    temp2.map((ele , i)=> {
      ele.name = temp[i];
    })
    setAllModules(temp2);
  }, []);

  return (
    <>
    <VStack w = {'100% '}>
    <Heading size={'md'} alignSelf={'start'}>
      <ModuleName module_names = {module_names} setModuleNames = {setModuleNames} numberofModules = {numberofModules} currentModule = {currentModule} />
    </Heading>
      <Accordion w = {"100%"} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Video Links
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {openorclose[currentModule].video ? (
              <Quiz_form
                open={open_module}
                setOpen={setOpenModule}
                currentModule={currentModule}
                videocount = {videocountmodule}
                setVideoCount={setVideoCountModule}
                text={'Enter Number of Videos'}
                type = {'video'}
              />
            ) : (
              <Accordion allowToggle>
                {allModules[currentModule].moduledata.map((ele, index) => {
                  return (
                    <AccordionItem>
                      <h2>
                      {/* <AccordionButton>
                          <Box as="button" onClick={index => {
                              let temp = [...moduledata];
                              let d = temp.splice(1, index);
                              setModuleData(temp);
                            }}  flex="1" textAlign="left">
                            D
                        
                            </Box>
                        </AccordionButton> */}
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Video {index + 1} Information
                          </Box>
                          <AccordionIcon />
                         
                        </AccordionButton>
                       
                      </h2>
                      <AccordionPanel pb={4}>
                        <Video_Form
                          moduledata={allModules[currentModule].moduledata}
                          setModuleData={setModuleData}
                          index={index}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Quiz Data
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {
              openorclose[currentModule].quiz  ? (
                <Quiz_form
                  open={open}
                  setOpen={setOpen}
                  videocount = {quizcount}
                  currentModule={currentModule}
                  setVideoCount={setQuizCount}
                  quizotherdata = {quizotherdata}
                  setQuizOtherData = {setQuizOtherData}
                  text={'Total Quiz Question'}
                  type = {'quiz'}
                />
              ) : (
                <>
                  <Accordion allowToggle>
                    {allModules[currentModule].questiondata.map((ele, index) => {
                      return (
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                Question {index + 1}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                        <AccordionPanel pb={4}>
                            <Quiz_Question
                              videocount={videocount}
                              optionopen={optionopen}
                              setOptionOpen={setOptionOpen}
                              question_data={allModules[currentModule].questiondata}
                              index_main={index}
                              setQuestionData={setQuestionData}
                            />
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </>
              )
            }
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Notes
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl>
              <FormLabel>
                Enter Notes Link
              </FormLabel>
              <Textarea
              value = {notes[currentModule] !== undefined ? notes[currentModule] : ''}
              onChange = {(e) => {let data = [...notes] ; data[currentModule] = e.target.value ; setNotes(data)}}
                placeholder="Enter notes url"
                rows={1}
                shadow="sm"
                focusBorderColor="brand.400"
                fontSize={{
                  sm: 'sm',
                }}
              />
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      </VStack>
    </>
  );
};

export default Module_Enter;
