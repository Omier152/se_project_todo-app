import Popup from "./Popup.js";

class PopupWithForm extends Popup{
    constructor({popupSelector , handleFormSubmit}){
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
}

_getInputValues(){
this._inputList = this._popupForm.querySelectorAll(".popup__input");
const inputValues = {};
this._inputList.forEach((input) => {
inputValues[input.name] = input.value;

});
return inputValues
}

setEventListeners(){
super.setEventListeners();
this._popupForm.addEventListener("submit", (evt) => {
this._handleFormSubmit(evt);
const inputValues = this._getInputValues();
});

}
}

export default PopupWithForm;