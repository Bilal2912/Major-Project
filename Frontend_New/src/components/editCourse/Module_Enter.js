import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, IconButton, FormControl, FormLabel, HStack, Textarea, Heading, VStack } from "@chakra-ui/react";
import Quiz_form from "./forms/quiz_form";
import Video_Form from "./forms/video_form";
import { useEffect, useState } from "react";
import Quiz_Question from "./forms/quiz_question";
import ModuleName from "./forms/module_name";
import axios from "axios";
import { Plus, Trash } from "tabler-icons-react";
const Module_Edit = (props) => {
	const { moduledata, setModuleData, numberofModules, currentModule, allModules, setAllModules, preset_data, setPresetData } = props;
	let openArr = [];
	for (let i = 0; i < numberofModules; i++) {
		let data = {
			video: true,
			quiz: true,
		};
		openArr.push(data);
	}
	const [openorclose, setOpenOrClose] = useState(openArr);
	const [videocount, setVideoCount] = useState(1);
	const [open, setOpen] = useState(true);
	const [open_module, setOpenModule] = useState(true);
	const [optionopen, setOptionOpen] = useState(false);
	const [videocountmodule, setVideoCountModule] = useState(new Array(numberofModules));
	const [quizcount, setQuizCount] = useState(new Array(numberofModules));
	const [notes, setNotes] = useState(new Array(numberofModules));
	const [module_names, setModuleNames] = useState(new Array(numberofModules));
	var url_string = window.location;
	var url = new URL(url_string);
	var tvid = url.searchParams.get("id");
	let sample = {
		qType: "mcq",
		question: "",
		options: [
			{
				content: "",
				isCorrect: false,
			},
			{
				content: "",
				isCorrect: false,
			},
			{
				content: "",
				isCorrect: false,
			},
			{
				content: "",
				isCorrect: false,
			},
		],
	};
	let sample2 = {
		title: "",
		url: "https://www.youtube.com/watch?v=hSl9NKEY8Eg",
		views: 0,
	};
	const [questiondata, setQuestionData] = useState([sample]);
	const [quizotherdata, setQuizOtherData] = useState([new Array(numberofModules)]);

	// useEffect(() => {
	//   let data = [];
	//   for (let i = 0; i < quizcount[currentModule]; i++) {
	//     data.push(sample);
	//   }
	//   setQuestionData(data);
	// }, [quizcount]);

	// useEffect(() => {
	//   let data = [];
	//   for (let i = 0; i < videocountmodule[currentModule]; i++) {
	//     data.push(sample2);
	//   }
	//   setModuleData(data);
	// }, [videocountmodule]);

	// useEffect(() => {
	//   let temp = [...allModules] ;
	//   temp[currentModule].moduledata = moduledata ;
	//   temp[currentModule].questiondata = questiondata;
	//   temp[currentModule].notes = notes[currentModule];
	//   setAllModules(temp);
	// } , [moduledata , questiondata]);

	// useEffect(() => {

	//   let temp = [...allModules];
	//   temp[currentModule].numberofQuestions = quizotherdata[currentModule].numberofQuestions  ;
	//   temp[currentModule].timelimit = quizotherdata[currentModule].timelimit ;
	//   setAllModules(temp);
	// }, [quizotherdata])

	// useEffect(()=> {
	//     let temp = [...allModules];
	//     temp[currentModule].notes = notes[currentModule];
	//     setAllModules(temp);
	// } ,[notes , currentModule])

	// useEffect(() => {
	//   let data = [...openorclose];
	//   data[currentModule].video = open_module ;
	//   data[currentModule].quiz = open;
	//   setOpenOrClose(data);
	// } ,[open_module , open]);

	// useEffect(() => {
	//   let data = [...openorclose];
	//   if(data[currentModule].video){
	//     setOpenModule(true);
	//   }
	//   if(data[currentModule].quiz){
	//     setOpen(true);
	//   }
	// },[currentModule]);

	// useEffect(() => {
	//   let temp = [...allModules];
	//   temp[currentModule].name = module_names[currentModule];
	//   setAllModules(temp);
	// } , [module_names , currentModule]);

	// useEffect(() => {
	//   let temp = [];
	//   allModules.map((ele , ind) => {
	//     temp.push(ele.id);
	//   })
	//   setModuleNames(temp)
	// }, [allModules]);

	useEffect(() => {
		console.log(preset_data.courses);
	}, [currentModule]);
	return (
		<>
			<VStack w={"100% "}>
				<Heading
					size={"md"}
					alignSelf={"start"}>
					<ModuleName
						preset_data={preset_data}
						setPresetData={setPresetData}
						currentModule={currentModule}
					/>
				</Heading>
				<Accordion
					w={"100%"}
					allowToggle>
					<AccordionItem>
						<AccordionButton>
							<Box
								as="span"
								flex="1"
								textAlign="left">
								Video Links
							</Box>
							<AccordionIcon />
						</AccordionButton>

						<AccordionPanel pb={4}>
							<Accordion allowToggle>
								{preset_data.courses[currentModule].videos.map((ele, index) => {
									return (
										<HStack alignItems={"baseline"}>
											<Box w={"95%"}>
												<AccordionItem>
													<h2>
														<AccordionButton>
															<Box
																as="span"
																flex="1"
																textAlign="left">
																Video {index + 1} Information
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Video_Form
															preset_data={preset_data}
															currentModule={currentModule}
															setPresetData={setPresetData}
															index={index}
														/>
													</AccordionPanel>
												</AccordionItem>
											</Box>
											<Box
												alignItems={"baseline"}
												w={"5%"}>
												<IconButton
													onClick={() => {
														let temp = { ...preset_data };
														temp.courses[currentModule].videos.splice(index, 1);
														setPresetData(temp);
													}}
													variant="outline"
													colorScheme="red"
													icon={
														<Trash
															size={20}
															strokeWidth={2}
														/>
													}></IconButton>
											</Box>
										</HStack>
									);
								})}
							</Accordion>
							<Button
								onClick={() => {
									let temp = { ...preset_data };
									let video = {
										title: "",
										url: "",
									};
									temp.courses[currentModule].videos.push(video);
									setPresetData(temp);
								}}
								leftIcon={
									<Plus
										size={20}
										strokeWidth={2}
										color={"black"}
									/>
								}>
								Add
							</Button>
						</AccordionPanel>
					</AccordionItem>

					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box
									as="span"
									flex="1"
									textAlign="left">
									Quiz Data
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							
								<>
									<Accordion allowToggle>
                    
										{preset_data.courses[currentModule].quizData.qna.map((ele, index) => {
											return (
                        <HStack alignItems={"baseline"}>
                        <Box w={"95%"}>
												<AccordionItem>
													<h2>
														<AccordionButton>
															<Box
																as="span"
																flex="1"
																textAlign="left">
																Question {index + 1}
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Quiz_Question
                              preset_data={preset_data}
															index_main={index}
                              currentModule = {currentModule}
															setPresetData={setPresetData}
														/>
													</AccordionPanel>
												</AccordionItem>
                        </Box>
                        <Box
												alignItems={"baseline"}
												w={"5%"}>
												<IconButton
													onClick={() => {
														let temp = { ...preset_data };
                            temp.courses[currentModule].quizData.numberOfQuestions = temp.courses[currentModule].quizData.numberOfQuestions - 1 ;
														temp.courses[currentModule].quizData.qna.splice(index, 1);
														setPresetData(temp);
													}}
													variant="outline"
													colorScheme="red"
													icon={
														<Trash
															size={20}
															strokeWidth={2}
														/>
													}></IconButton>
											</Box>
                        </HStack>
											);
										})}
									</Accordion>
                  <Button
								onClick={() => {
									let temp = { ...preset_data };
                  temp.courses[currentModule].quizData.numberOfQuestions = temp.courses[currentModule].quizData.numberOfQuestions + 1 ;
                  let quest = {
                    qType: "mcq",
                    question: "",
                    options: [
                        {
                            content: "",
                            isCorrect: true,
                        },
                        {
                            content: "",
                            isCorrect: false,
                        },
                        {
                            content: "",
                            isCorrect: false,
                        },
                        {
                            content: "",
                            isCorrect: false,
                        }
                    ],
                }
                temp.courses[currentModule].quizData.qna.push(quest);
									setPresetData(temp);
								}}
								leftIcon={
									<Plus
										size={20}
										strokeWidth={2}
										color={"black"}
									/>
								}>
								Add
							</Button>
								</>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box
									as="span"
									flex="1"
									textAlign="left">
									Notes
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<FormControl>
								<FormLabel>Enter Notes Link</FormLabel>
								<Textarea
									value={ preset_data.courses[currentModule].notes !== undefined ? preset_data.courses[currentModule].notes : ""}
									onChange={(e) => {
										let data = {...preset_data};
										data.courses[currentModule].notes = e.target.value;
										setPresetData(data);
									}}
									placeholder="Enter notes url"
									rows={1}
									shadow="sm"
									focusBorderColor="brand.400"
									fontSize={{
										sm: "sm",
									}}
								/>
							</FormControl>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</VStack>
		</>
	);
};

export default Module_Edit;
