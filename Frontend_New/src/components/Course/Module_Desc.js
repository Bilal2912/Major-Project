import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  HStack,
  Link,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Rating from './Ratings';
import { useDispatch, useSelector } from "react-redux";
import { enrolledCourse } from "../../actions/userAction";
import {
  clearErrors,
  enrollCourse,
  getCourseDetails,
  newReview,
} from "../../actions/courseAction";
const Module_Desc = (props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {data , id} = props ;
  const datetime  = new Date(data?.createdAt)
  console.log(data)
  const enrollCourseHandler = () => {
    dispatch(enrollCourse(id));
    dispatch(enrolledCourse(id));
    toast({
      title: "Enrolled Successfully",
      description: `You have successfully enrolled for ${data.courseName}`,
      status: "success",
      position: 'top-right',
      isClosable: true,
    })
  };
  return (
    <>
      <Grid
        // h="200px"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2} rowSpan={3}>
          <Box w="70%" h="100%">
            <Heading color={'black'} textStyle={'bold'} paddingBottom="5px">
              {' '}
              {data?.courseName}{' '}
            </Heading>
            <Text color={'black'}>
              Learn A-Z everything about Discrete Time Signal Processing, from
              the basics, to advanced topics like Operations on DT Signals,
              Convolution, DT Systems , and more!
            </Text>

            <Text color={'black'}>
              Created By :{' '}
              <Link color="blue.900" href="#">
                {data?.author}
              </Link>{' '}
            </Text>
            <Text color={'black'}>Enrollments : {data?.enrolledCount} </Text>
            <Text color={'black'}>Last updated : {data?.createdAt.slice(0,10)} </Text>
            <Text color={'black'}>
              Language : <Badge colorScheme={'blue'}> English</Badge>{' '}
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1} rowSpan={5}>
          <Box w="100%">
            <AspectRatio maxW="500px" ratio={7 / 5}>
              <Image
                borderRadius="lg"
                src="https://img.freepik.com/premium-vector/abstract-wave-line-background-with-beautiful-light-effect_541170-780.jpg"
                alt="Discrete Time Signal Processing"
              />
            </AspectRatio>
          </Box>
        </GridItem>
        <GridItem colSpan={2} rowSpan={1}></GridItem>
        <GridItem colSpan={2} rowSpan={1}>
          <HStack>
            <Button colorScheme="blue" onClick={enrollCourseHandler} >Enroll Now</Button>
            <Button colorScheme="blue" variant={'outline'}>
              Download Syllabus
            </Button>
          </HStack>
        </GridItem>
        
      </Grid>
    </>
  );
};

export default Module_Desc;
