import React, { useState, useEffect } from "react";
import { Progress, Box, ButtonGroup, Button, Heading, Flex, FormControl, GridItem, FormLabel, Input, Select, SimpleGrid, InputLeftAddon, InputGroup, Textarea, FormHelperText, InputRightElement, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Spacer, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { createCourse, updateCourse, createCourseModule } from "../../actions/courseAction";
import { clearErrors } from "../../actions/userAction";
import { CREATE_COURSE_RESET, CREATE_MODULE_RESET } from "../../constants/courseConstants";
import { CREATED_COURSE_RESET } from "../../constants/userConstants";
import { createdCourse } from "../../actions/userAction";
const Step1 = (props) => {
	const dispatch = useDispatch();
	const { setTabIndex, numberofModules, setNumberOfModules, preset_data ,setPresetData , tvid } = props;
	console.log(preset_data);
	const [coursedetails, setCourseDetails] = useState({
		courseName: "",
		courseDescription: "",
		courseCategory: "",
	});
	const { isCreated, loading: loaded, course } = useSelector((state) => state.createCourse);
	const { isModuleCreated } = useSelector((state) => state.createModule);
	const { isCourseCreated } = useSelector((state) => state.createdCourse);
	// const { isCourseCreated } = useSelector((state) => state.createdCourse);

	const { error, loading, isAuthenticated } = useSelector((state) => state.user);
	const handleChange = (e, type) => {
		let data = { ...preset_data };
		switch (type) {
			case "name":
				data.courseName = e.target.value;
				break;
			case "description":
				data.courseDescription = e.target.value;
				break;

			case "select":
				data.courseCategory = e.target.value;
				break;
			default:
				
				break;
		}
		setPresetData(data);
	};

	useEffect(() => {
		if (preset_data !== undefined) {
			let temp = {
				courseName: preset_data.courseName,
				courseDescription: preset_data.courseDescription,
				courseCategory: preset_data.courseCategory,
				courseImage: "",
			};
			setCourseDetails(temp);
		}
	}, [preset_data]);


	const createCourseButton = async (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("courseName", coursedetails.courseName);
		myForm.set("courseDescription", coursedetails.courseDescription);
		myForm.set("courseCategory", coursedetails.courseCategory);
		myForm.set("courseImage", "");
		console.log(tvid)
		await dispatch(updateCourse(myForm, tvid));
		setTabIndex(1);
	};


	useEffect(() => {
		if (isCreated) {
			let i = 0;
			dispatch({ type: CREATE_COURSE_RESET });
			dispatch(createdCourse());
		}
		if (isCourseCreated) {
			dispatch({ type: CREATED_COURSE_RESET });
		}
	}, [dispatch, isCreated, isCourseCreated]);
	return (
		<>
			<Heading
				w="100%"
				textAlign={"center"}
				fontWeight="normal"
				mb="2%">
				Update Course
			</Heading>
			<form onSubmit={createCourseButton}>
				<FormControl isRequired>
					<Box
						bg="blue.50"
						w="100%"
						p={10}
						borderWidth="1px"
						borderRadius="lg">
						<SimpleGrid>
							<FormControl
								mr="5%"
								isRequired>
								<FormLabel
									htmlFor="Course-name"
									fontWeight={"normal"}>
									Course Name
								</FormLabel>
								<Input
									id="courseName"
									value={preset_data?.courseName}
									onChange={(e) => {
										handleChange(e, "name");
									}}
									placeholder="Course  name"
								/>
							</FormControl>
							<FormControl
								id="description"
								mt={1}
								isRequired>
								<FormLabel
									fontSize="sm"
									fontWeight="md"
									color="gray.700"
									_dark={{
										color: "gray.50",
									}}>
									Description
								</FormLabel>
								<Textarea
									value={preset_data?.courseDescription}
									onChange={(e) => {
										handleChange(e, "description");
									}}
									placeholder="Enter description"
									rows={3}
									shadow="sm"
									focusBorderColor="brand.400"
									fontSize={{
										sm: "sm",
									}}
								/>
							</FormControl>
						</SimpleGrid>
						<SimpleGrid
							paddingTop={"15px"}
							columns={2}>
							<Box
								paddingTop={"5px"}
								paddingRight={"5px"}>
								<FormControl
									isRequired
									as={GridItem}
									colSpan={[6, 3]}>
									<FormLabel
										htmlFor="tag"
										fontSize="sm"
										fontWeight="md"
										color="gray.700"
										_dark={{
											color: "gray.50",
										}}>
										Select Tag
									</FormLabel>
									<Select
										name="tag"
										value={preset_data?.courseCategory}
										onChange={(e) => {
											handleChange(e, "select");
										}}
										autoComplete="tag"
										placeholder="Select option"
										focusBorderColor="brand.400"
										shadow="sm"
										size="sm"
										w="full"
										rounded="md">
										<option value="ETRX">ETRX</option>
										<option value="EXTC">EXTC</option>
										<option value="IT">IT</option>
										<option value="COMPS">COMPS</option>
									</Select>
								</FormControl>
							</Box>
							<Box>
								<FormControl
									id="image"
									mt={1}>
									<FormLabel
										w="full"
										fontSize="sm"
										fontWeight="md"
										color="gray.700"
										_dark={{
											color: "gray.50",
										}}>
										Image Link
									</FormLabel>
									<Textarea
										placeholder="Enter image url"
										rows={1}
										shadow="sm"
										focusBorderColor="brand.400"
										fontSize={{
											sm: "sm",
										}}
									/>
								</FormControl>
							</Box>
						</SimpleGrid>
					</Box>
					<Stack
						padding={"10px"}
						align={"end"}>
						<Box flex={""}>
							<Button type="submit ">Enter Module Data</Button>
						</Box>
					</Stack>
				</FormControl>
			</form>
		</>
	);
};

export default Step1;
