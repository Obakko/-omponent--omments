"use strict";
class SortList {
    constructor() {
        this.changeStatusOrder = () => {
            var _a;
            this.order ? this.order = false : this.order = true;
            (_a = this.buttonSort) === null || _a === void 0 ? void 0 : _a.classList.toggle('button_order');
        };
        this.clearHTML = () => {
            if (!this.block)
                return;
            this.block.innerHTML = '';
        };
        this.sortFavorits = (arr) => {
            this.clearHTML();
            const newArr = arr.filter((el) => {
                var _a;
                const test = (_a = el.arr) === null || _a === void 0 ? void 0 : _a.findIndex((elem) => { if (elem.favorites) {
                    return true;
                } });
                if (test || test === 0) {
                    if (test > -1)
                        return true;
                }
                if (el.favorites)
                    return true;
            });
            return newArr;
        };
        this.quickSortLikes = (arr, func = this.maxLike) => {
            if (arr.length < 2)
                return arr;
            let left = [];
            let right = [];
            let center = Math.floor(arr.length / 2);
            for (let i = 0; arr.length > i; i++) {
                if (center === i)
                    continue;
                let status;
                if (this.order) {
                    status = func(arr[center]) < func(arr[i]);
                }
                else {
                    status = func(arr[center]) > func(arr[i]);
                }
                if (status) {
                    left.push(arr[i]);
                }
                else {
                    right.push(arr[i]);
                }
            }
            return [...this.quickSortLikes(left), arr[center], ...this.quickSortLikes(right)];
        };
        this.maxLike = (obj) => {
            var _a;
            let thisLike = obj.likes;
            if (obj.arr !== null) {
                const maxLikesInArr = (_a = obj.arr) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => a.likes > b.likes ? a : b);
                if (thisLike > maxLikesInArr.likes) {
                    return thisLike;
                }
                else {
                    return maxLikesInArr === null || maxLikesInArr === void 0 ? void 0 : maxLikesInArr.likes;
                }
            }
            else {
                return thisLike;
            }
        };
        this.maxTime = (obj) => {
            var _a;
            let thisTime = obj.data;
            if (obj.arr !== null) {
                const maxTime = (_a = obj.arr) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => a.data > b.data ? a : b);
                if (thisTime > maxTime.data) {
                    return thisTime;
                }
                else {
                    return maxTime === null || maxTime === void 0 ? void 0 : maxTime.data;
                }
            }
            else {
                return thisTime;
            }
        };
        this.maxAnswer = (obj) => {
            if (obj.arr == null)
                return 0;
            return obj.arr.length;
        };
        this.maxActual = (obj) => {
            return obj.id;
        };
        this.elementSort = document.querySelector('.sort-list--visability'),
            this.elementView = document.querySelector('.sort-comments__list'),
            this.buttonSort = document.querySelector('.sort-comments__button'),
            this.buttonFavorites = document.querySelector('.sort-comments__favorites'),
            this.block = document.querySelector('.section-message'),
            this.order = true;
    }
}
