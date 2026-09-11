import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig} from "../utils/constants.js"
import Todo from  "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForms from '../components/PopupWithForms.js';
import Section from '../components/Section.js';
import TodoCounter from '../components/TodoCounter.js';


const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
}); 



const addTodoPopup = new PopupWithForms({
  popupSelector:"#add-todo-popup",
  handleFormSubmit: (inputValues) => {

  },
});
addTodoPopup.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();


const openModal = (modal) => {
 modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(completed){
  todoCounter.updateCompleted(completed);
};

function handleDelete(){
  if(completed){
    todoCounter.updateCompleted(false);
  }
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template" , handleCheck, handleDelete);
  return todo.getView();
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const id = uuidv4();
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date, id };
  renderTodo(values);
  addTodoPopup.close();
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

