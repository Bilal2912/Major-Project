import { FormControl, Box, Button, FormLabel, Grid, GridItem, Input, HStack, SimpleGrid, Switch, Radio, RadioGroup, Stack, Text, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const Quiz_Question = (props) => {
	const { preset_data, setPresetData, currentModule, index_main } = props;
	const [question, setQuestion] = useState(preset_data.courses[currentModule].quizData.qna[index_main]);
	const [checkedItems, setCheckedItems] = useState([true, false, false, false]);
	const handleInputChange = (e, index, type) => {
		let data = e.target.value;
		let temp = { ...question };
		switch (type) {
			case "question":
				temp.question = data;
				break;
			case "option":
				temp.options[index].content = data;
				break;
			default:
				console.log(data);
		}
		setQuestion(temp);
	};
	useEffect(() => {
		let temp = { ...preset_data };
		preset_data.courses[currentModule].quizData.qna[index_main] = question;
		setPresetData(temp);
	}, [question]);
	useEffect(() => {
		setQuestion(preset_data.courses[currentModule].quizData.qna[index_main]);
	}, [currentModule]);
	const [value, setValue] = useState("1");

	const changeSelect = (e) => {
		let temp = { ...question };
		// console.log(temp , e);
		if (value === "1") {
			temp.qType = "scq";
			//////////////////////////////// LOGIC CONFUSION
		} else {
			temp.qType = "mcq";
		}
		setQuestion(temp);
	};
	useEffect(() => {
		let temp = { ...question };
		let counter = 0;
		checkedItems.map((ele, index) => {
			counter = ele ? counter + 1 : counter;
			temp.options[index].isCorrect = ele;
		});
		temp.qType = counter >= 2 ? "mcq" : "scq";
		setQuestion(temp);
	}, [checkedItems]);
	const changeValue = (e, index) => {
    console.log(e)
		let temp = [...checkedItems];
		temp[index] = e.target.checked;
		setCheckedItems(temp);
	};
	return (
		<>
			<FormControl>
				<Grid templateRows={"repeat(2, 1fr)"}>
					<GridItem>
						<FormLabel> Question Content </FormLabel>
						<Input
							name={"question_" + index_main}
							value={question.question}
							onChange={(e) => {
								handleInputChange(e, index_main, "question");
							}}
						/>
					</GridItem>
					<GridItem w="100%">
						<FormLabel> Image Link </FormLabel>
						<HStack>
							<Input
								name={"question_image" + index_main}
								// value={question[index_main].question}
								// onChange={e => {
								//   handleInputChange(e,  index_main , "image");
								// }}
							/>
							{/* <>
                <RadioGroup
                  onChange={e => {
                    setValue(e)
                    changeSelect(e, index_main);
                  }}
                  value={value}
                >
                  <FormLabel>Question Type </FormLabel>
                  <Stack direction="row">
                    <Radio value="1">SCQ</Radio>
                    <Radio value="2">MCQ</Radio>
                  </Stack>
                </RadioGroup>
              </> */}
						</HStack>
					</GridItem>
				</Grid>
				<SimpleGrid columns={2}>
					<CheckboxGroup>
						{question.options.map((ele, index) => {
							return (
								<>
									<HStack p = {'10px'}>
										<FormLabel w = {'50%'}>Option {index + 1}</FormLabel>
										<Input
											w={"40%"}
											value={ele.content}
											onChange={(e) => {
												handleInputChange(e, index, "option");
											}}
										/>
										{/* <Checkbox
											size="lg"
											isChecked={checkedItems[index]}
											onChange={(e) => {
												changeValue(e, index);
											}}>
											Right Answer
										</Checkbox> */}
										<FormControl
											display="flex"
											alignItems="center">
											<FormLabel
												mb="0">
												Correct ?  
											</FormLabel>
											<Switch onChange={(e) => {
												changeValue(e, index);
											}} />
										</FormControl>
									</HStack>
								</>
							);
						})}
					</CheckboxGroup>
				</SimpleGrid>
			</FormControl>
		</>
	);
};

export default Quiz_Question;
