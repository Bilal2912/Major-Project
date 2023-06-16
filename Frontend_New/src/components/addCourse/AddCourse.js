import Navbar from '../Navbar';
import Step1 from './Step1';
import Step2 from './Step2';
import { Tabs, TabList, TabPanels, Tab, TabPanel  , Button , Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarWithHeader from '../../components/SideBar.jsx';
import {createCourseModule} from '../../actions/courseAction';
import { useNavigate } from 'react-router-dom';
import {CREATE_COURSE_RESET } from '../../constants/courseConstants';

const AddCourse = props => {
  const { edit } = props;
  const [numberofModules, setNumberOfModules] = useState(2);
  const { isCreated , course  } = useSelector((state) => state.createCourse);
  const {isModuleCreated} = useSelector((state) => state.createModule)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [payload, setPayload] = useState();
  const [preset_data, setPresetData] = useState({});
  const handleTabsChange = index => {
    setTabIndex(index);
  };
  useEffect(()=> {
    if(isModuleCreated){
      navigate('/mycourses')
    }
	if (isCreated){
		dispatch({ type: CREATE_COURSE_RESET });
	}
  } , [isModuleCreated , isCreated , dispatch])

  useEffect(() => {
    setNumberOfModules(1);
    let temp  = {};
    temp.courseName = "";
    temp.courseDescription = "";
    temp.courseCategory = "";
    temp.courses = [
      {
        quizData: {
          level: 1,
          numberOfQuestions: 1,
          timeLimit: 120,
          qna: [
          ]
        },
        name: "Module 1",
        videos: [
        ],
        notes: "",
      }
    ]
    setPresetData(temp);
  } , [])
 return (
		<>
			<SidebarWithHeader>
				<Tabs
					index={tabIndex}
					onChange={handleTabsChange}
					isFitted
					variant="enclosed"
					isLazy>
					<TabList mb="1em">
						<Tab>Create Course</Tab>
            <Tab isDisabled>Enter Module Data</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Step1
								numberofModules={numberofModules}
								setTabIndex={setTabIndex}
								setNumberOfModules={setNumberOfModules}
								preset_data={preset_data}
								setPresetData = {setPresetData}
							/>
						</TabPanel>
						<TabPanel>
							<Step2
								numberofModules={numberofModules}
								setNumberOfModules = {setNumberOfModules}
								payload={payload}
								setPayload={setPayload}
								preset_data={preset_data}
								setPresetData = {setPresetData}
							/>
							<Stack align={"end"}>
								<Button
									colorScheme={"blue"}
									onClick={() => {
										let temp = {...preset_data};
										delete temp.courseCategory;
										delete temp.courseCategory;
										let modules = {
											moduleArray : preset_data.courses,
										}
										dispatch(createCourseModule(modules, course._id));
									}}>
									Send Module Data{" "}
								</Button>
							</Stack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</SidebarWithHeader>
		</>
	);
};

export default AddCourse;
