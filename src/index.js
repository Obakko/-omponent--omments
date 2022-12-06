"use strict";
class Comments {
    constructor(name) {
        this.extractId = (item) => {
            var _a;
            const idRegExp = /([0-9]+)/g;
            return Number((_a = item.match(idRegExp)) === null || _a === void 0 ? void 0 : _a.join(''));
        };
        this.sortElement = (e) => {
            const target = e.target;
            let idSort = this.extractId(target.id);
            const textTarget = target.innerText;
            const activeSort = document.querySelector('.list-active');
            console.log(idSort);
            if (isNaN(idSort))
                return;
            if (idSort && idSort !== 123) {
                activeSort.classList.remove('list-active');
                target.classList.add('list-active');
            }
            else {
                idSort = this.extractId(activeSort.id);
                this.sort.changeStatusOrder();
            }
            if (this.sort.elementView && textTarget !== '')
                this.sort.elementView.innerText = textTarget;
            this.sort.clearHTML();
            switch (idSort) {
                case 2:
                    this.objElement = this.sort.quickSortLikes(this.objElement);
                    break;
                case 1:
                    this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxTime);
                    break;
                case 4:
                    this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxAnswer);
                    break;
                case 3:
                    this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxActual);
                    break;
            }
            this.render();
            this.update();
        };
        this.sortFavorite = () => {
            if (this.favoriteSort) {
                this.sort.clearHTML();
                this.render();
                this.favoriteSort = false;
            }
            else {
                const sortArr = this.sort.sortFavorits(this.objElement);
                this.render(sortArr);
                this.favoriteSort = true;
            }
            this.update();
        };
        this.giveResult = () => {
            var _a, _b;
            const addTime = () => {
                const d = new Date();
                let hours = d.getHours();
                let minute = d.getMinutes();
                if (String(hours) === '0' || String(hours).length === 1)
                    hours = '0' + String(hours);
                if (String(minute) === '0' || String(minute).length === 1)
                    minute = '0' + String(minute);
                return Number([d.getDate(), d.getMonth() + 1, hours, minute].join(''));
            };
            if (!((_a = this.sectionAria.textArea) === null || _a === void 0 ? void 0 : _a.value) || ((_b = this.sectionAria.textArea) === null || _b === void 0 ? void 0 : _b.value.length) > 1000)
                return;
            const value = this.sectionAria.textArea.value;
            this.sectionAria.textArea.value = '';
            this.sectionAria.textArea.style.height = '';
            this.sectionAria.toggleButton(false);
            return { id: this.id, avatar: this.avatar, text: value, name: this.name, data: addTime() };
        };
        this.addNewBlock = () => {
            var _a;
            if (!this.name)
                return;
            const state = this.giveResult();
            if (!state)
                return;
            const indxAnsw = this.objElement.findIndex((el) => el.answerStatus);
            if (indxAnsw < 0) {
                this.objElement.push(new Block(state.id, state.text, state.avatar, state.data, state.name));
                const indx = this.objElement.length - 1;
                this.objElement[indx].render();
            }
            else {
                if (!this.objElement[indxAnsw].arr)
                    this.objElement[indxAnsw].arr = [];
                (_a = this.objElement[indxAnsw].arr) === null || _a === void 0 ? void 0 : _a.push(new Block(state.id, state.text, state.avatar, state.data, state.name));
                this.objElement[indxAnsw].render(true);
                this.objElement[indxAnsw].toogleAnswer();
            }
            this.sectionAria.writeNumber();
            this.id++;
            this.update();
            new State().saveData(this.objElement, this.id);
        };
        this.toogleAnswer = (e) => {
            const target = e.target;
            const idx = this.extractId(target.id);
            const idxObj = this.objElement.findIndex((el) => el.id == idx ? true : false);
            const idxTrue = this.objElement.findIndex((el) => el.answerStatus);
            if (idxTrue > -1)
                this.objElement[idxTrue].toogleAnswer();
            if (idxTrue == idxObj) {
                return;
            }
            else {
                this.objElement[idxObj].toogleAnswer();
            }
        };
        this.likeElement = (e) => {
            const target = e.target;
            const text = target.innerText;
            const idx = this.extractId(target.id);
            let idxObj = this.objElement.findIndex((el) => el.id == idx ? true : false);
            if (idxObj < 0) {
                this.objElement.forEach((el) => {
                    if (el.arr) {
                        el.arr.forEach((i) => {
                            if (i.id === idx) {
                                i.putLike(text);
                            }
                        });
                    }
                });
            }
            else {
                this.objElement[idxObj].putLike(text);
            }
            new State().saveData(this.objElement, this.id);
        };
        this.addFavorites = (e) => {
            const target = e.target;
            const text = target.innerText;
            const idx = this.extractId(target.id);
            let idxObj = this.objElement.findIndex((el) => el.id == idx ? true : false);
            if (idxObj < 0) {
                this.objElement.forEach((el) => {
                    if (el.arr) {
                        el.arr.forEach((i) => {
                            if (i.id === idx) {
                                i.addFavorites(target);
                            }
                        });
                    }
                });
            }
            else {
                this.objElement[idxObj].addFavorites(target);
            }
            new State().saveData(this.objElement, this.id);
        };
        this.render = (arr = this.objElement) => {
            arr.forEach((el) => {
                el.render();
            });
        };
        this.update = () => {
            if (this.amountComments)
                this.amountComments.innerText = `(${this.objElement.length})`;
            const eventForElement = (el) => {
                const favoriteBtn = document.getElementById(`favorit${el.id}`);
                const likeInc = document.getElementById(`inc${el.id}`);
                const likeDec = document.getElementById(`dec${el.id}`);
                const answerBtn = document.getElementById(`answer${el.id}`);
                if (!favoriteBtn)
                    return;
                favoriteBtn.addEventListener('click', this.addFavorites);
                if (!likeDec && !likeInc)
                    return;
                likeInc === null || likeInc === void 0 ? void 0 : likeInc.addEventListener('click', this.likeElement);
                likeDec === null || likeDec === void 0 ? void 0 : likeDec.addEventListener('click', this.likeElement);
                if (!answerBtn)
                    return;
                answerBtn === null || answerBtn === void 0 ? void 0 : answerBtn.addEventListener('click', this.toogleAnswer);
            };
            this.objElement.forEach((block) => {
                if (block.arr)
                    block.arr.forEach((i) => eventForElement(i));
                eventForElement(block);
            });
        };
        this.creatEvent = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            (_b = (_a = this.sectionAria) === null || _a === void 0 ? void 0 : _a.buttonAdd) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.addNewBlock);
            (_d = (_c = this.sectionAria) === null || _c === void 0 ? void 0 : _c.textArea) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', this.sectionAria.textAreaResize);
            (_e = this.sort.buttonFavorites) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.sortFavorite);
            (_f = this.sort.elementSort) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.sortElement);
            (_g = this.sort.buttonSort) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.sortElement);
        };
        this.start = () => {
            let userText = document.querySelector('.user-name');
            if (!userText)
                return;
            userText.textContent = this.name;
            this.render();
            this.creatEvent();
            this.update();
        };
        this.id = new State().creatClass(true),
            this.objElement = new State().creatClass(),
            this.sectionAria = new SectionAddBlock(),
            this.sort = new SortList(),
            this.amountComments = document.querySelector('.heading-comments--number');
        this.avatar = 'https://picsum.photos/seed/picsum/200',
            this.name = name,
            this.favoriteSort = false;
    }
}
const main = new Comments('Roman Obakko');
main.start();
