// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
export default function CourseCard(props) {
  const { coursedata} = props ;
  let url = "/course?id=" + coursedata._id;
  return (
 
    <Center py={6}>
         <Link to = {url}>
      <Box
        maxW={'300px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        height={"450px"}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={2}
          pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
           {coursedata.courseName.length > 10  ? coursedata.courseName.substring(0,14) + "..." : coursedata.courseName}
          </Heading>
          <Text color={'gray.500'}>
           {coursedata.courseDescription.length > 70 ? coursedata.courseDescription.substring(0,70) + " ..." :coursedata.courseDescription  } {' '}
          </Text>
          <Text>
          Number of Enrollments : {coursedata.enrolledCount}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          {  (<Avatar
            src={coursedata?.courseImages !== undefined ?  coursedata.courseImages.length  ? coursedata.courseImages[0].url : 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'  : 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
            alt={'Author'}
          />)}
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{coursedata.author}</Text>
            <Text color={'gray.500'} fontSize={'10px'}> Last updated : {coursedata?.createdAt.slice(0,10)}</Text>
          </Stack>
        </Stack>
      </Box>
      </Link>
    </Center>

  );
}