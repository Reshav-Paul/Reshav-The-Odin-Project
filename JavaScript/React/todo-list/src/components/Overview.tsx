import React from "react";
import { taskType } from '../types/TaskTypes';

type propType = {
	tasks: taskType[],
	onDelete: (id: string) => void,
	onUpdate: (id: string, newText: string) => void
};

const Overview: React.FC<propType> = function ({ tasks, onDelete, onUpdate }) {
	return <div className='overview'>
		<h3>Overview of All Tasks</h3>
        <ul>
			{tasks.map((task) => {
				return (
						<li key={task.id} className='task'>
							<p>{task.text}</p>
							<button onClick = {e => onDelete(task.id)}>Delete</button>
							<button onClick = {e => onUpdate(task.id, task.text)} >Update</button>
						</li>
					);
			})
			}
		</ul>
	</div>
}

export default Overview;