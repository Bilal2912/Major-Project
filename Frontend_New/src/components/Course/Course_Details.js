import { Box, Grid, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  RepeatClockIcon,
} from '@chakra-ui/icons';

const Course_Details = () => {
  return (
    <Box >
      <Heading size={'md'}>This course contains : </Heading>
      {/* <RepeatClockIcon/> */}
      <SimpleGrid columns={2}>
        <Text> 14 hours on-demand video</Text>
        <Text> 3 downloadable resources</Text>
        <Text> Access on mobile and TV</Text>
        <Text> 1 article</Text>
        <Text>Full lifetime access</Text>
        <Text>Certificate of completion</Text>
      </SimpleGrid>
    </Box>
  );
};

export default Course_Details;
