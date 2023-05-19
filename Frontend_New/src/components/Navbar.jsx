import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer , 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  Input,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import React , { useState , useRef } from 'react';
import { Outlet, Link , useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";

const Navbar = () => {

const { isOpen, onOpen, onClose } = useDisclosure()
const navigate = useNavigate();
    const btnRef = useRef() ;
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const userLogout = () => {
      dispatch(logout());
      alert.success("Logged Out Successfully");
    };
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box as = 'button' onClick = {() => {
            navigate('/courseslist');
        }} p="2">
          <Heading size="md">Yaashika</Heading>
        </Box>
        <Spacer />
        <Avatar
        onClick={onOpen}
        m={'2'}
                      name="Segun Adebayo"
                      src= {user.avatar.url}
                    />
                     <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>Create your account</DrawerHeader> */}
  
            <DrawerBody>
              <VStack>
              <Link to="">
            <Button colorScheme='blue'>My Courses</Button>
            </Link>
            <Link to="/courseslist">
            <Button colorScheme='blue'>All courses</Button>
            </Link>
            </VStack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'  onClick = {userLogout} >Logout</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
       {!isAuthenticated && ( <ButtonGroup gap="2">
          <Link to='/signup'>
          <Button colorScheme="teal">Sign Up</Button>
          </Link>
          <Link to='/login'>
          <Button colorScheme="teal">Log in</Button>
          </Link>
        </ButtonGroup>)}
      </Flex>
    </>
  );
};

export default Navbar