"use strict";
var _a, _b;
class Block {
    constructor(id, text, data, name, likes = 0, favorites = false, arr = []) {
        this.putLike = (id) => {
            id ? this.likes += 1 : this.likes -= 1;
        };
        this.addToFavorites = () => {
            this.favorites ? this.favorites = false : this.favorites = true;
        };
        this.render1 = () => {
            return (`
        <div class="massage-user id${this.id}">
        <div class="user-avatar">
          <img
            src="https://i.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ"
            width="61px"
            height="61px"
            alt="avatar"
          />
        </div>
        <div class="massage-block">
          <div class="massage-block__data">
            <span class="data-name">${this.name}</span>
            <span class="data-answer-for"></span>
            <div class="data-arrow">
              <img
                class="data-icon"
                src="../src/image/massege-answer.png"
                width="22"
                height="22"
                alt="arrow"
              /><span>${this.name}</span>
            </div>
            <span class="data-message">${this.data}</span>
          </div>
          <p class="massage-text">
            ${this.text}
          </p>
          <div class="massage-footer">
            <div class="data-arrow">
              <img
              class="data-icon"
                src="../src/image/massege-answer.png"
                width="22"
                height="22"
                alt="arrow"
              /><span>Ответить</span>
            </div>
            <div class="data-favorite ${this.favorites ? 'favorites' : null}">
                  В избранное
            </div>
            <div>
              <button class="like-inc like-button">-</button
              ><span class="like-number">${this.likes}</span
              ><button class="like-dec like-button">+</button>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>`);
        };
        this.text = text,
            this.data = data,
            this.name = name,
            this.likes = likes,
            this.favorites = favorites;
        this.id = id;
        this.arr = arr;
    }
}
class Comments {
    constructor(obj) {
        var _a;
        this.addFavorites = (e) => {
            e.target.classList.toggle('favorites');
        };
        this.update = () => {
            const lik = document.querySelectorAll('.data-favorite');
            lik.forEach((el) => el.addEventListener('click', this.addFavorites));
        };
        this.textareaResize = () => {
            if (!this.textarea || !this.buttonAdd || !this.numberLines)
                return;
            if (this.textarea.value.length >= 1) {
                this.numberLines.innerText = `${this.textarea.value.length}/1000`;
                if (this.textarea.value.length > 1000) {
                    this.buttonAdd.classList.remove('button-active');
                }
                else {
                    this.buttonAdd.classList.add("button-active");
                }
            }
            else {
                this.buttonAdd.classList.remove("button-active");
            }
            this.textarea.style.height = "";
            this.textarea.style.height = this.textarea.scrollHeight + "px";
        };
        this.addNewBlock = () => {
            var _a, _b, _c;
            if (!((_a = this.textarea) === null || _a === void 0 ? void 0 : _a.value) || ((_b = this.textarea) === null || _b === void 0 ? void 0 : _b.value.length) > 1000) {
                return;
            }
            if (!this.nameUser)
                return;
            const data = new Date();
            const time = `${data.getDate()}.${data.getMonth() + 1} ${data.getHours()}:${data.getMinutes()}`;
            const newObj = new Block(this.id, (_c = this.textarea) === null || _c === void 0 ? void 0 : _c.value, time, this.nameUser);
            this.textarea.value = "";
            this.textarea.style.height = "";
            this.render([newObj]);
            this.update();
        };
        this.render = (item) => {
            item.forEach((el) => { var _a; return (_a = this.block) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", el.render1()); });
        };
        this.id = 1;
        this.objElement = obj,
            this.block = document.querySelector('.section-message'),
            this.buttonAdd = document.querySelector('.button-comments'),
            this.nameUser = (_a = document.querySelector('.user-name')) === null || _a === void 0 ? void 0 : _a.textContent,
            this.textarea = document.querySelector('.text-comments'),
            this.numberLines = document.querySelector('.number-lines'),
            this.likesButton = document.querySelectorAll('.data-favorite');
    }
}
const main = new Comments([new Block(1, "Тест произведен", "24.11 22:54", "roman Guga"),
    new Block(2, "Да ну", "24.11 22:59", "Kek Guga")]);
main.render(main.objElement);
(_a = main.textarea) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', main.textareaResize);
(_b = main.buttonAdd) === null || _b === void 0 ? void 0 : _b.addEventListener('click', main.addNewBlock);
