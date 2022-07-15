import React, { useState, useEffect } from "react";
import Logo from "/src/img/todo-image.png";
import TrashCan from "/src/img/trash-can-solid.svg"

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

const taskLeft = theList.filter((li, index) => {return li.done === false})
// const Close = "X";

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
										<svg className="trashCan" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
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