import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Overview from './components/Overview';
import './App.css';
import { taskState, taskType, editState } from './types/TaskTypes';

type props = {};

class App extends React.Component<props, taskState> {

  constructor(props: props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
      editState: editState.create,
      editId: ''
    };
    this.onDeleteTask.bind(this);
    this.onUpdateTask.bind(this);
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ task: e.target.value });
  }

  onSubmitTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.state.task) return;

    if (this.state.editState === editState.edit) {
      this.updateTask();
      return;
    }
    this.createTask();
  }

  createTask = () => {
    const newTask: taskType = { id: uuidv4(), text: this.state.task };
    this.setState({
      tasks: [...this.state.tasks, newTask],
      task: '',
      editState: editState.create,
      editId: ''
    });
  }

  onDeleteTask = (id: string) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id),
      editState: editState.create,
      task: '',
      editId: ''
    });
  }

  onUpdateTask = (id: string, newText: string) => {
    this.setState({
      editState: editState.edit,
      editId: id,
      task: newText
    });
  }

  updateTask = () => {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === this.state.editId) task.text = this.state.task;
        return task;
      }),
      task: '',
      editState: editState.create,
      editId: ''
    });
  }

  render() {
    const { task, tasks } = this.state;
    return (
      <div className='App'>
        <form className='form' onSubmit={this.onSubmitTask}>
          <div className='row'>
            <label htmlFor="taskInput">Enter task</label>
            <input
              type="text"
              id="taskInput"
              onChange={this.handleInput}
              value={task}
            />
          </div>
          <button type="submit">
            {this.state.editState === editState.create ? 'Add Task' : 'Update Task'}
          </button>
        </form>
        <Overview tasks={tasks} onDelete={this.onDeleteTask} onUpdate={this.onUpdateTask} />
      </div>
    );
  }
}

export default App;
