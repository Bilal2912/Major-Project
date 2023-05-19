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
  Spacer,
  Avatar,
  Center,
} from '@chakra-ui/react';
import SidebarWithHeader from './SideBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
const Profile = () => {
  const { user } = useSelector(state => state.user);
  console.log(user);
  return (
    <>
      <SidebarWithHeader>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w={'100%'}>
            <Center>
              <VStack>
                <Avatar size="2xl" name="" src={user.avatar.url} />
                <Box>
                  <Text fontSize={'20px'}>{user.name}</Text>
                  <Text>Role : {user.role} </Text>
                </Box>
              </VStack>
            </Center>
          </GridItem>
          <GridItem w={'100%'}>This is RIght Part</GridItem>
        </Grid>
      </SidebarWithHeader>
    </>
  );
};

export default Profile;
