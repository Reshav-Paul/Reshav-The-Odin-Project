const taskFactory = function(_name, _dueDate, _priority, _isBookmarked) {
    let _description = '';
    let _isComplete = false;
    const setBookmark = value => _isBookmarked = value;
    const setCompletion = value => _isComplete = value;
    const setDescription = text => _description = text;
    const setName = name => _name = name;
    const setDueDate = date => _dueDate = date;
    const setPriority = value => _priority = value;

    const getBookmark = () => _isBookmarked;
    const getCompletion = () => _isComplete;
    const getDescription = () => _description;
    const getName = () => _name;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;

    return {
        setBookmark,
        setCompletion,
        setDescription,
        setDueDate,
        setPriority,
        setName,
        getBookmark,
        getCompletion,
        getDescription,
        getDueDate,
        getPriority,
        getName
    };
};

const projectFactory = function(_id, _name, _creationDate = '') {
    let _tasks = [];
    const addTask = todo => _tasks.push(todo);
    const deleteTask = todo => _tasks = todos.filter(e => e !== todo);
    const getTasks = () => _tasks;
    const setName = name => _name = name;
    const setCreationDate = date => _creationDate = date;
    const getName = () => _name;
    const getCreationDate = () => _creationDate;
    const getID = () => _id;

    return {
        getID,
        addTask,
        deleteTask,
        getTasks,
        setName,
        setCreationDate,
        getName,
        getCreationDate
    };
}

const priorities = Object.freeze({'low': 0, 'medium': 1, 'high': 2});

export {projectFactory, taskFactory, priorities};