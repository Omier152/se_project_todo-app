import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig} from "../utils/constants.js"
import Todo from  "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
const id = uuidv4();
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date,id };
  const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};
renderTodo(values);
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item)
});


const newTodoValidator= new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

