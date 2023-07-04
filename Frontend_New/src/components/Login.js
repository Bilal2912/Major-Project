import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input ,InputRightElement, Stack, Image, Text, InputGroup } from "@chakra-ui/react";

import { Link , useNavigate, useLocation } from "react-router-dom";
import GoogleButton from './GoogleButton';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../actions/userAction";
import React, { Fragment, useRef, useState, useEffect } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const { name, email, password } = user;
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/courseslist');
    }
  }, [dispatch, error, navigate, isAuthenticated]);
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input  input = {loginEmail} onChange = {(e)=> {setLoginEmail(e.target.value)}}  type="email" />
          </FormControl>
          <FormControl id="password">
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								input={loginPassword}
								onChange={(e) => {
									setLoginPassword(e.target.value);
								}}
								type={show ? "text" : "password"}
							/>
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={handleClick}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Stack>
              <Box>
            <Link to="/">
              <>
                <Button onClick = {(e) => {loginSubmit(e)}} colorScheme={'blue'} width={'100%'} variant={'solid'}>
                  Log in
                </Button>
              </>
            </Link>
            </Box>
            <Center>
            <Text>  <Link to = "/signup"> Create New Account?</Link></Text>
            </Center>
            {/* <GoogleButton></GoogleButton> */}
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
