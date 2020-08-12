import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import LoadMoreButtonView from "./view/load-more-button";
import BoardView from "./view/board";
import SortView from "./view/sort";
import TaskListView from "./view/task-list";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFORE_END);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFORE_END);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFORE_END);
render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTER_BEGIN);

const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFORE_END);
render(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), RenderPosition.BEFORE_END);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.BEFORE_END);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFORE_END);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFORE_END));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
