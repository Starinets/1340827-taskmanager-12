import AbstractView from "./abstract";

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

export default class TaskList extends AbstractView {
  getTemplate() {
    return createTaskListTemplate();
  }
}
