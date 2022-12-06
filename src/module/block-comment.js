"use strict";
class Block {
    constructor(id, text, avatar, data, name, likes = 0, statusLike = 0, favorites = false, arr = null) {
        this.addFavorites = (target) => {
            target.classList.toggle('favorites');
            if (this.favorites) {
                this.favorites = false;
                target.innerText = 'В избранное';
            }
            else {
                this.favorites = true;
                target.innerText = 'В избранном';
            }
        };
        this.putLike = (id) => {
            const likesNumber = document.querySelector(`.lik${this.id}`);
            if (!likesNumber)
                return;
            switch (this.statusLike) {
                case 0:
                    if (id == '+') {
                        this.likes += 1;
                        this.statusLike++;
                    }
                    else {
                        this.likes -= 1;
                        this.statusLike--;
                    }
                    break;
                case -1:
                    if (id == '+') {
                        this.likes += 1;
                        this.statusLike++;
                    }
                    break;
                case 1:
                    if (id == '-') {
                        this.likes -= 1;
                        this.statusLike--;
                    }
            }
            likesNumber.innerText = String(Math.abs(this.likes));
            this.likes < 0 ? likesNumber.style.color = 'red' : likesNumber.removeAttribute('style');
        };
        this.toogleAnswer = () => {
            const answerBtn = document.getElementById((`answer${this.id}`));
            if (!answerBtn)
                return;
            answerBtn.classList.toggle('answer-ok');
            this.answerStatus ? this.answerStatus = false : this.answerStatus = true;
        };
        this.conversionTime = () => {
            const timeString = String(this.data);
            return (`${timeString.slice(0, 2)}.${timeString.slice(2, 4)} ${timeString.slice(4, 6)}:${timeString.slice(6, 8)}`);
        };
        this.aswerTag = (name = false) => {
            if (typeof (name) == 'string') {
                return (`<div class='data-answer'>
                    ${name}
                </div>`);
            }
            else if (name) {
                return (`<div id=answer${this.id} class='data-answer answer-btn'>
                    Ответить
                </div>`);
            }
            return '';
        };
        this.creatHTML = (name = false) => {
            return (`
        <div class='massage-user'>
            <div class='user-avatar'>
                <img
                    src=${this.avatar}
                    width='61px'
                    height='61px'
                    alt='avatar'
                />
                <span class='data-name'>${this.name}</span>
                ${this.aswerTag(name)}
                <span class='data-message'>${this.conversionTime()}</span>
            </div>
            <div class='massage-block user${this.id}'>
                <p class='massage-text'>
                    ${this.text}
                </p>
                <div class='massage-footer'>
                    ${this.aswerTag(!name)}
                    <div id='favorit${this.id}' class='data-favorite ${this.favorites ? 'favorites' : ''}'>
                        В избранное
                    </div>
                    <div class='block-likes'>
                        <button id='inc${this.id}' class='like-inc like-button'>-</button>
                        <span class='like-number lik${this.id}' ${this.likes < 0 ? 'style="color: red"' : ''}>${Math.abs(this.likes)}</span>
                        <button id='dec${this.id}' class='like-dec like-button'>+</button>
                    </div>
                </div>
            </div>
        </div>`);
        };
        this.render = (name = false) => {
            var _a, _b, _c;
            if (name) {
                const thisBlock = document.querySelector(`.user${this.id}`);
                if (this.arr === null)
                    return;
                if (!thisBlock)
                    return;
                thisBlock.insertAdjacentHTML('beforeend', this.arr[((_a = this.arr) === null || _a === void 0 ? void 0 : _a.length) - 1].creatHTML(this.name));
            }
            else {
                (_b = this.block) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('beforeend', this.creatHTML());
                const thisBlock = document.querySelector(`.user${this.id}`);
                if (thisBlock && this.arr) {
                    (_c = this.arr) === null || _c === void 0 ? void 0 : _c.forEach((el) => {
                        thisBlock.insertAdjacentHTML('beforeend', el.creatHTML(this.name));
                    });
                }
            }
        };
        this.text = text,
            this.data = data,
            this.name = name,
            this.likes = likes,
            this.favorites = favorites,
            this.avatar = avatar,
            this.id = id,
            this.arr = arr,
            this.statusLike = statusLike,
            this.block = document.querySelector('.section-message'),
            this.answerStatus = false;
    }
}
