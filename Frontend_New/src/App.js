import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesList from './components/CourseList/CoursesList';
import Course from './components/Course/Course';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import SidebarWithHeader from './components/SideBar';
import AddCourse from './components/addCourse/AddCourse';
import store from "./store";
import { loadUser } from "./actions/userAction";
import { getAllCourse, getCourse } from "./actions/courseAction";
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import MyQuizzes from './components/quizs/MyQuizzes';
function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllCourse());
  }, []);
  return (  
    <ChakraProvider theme={theme} over>
         {/* <SidebarWithHeader></SidebarWithHeader> */}
    <BrowserRouter>
      <Routes>
      <Route path = '' element = {<Login/>}/>
      <Route path = 'signup' element = {<Signup/>}/>
     
      <Route element={<ProtectedRoute />}>
      <Route path = 'course' element = {<Course />}/>
      <Route path = 'courseslist' element = {<CoursesList  enrolledonly = {false} create = {false} />}/>
      <Route path = 'enrolledcourseslist' element = {<CoursesList  enrolledonly = {true} create = {false} />}/>
      <Route path = 'mycourses' element = {<CoursesList  enrolledonly = {true}  create = {true}/>}/>
      <Route path = 'addcourse' element = {<AddCourse edit = {false}  />}/>
      <Route path = 'editcourse' element = {<AddCourse edit = {true} />}/>
      <Route path = 'profile' element = {<Profile/>}/>
      <Route path = 'myquizzes' element = {<MyQuizzes/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
