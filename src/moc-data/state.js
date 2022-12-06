"use strict";
const trialData = [
    {
        id: 1,
        avatar: 'https://i.picsum.photos/id/75/1999/2998.jpg?hmac=0agRZd8c5CRiFvADOWJqfTv6lqYBty3Kw-9LEtLp_98',
        text: 'Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого "Кольца власти" просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.',
        name: 'Pol',
        data: 15011355,
        likes: 6,
        statusLike: 0,
        favorites: true,
        arr: [{
                id: 2,
                avatar: 'https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI',
                text: 'Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство "фанатов" с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.',
                name: 'Джунбокс3000',
                data: 12011515,
                likes: 3,
                statusLike: 0,
                favorites: false,
            }]
    }
];
class State {
    constructor() {
        this.creatClass = (stat = false) => {
            let historyStore = [];
            const local = localStorage.getItem('comments');
            if (local) {
                historyStore = JSON.parse(local);
                this.store = historyStore;
            }
            const aarr = this.store.map((el) => {
                if (el.arr) {
                    const newArr = el.arr.map((i) => {
                        return new Block(i.id, i.text, i.avatar, i.data, i.name, i.likes, i.statusLike, i.favorites);
                    });
                    return new Block(el.id, el.text, el.avatar, el.data, el.name, el.likes, el.statusLike, el.favorites, newArr);
                }
                else {
                    return new Block(el.id, el.text, el.avatar, el.data, el.name, el.likes, el.statusLike, el.favorites);
                }
            });
            if (stat) {
                const id = JSON.parse(localStorage.getItem('comments-id'));
                if (id === null) {
                    return 101;
                }
                return Number(id);
            }
            return aarr;
        };
        this.saveData = (obj, id) => {
            const aarr = obj.map((el) => {
                if (el.arr !== null) {
                    const newArr = el.arr.map((i) => {
                        return { id: i.id, text: i.text, avatar: i.avatar, data: i.data, name: i.name, likes: i.likes, statusLike: i.statusLike, favorites: i.favorites };
                    });
                    return { id: el.id, text: el.text, avatar: el.avatar, data: el.data, name: el.name, likes: el.likes, statusLike: el.statusLike, favorites: el.favorites, arr: newArr };
                }
                else {
                    return ({ id: el.id, text: el.text, avatar: el.avatar, data: el.data, name: el.name, likes: el.likes, statusLike: el.statusLike, favorites: el.favorites });
                }
            });
            localStorage.setItem('comments', JSON.stringify(aarr));
            localStorage.setItem('comments-id', JSON.stringify(id));
        };
        this.arr = [],
            this.store = trialData;
    }
}
