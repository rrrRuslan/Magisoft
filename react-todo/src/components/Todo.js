import React, { useState } from 'react';
import Item from './Item';
import TodoForm from "./TodoForm";

const Todo = () => {

	const initialState = [
		{
			text: 'First task',
			isCompleted: false
		},
		{
			text: 'Second  task',
			isCompleted: false
		},
		{
			text: 'Third  task',
			isCompleted: false
		},
	];

	const [ todos, setTodos ] = useState( initialState );

	const addToDo = ( text ) => {
		const newToDos = [ ...todos, { text } ];
		setTodos( newToDos );
	};

	const filterButton = (event) =>{
		// event.target.checked
		const newToDos = [ ...todos ];
		const res = [];
		for(let i = 0 ; i<newToDos.length; i++){
			if(!newToDos[i].isCompleted){
				res.push(newToDos[i]);
			}
		}
		setTodos( res );
	}

	const handleItemClick = ( index ) => {
		const newTodos = [ ...todos ];

		newTodos[index].isCompleted = !newTodos[index].isCompleted;

		setTodos( newTodos );
	};

	const handleRemoveClick = ( index ) => {
		const newTodos = [ ...todos ];

		newTodos.splice( index, 1 );

		setTodos( newTodos );
	};


	return (
		<React.Fragment>
			<div className="todo-container">
				<h2 className="main-heading">Todo App</h2>
				<TodoForm addToDo={addToDo} filterButton={filterButton}/>

				<div className="todo-list">
					{ todos.length ? (
						todos.map( ( item, index ) => (
							<Item
								key={`${ item.text }-${ index }`}
								todo={ item }
								index={ index }
								handleItemClick={ handleItemClick }
								handleRemoveClick={handleRemoveClick}
							/>
						) )
					) : '' }
				</div>
			</div>
		</React.Fragment>
	);
};


export default Todo;

