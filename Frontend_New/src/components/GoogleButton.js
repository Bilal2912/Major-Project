import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

export default function GoogleButton() {
  return (
    <Center p={8}>
      <Button
        w={'full'}
        maxW={'xl'}
        variant={'outline'}
        leftIcon={<FcGoogle />}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}