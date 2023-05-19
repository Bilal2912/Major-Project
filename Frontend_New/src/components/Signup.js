
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';
import GoogleButton from './GoogleButton'
import { Outlet, Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../actions/userAction";
import React, { Fragment, useRef, useState, useEffect } from "react";
const Signup = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [username , setUserName] = useState("")
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("https://media.istockphoto.com/id/1212812078/vector/student-avatar-flat-icon-flat-vector-illustration-symbol-design-element.jpg?s=170667a&w=0&k=20&c=OtUv7OGKTONdGrW6ut2CRRn9rXK2euMhyyA6XDX8w8M=");
  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", username);
    myForm.set("email", loginEmail);
    myForm.set("password", loginPassword);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/courseslist');
    }
  }, [dispatch, error, navigate, isAuthenticated]);
 return  (<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Enter Full Name</FormLabel>
            <Input  input = {username} onChange = {(e)=> {setUserName(e.target.value)}}  type="text" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input  input = {loginEmail} onChange = {(e)=> {setLoginEmail(e.target.value)}}  type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input input = {loginPassword} onChange = {(e)=> {setLoginPassword(e.target.value)}}  type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Link to = '/'>
              <>
            <Button onClick={(e) => {registerSubmit(e)}} colorScheme={'blue'}  width={'100%'} variant={'solid'}>
              Sign Up
            </Button>
            </>
            </Link>
            {/* <GoogleButton></GoogleButton> */}
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
    </Stack>)


}

export default Signup;


