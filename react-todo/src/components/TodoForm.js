import React, { useState } from 'react';

const TodoForm = ( { addToDo , filterButton} ) => {
	const [ value, setValue ] = useState( '' );

	const onFormSubmit = (event) => {
		event.preventDefault();
		if ( ! value ) return;

		addToDo( value );
		setValue( '' );
	};

	const handleOnChange = ( event ) => {
		return setValue( event.target.value );
	};

	const handleOnClickFilter = (event) =>{

	}


	return (
		<form onSubmit={ onFormSubmit }>
			<label className="form-label">
				Add task:
				<input
					type="text"
					className="form-input"
					placeholder="Enter new task"
					value={value}
					onChange={ handleOnChange }
				/>
			</label>
			<label className="form-label">
				Filter by completing
				<input
					type="checkbox"
					className="form-radio"
					onChange={filterButton}
				/>
			</label>
		</form>
	)
};

export default TodoForm;
