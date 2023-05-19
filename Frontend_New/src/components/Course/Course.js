import React from 'react';
import {
  ChakraProvider,
  Box,
  Divider,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Module_Desc from './Module_Desc';
import Syllabus from './Syllabus';
import Course_Details from './Course_Details';
import Description from './Description';
import axios from 'axios';
import Reviews from './Reviews';
import Navbar from '../Navbar';
import SidebarWithHeader from '../../components/SideBar.jsx';
const Course = () => {
  var url_string = window.location;
  var url = new URL(url_string);
  var tvid = url.searchParams.get("id");
    const [data,setData] = useState();
    const [reviews , setReviews] = useState([]);
    const [modules , setModules] = useState();
    useEffect(() =>{
      let temp = data !== undefined ? data?.reviews : []
      setReviews(temp)
    },[data])
    useEffect(() =>{
      const fetchData = async () => {
        const info = await axios.get('http://localhost:4000/api/v1/course/' + tvid);
        const modules = await axios.get('http://localhost:4000/api/v1/getModulesOfCourse/' + tvid);
        setModules(modules.data);
        setData(info.data.course);
       // axios.get('‘https://localhost:4000/api/v1/allCourses').then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
     }
      fetchData();
    } , [])
    return (
       <>
  {/* <Navbar/> */}
      <SidebarWithHeader>
      <Divider orientation='horizontal'  p={'5px'} />
      <Box  bgGradient = {['linear(to-r,blue.300, white)' ]}  w="100%" p={4} color="white">
        <Module_Desc data={data} id = {tvid} />
      </Box>
      <Divider orientation='horizontal' p={'5px'} />
      <Grid bgGradient = {'linear(to-t,white,blue.50, white)' }  p = {'5'} templateColumns='repeat(2, 1fr)' marginTop={'10px'}>
      <GridItem colSpan={1}>
        <Course_Details data={data}/>
      </GridItem>
        <GridItem colSpan={1}>
       {modules !== undefined && <Syllabus data={data} modules = {modules?.modules} ids = {modules}   ></Syllabus>}
        </GridItem>
      </Grid>
      <Description data={data}/>
      <Divider orientation='horizontal' p={'5px'} />
      <Reviews id = {tvid} data = {reviews}/>
      </SidebarWithHeader>
       </> 
    )
}

export default Course;