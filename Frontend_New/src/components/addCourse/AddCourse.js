import Navbar from '../Navbar';
import Step1 from './Step1';
import Step2 from './Step2';
import { Tabs, TabList, TabPanels, Tab, TabPanel  , Button , Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarWithHeader from '../../components/SideBar.jsx';
import {createCourseModule} from '../../actions/courseAction';
import { useNavigate } from 'react-router-dom';
const AddCourse = props => {
  const { edit } = props;
  const [numberofModules, setNumberOfModules] = useState(2);
  const { isCreated , course  } = useSelector((state) => state.createCourse);
  const {isModuleCreated} = useSelector((state) => state.createModule)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [payload, setPayload] = useState();
  const handleTabsChange = index => {
    setTabIndex(index);
  };
  useEffect(()=> {
    if(isModuleCreated){
      navigate('/mycourses')
    }
  } , [isModuleCreated])
  return (
    <>
      <SidebarWithHeader>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        isFitted
        variant="enclosed"
        isLazy
      >
        <TabList mb="1em">
          <Tab>Create Course</Tab>
          {edit ? (
            <Tab>Enter Module Data</Tab>
          ) : (
            <Tab isDisabled>Enter Module Data</Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Step1
              numberofModules={numberofModules}
              setTabIndex={setTabIndex}
              setNumberOfModules={setNumberOfModules}
            />
          </TabPanel>
          <TabPanel>
            <Step2 numberofModules={numberofModules} payload = {payload} setPayload = {setPayload}  />
            <Stack align = {'end'}>
            <Button colorScheme={'blue'} onClick = {() => {
              dispatch(createCourseModule(payload , course._id))
            }} >Send Module Data </Button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </SidebarWithHeader> 
    </>
  );
};

export default AddCourse;
