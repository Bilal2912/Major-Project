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
  Circle,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { MinusIcon, AddIcon , EditIcon } from '@chakra-ui/icons';
import QuizModal from './QuizModal';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Download } from 'tabler-icons-react';
const Syllabus = (props) => {
  const { data, modules , ids } = props;
  const navigate = useNavigate();
  var url_string = window.location;
  var url = new URL(url_string);
  var tvid = url.searchParams.get("id");
  const { user } = useSelector(state => state.user);

  return (
    <>
    <Center>
    <Box borderRadius={'20'} bg = "#DEEDFF" w='100%'paddingBlock={'5px'}  marginRight={'10px'}>
      <HStack justifyContent="space-between">
      <Heading size={'md'} margin = '2.5'> Course Plan</Heading>
       {user._id === data.user && <Circle padding={'10px'} onClick={() => {navigate(`/editcourse?id=${tvid}`)}} >
        <EditIcon />
       </Circle>}
      </HStack>
    
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
                  <HStack alignItems={'baseline'}>
                  <AccordionItem w = {'90%'}>
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
                  <IconButton colorScheme='blue' size={'sm'} icon = {<Download/>} onClick={ () => { window.open(item.notes ,"_blank") }} />
                  </HStack>
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
