"use strict";
class SectionAddBlock {
    constructor() {
        this.writeNumber = (num = undefined) => {
            if (!this.numberLines)
                return;
            if (!num) {
                this.numberLines.innerText = `Макс. 1000 символов`;
            }
            else {
                this.numberLines.innerText = `${num}/1000`;
                if (num > 1000) {
                    this.numberLines.style.color = 'red';
                }
                else {
                    this.numberLines.removeAttribute('style');
                }
            }
        };
        this.textAreaResize = () => {
            var _a, _b, _c;
            if (!this.textArea)
                return;
            const valueLength = this.textArea.value.length;
            if (valueLength >= 1) {
                this.writeNumber(valueLength);
                if (valueLength > 1000) {
                    (_a = this.buttonAdd) === null || _a === void 0 ? void 0 : _a.classList.add('number-lines--danger');
                    this.toggleButton(false);
                }
                else {
                    this.toggleButton(true);
                    (_b = this.buttonAdd) === null || _b === void 0 ? void 0 : _b.classList.remove('number-lines--danger');
                }
            }
            else {
                this.writeNumber();
                this.toggleButton(false);
                (_c = this.buttonAdd) === null || _c === void 0 ? void 0 : _c.classList.remove('number-lines--danger');
            }
            this.textArea.style.height = "";
            this.textArea.style.height = this.textArea.scrollHeight + 'px';
        };
        this.toggleButton = (id = true) => {
            if (!this.buttonAdd)
                return;
            id ? this.buttonAdd.classList.add('button-active') : this.buttonAdd.classList.remove('button-active');
        };
        this.textArea = document.querySelector('.text-comments'),
            this.buttonAdd = document.querySelector('.button-comments'),
            this.numberLines = document.querySelector('.number-lines');
    }
}
