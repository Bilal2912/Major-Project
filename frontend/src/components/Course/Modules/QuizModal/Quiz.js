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
		// <>
		// 	<button
		// 		type="button"
		// 		data-modal-target="crypto-modal"
		// 		data-modal-toggle="crypto-modal"
		// 		class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
		// 		Connect wallet
		// 	</button>

		// 	<div
		// 		id="crypto-modal"
		// 		tabindex="-1"
		// 		aria-hidden="true"
		// 		class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
		// 		<div class="relative w-full h-full max-w-md md:h-auto">
		// 			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
		// 				<button
		// 					type="button"
		// 					class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
		// 					data-modal-hide="crypto-modal">
							
		// 					<span class="sr-only">Close modal</span>
		// 				</button>
		// 				<div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
		// 					<h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">Connect wallet</h3>
		// 				</div>
		// 				<div class="p-6">
		// 					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
		// 					<ul class="my-4 space-y-3">
		// 						<li>
		// 							<a
		// 								href="#"
		// 								class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
										
		// 								<span class="flex-1 ml-3 whitespace-nowrap">MetaMask</span>
		// 								<span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
		// 							</a>
		// 						</li>
		// 						<li>
		// 							<a
		// 								href="#"
		// 								class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
										
		// 								<span class="flex-1 ml-3 whitespace-nowrap">Coinbase Wallet</span>
		// 							</a>
		// 						</li>
		// 						<li>
		// 							<a
		// 								href="#"
		// 								class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
										
		// 								<span class="flex-1 ml-3 whitespace-nowrap">Opera Wallet</span>
		// 							</a>
		// 						</li>
		// 						<li>
		// 							<a
		// 								href="#"
		// 								class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
										
		// 								<span class="flex-1 ml-3 whitespace-nowrap">WalletConnect</span>
		// 							</a>
		// 						</li>
		// 						<li>
		// 							<a
		// 								href="#"
		// 								class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
										
		// 								<span class="flex-1 ml-3 whitespace-nowrap">Fortmatic</span>
		// 							</a>
		// 						</li>
		// 					</ul>
		// 					<div>
		// 						<a
		// 							href="#"
		// 							class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
									
		// 							Why do I need to connect with my wallet?
		// 						</a>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </>
	);
};

export default Quiz;
