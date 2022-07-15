import React, { useState, useEffect } from "react";
import Logo from "/src/img/todo-image.png";

export function Home() {
	const [theList, setList] = useState([]);
	const [userInput, setUserInput] = useState([""]); // First empty userInput

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jlhh00")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // Read the response as json.
			})
			.then(function(responseAsJson) {  // Do stuff with the JSON
				setList(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []); //React Hook for Fetch API

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			setList(theList.concat({ label: userInput, done: false }));

			fetch("https://assets.breatheco.de/apis/fake/todos/user/jlhh00", {
				method: "PUT",
				body: JSON.stringify(
					theList.concat({ label: userInput, done: false })
				),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json(); // Read the response as json.
				})
				.then(response => {
					console.log("Success:", response);
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/jlhh00"
					);
				})
				.catch(error => console.error("Error:", error));

			setUserInput("");
		}
	};
	// handleKeyUp from onKeyUp on input text with event passed as default
	// check if event keycode is 13 (enter) and input is not blank to continue
	// use state setList to add concat version of userInput into theList

	const itemDelete = index => {
		var updatedList = theList.filter(
			(close, taskIndex) => index != taskIndex
		);
		setList(updatedList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/jlhh00", {
			method: "PUT",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/jlhh00"
				);
			})
			.catch(error => console.error("Error:", error));
	};
	// create new variable with updated list > filter to check if index matches original index from list. then use setList to update to new list.

const Close = "X";
const taskLeft = theList.filter((li, index) => {return li.done === false})

return (
<div className="container-fluid card">
			<div className="containerLogo">
				<div className="d-flex justify-content-center align-items-center">
						<div className="d-flex logo align-items-center">
							<img src={Logo} />
							<h1 className="d-flex">ToDo List Using API</h1>
						</div>
				</div>
			</div>
			<div className="container-fluid">
				<input
					className="taskInput"
					onChange={event => setUserInput(event.target.value)}
					value={userInput}
					onKeyUp={handleKeyUp}
					placeholder="Add a new task"
					aria-label="Task on the list"
				/>

				<div className="d-flex">
					<ul className="taskGroup container">
						{theList.map((value, index) => {
							return (
								<li className="list-group-item" key={index}>
									{value.label}
									<button
										type="button"
										onClick={() => itemDelete(index)}
										className="close">
										{Close}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="container float-lg-right ListResults">
			<p className="list-left">Tasks left {taskLeft.length}</p>
			</div>
				<div className="footer">
					Made with ❤️ by <a href="https://www.hurtadojose.com">Jose Hurtado</a>
				</div>
		</div>
	);
}

export default Home;