import React, { useState } from "react";
const Quiz = (props) => {
	// console.log(props);
	const { quizdata } = props;

	const [questionArray, setQuestionArray] = useState(quizdata.question);
	const [qno, setQno] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * quizdata.question.length) + 1);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const handleAnswerOptionClick = (isCorrect, number) => {
		if (isCorrect) {
			setScore(score + 1);
		}
		setQno(qno + 1);
		nextQuestion(number);
	};

	const nextQuestion = (number) => {
		const Qnext = Math.floor(Math.random() * (quizdata.numberofquests - qno)) + 1;
		setQuestionArray((current) => current.filter((_, index) => index !== number));
		setCurrentQuestion(Qnext);
		if (qno === quizdata.numberofquests - 1) {
			setShowScore(true);
		}
	};
	console.log(quizdata);
	return (
		<div className='app text-white'>
			{showScore  ? (
				<div className='score-section text-xl font-semibold'>
					You scored {score} out of {quizdata.numberofquests}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count text-2xl'>
							<span>Question {qno + 1}</span>/{quizdata.numberofquests}
						</div>
						<div className='question-text mt-3 text-xl'>{questionArray[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questionArray[currentQuestion].answerOptions.map((answerOption) => (
						<button className='block bg-zinc-500 hover:bg-stone-600 w-1/2 mt-3 mb-3 text-xl text-left py-1 px-3 rounded-md font-semibold' onClick={() => handleAnswerOptionClick(answerOption.isCorrect , currentQuestion)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
		
	);
};

export default Quiz;
