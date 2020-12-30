type taskType = {
    id: string,
    text: string,
};

type taskState = {
    task: string,
    tasks: taskType[],
    editState: editState,
    editId: string
};

enum editState { create, edit };

export { editState };
export type { taskType, taskState };