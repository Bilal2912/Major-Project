import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, 
    useDisclosure
  } from '@chakra-ui/react'
  import React, { useState , useEffect , useRef } from 'react';
  import { Link } from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux";
  const DrawerEx = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef() ;
    const userLogout = () => {
      dispatch(logout());
      alert.success("Logged Out Successfully");
    };
    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick = {() => {userLogout}} >Logout</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default DrawerEx;