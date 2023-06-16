import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Center, Divider, HStack, Card, CardHeader, CardBody, CardFooter, Text, VStack, Heading, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Module_Edit from "./Module_Enter";
import { Plus, Trash } from "tabler-icons-react";
import axios from "axios";
const Step2 = (props) => {
	const { numberofModules, setNumberOfModules, payload, setPayload, modules, preset_data, setPresetData, tvid } = props;

	const [modulearr, setModuleArr] = useState([]);
	const [currentModule, setCurrentModule] = useState(0);
	const { isCreated, course } = useSelector((state) => state.createCourse);
	return (
		<>
			<Heading
				paddingBottom={"10px"}
				size={"sm"}>
				{course?.courseName}
			</Heading>
			<Grid
				templateColumns="repeat(5, 1fr)"
				gap={6}>
				<GridItem colSpan={1}>
					<VStack align={"stretch"}>
						{preset_data.courses.map((ele, index) => (
							<Box
								as={"button"}
								onClick={() => {
									setCurrentModule(index);
								}}>
								<Card
									spacing={2}
									variant={currentModule === index ? "filled" : "elevated"}>
									<CardBody>
										<Center>
											<HStack>
												<Text>{ele?.name}</Text>
												<IconButton
													icon={<Trash />}
													onClick={async () => {
                            console.log(preset_data.courses[index]._id)
                            let temp = { ...preset_data };
														temp.courses.splice(index, 1);
                            console.log(temp.courses)
														if(ele._id !== undefined){
															await axios.delete(`http://localhost:4000/api/v1/adminNprof/modules/delete/${ele._id}`);
                              setPresetData(temp)
                            }
                            else {
                              setPresetData(temp)
                            }
													}}></IconButton>
											</HStack>
										</Center>
									</CardBody>
								</Card>
							</Box>
						))}
						<Box
							as={"button"}
							onClick={() => {
								// setCurrentModule(index);
								// setNumberOfModules(numberofModules + 1)
							}}>
							<Card
								spacing={2}
								variant={"elevated"}>
								<CardBody>
									<IconButton
										borderRadius={"xl"}
										icon={<Plus />}
										onClick={() => {
											let temp = { ...preset_data };
											let data = {
												quizData: {
													level: 1,
													numberOfQuestions: 1,
													timeLimit: 120,
													qna: [],
												},
												courseId: `${tvid}`,
												name: `Modules ${preset_data.courses.length + 1}`,
												videos: [],
												notes: "",
											};
											temp.courses.push(data);
											setPresetData(temp);
										}}></IconButton>
								</CardBody>
							</Card>
						</Box>
					</VStack>
				</GridItem>

				<GridItem colSpan={4}>
					<HStack
						direction={"row "}
						align={"stretch"}>
						<Divider
							size={"5px"}
							orientation="vertical"
						/>
						<Module_Edit
							numberofModules={numberofModules}
							currentModule={currentModule}
							preset_data={preset_data}
							setPresetData={setPresetData}
						/>
					</HStack>
				</GridItem>
			</Grid>
		</>
	);
};

export default Step2;
