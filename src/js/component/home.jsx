import React, { useState, useEffect } from "react";

export function Home() { //TODOlist Function
	const [theList, setList] = useState([]);
	const [userInput, setUserInput] = useState([""]); // First empty userInput

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/testapi")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // Read the response as json.
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				setList(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []); //React Hook for Fetch API

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			setList(theList.concat({ label: userInput, done: false }));

			fetch("https://assets.breatheco.de/apis/fake/todos/user/testapi", {
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
						"https://assets.breatheco.de/apis/fake/todos/user/testapi"
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
			(task, taskIndex) => index != taskIndex
		);
		setList(updatedList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/testapi", {
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
					"https://assets.breatheco.de/apis/fake/todos/user/testapi"
				);
			})
			.catch(error => console.error("Error:", error));
	};
	// create new variable with updated list > filter to check if index matches original index from list. then use setList to update to new list.

	return (
		<div className="container form text-center mt-5">
			<h1>To-Do List</h1>
			<br />

			<div className="container form-group todoList">
				<input
					className="taskInput"
					onChange={event => setUserInput(event.target.value)}
					value={userInput}
					onKeyUp={handleKeyUp}
					placeholder="Add a new task"
					aria-label="Task on the list"
					aria-describedby="basic-addon2"
				/>
				<br />
				<div className="mt-3">
					<ul className="taskGroup container-fluid">
						{theList.map((value, index) => {
							return (
								<li className="list-group-item" key={index}>
									{value.label}
									<button
										type="button"
										onClick={() => itemDelete(index)}
										className="close">
										X
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Home;