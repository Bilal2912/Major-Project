import Navbar from "../Navbar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarWithHeader from "../SideBar.jsx";
import { createCourseModule } from "../../actions/courseAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EditCourse = (props) => {
	var url_string = window.location;
	var url = new URL(url_string);
	var tvid = url.searchParams.get("id");
	const { user } = useSelector((state) => state.user);
	const [numberofModules, setNumberOfModules] = useState(1);
	const { isCreated, course } = useSelector((state) => state.createCourse);
	const { isModuleCreated } = useSelector((state) => state.createModule);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = useState(0);
	const [payload, setPayload] = useState();
	const [preset_data, setPresetData] = useState({});
	const [modules, setModules] = useState([]);
	const handleTabsChange = (index) => {
		setTabIndex(index);
	};
	useEffect(() => {
		if (isModuleCreated) {
			navigate("/mycourses");
		}
	}, [isModuleCreated]);

	useEffect(() => {
		const fetchData = async () => {
			const info = await axios.get("http://localhost:4000/api/v1/course/" + tvid);
			const modules = await axios.get("http://localhost:4000/api/v1/getModulesOfCourse/" + tvid);
			setModules(modules.data.modules);
			setNumberOfModules(modules.data.modules.length);
			setPresetData({ ...info.data.course, courses: modules.data.modules });
			// axios.get('‘https://localhost:4000/api/v1/allCourses').then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
		};
		fetchData();
	}, []);

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
						<Tab>Update Course</Tab>
						<Tab>Update Module Data</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Step1
								numberofModules={numberofModules}
								setTabIndex={setTabIndex}
								setNumberOfModules={setNumberOfModules}
								preset_data={preset_data}
								setPresetData={setPresetData}
								tvid={tvid}
							/>
						</TabPanel>
						<TabPanel>
							<Step2
								numberofModules={numberofModules}
								setNumberOfModules={setNumberOfModules}
								payload={payload}
								setPayload={setPayload}
								modules={modules}
								preset_data={preset_data}
								setPresetData={setPresetData}
								tvid={tvid}
							/>
							<Stack align={"end"}>
								<Button
									colorScheme={"blue"}
									onClick={async () => {
										// dispatch(createCourseModule(payload, course._id));
										console.log(preset_data.courses[0].videos[0].title);
										let temp = preset_data.courses[0];
										let modules = {
											moduleData: temp,
										};
										preset_data.courses.map(async (ele , index) => {
											if(preset_data.courses[index]._id !== undefined) {
												await axios.put(
													preset_data.courses[index]._id !== undefined ? "http://localhost:4000/api/v1/adminNprof/modules/update/" + preset_data.courses[index]._id : "http://localhost:4000/api/v1/adminNprof/modules/new/",
													preset_data.courses[index]._id !== undefined
														? {
																moduleData: ele,
														  }
														: {
																moduleArray: ele,
														  }
												);
											}
											else {
												console.log(ele)
												dispatch(createCourseModule({moduleArray : [ ele]}, tvid));
											}
											})
										
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

export default EditCourse;
