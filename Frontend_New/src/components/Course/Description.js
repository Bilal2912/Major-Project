import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';


const Description = (props) => {
  const {data} = props ;
  // courseDetails();
  return (
    <Box p={'10px'} w={'90%'}>
        <Box p={'5'}>
      <Heading size={'md'} spacing={'1'}>Description</Heading>
      {data ? <Text >
        {data?.courseDescription}
      </Text> : null}
      <OrderedList paddingTop={'10px'} spacing={'1'}>
        <ListItem>Continuous Time signal, Discrete Time Signals</ListItem>
        <ListItem>Operations on DT Signals</ListItem>
        <ListItem>Linear Convolution, Circular Convolution</ListItem>
        <ListItem>Auto Correlation</ListItem>
      </OrderedList></Box>
    </Box>

  );
};

export default Description;
