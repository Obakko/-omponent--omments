
class Comments {
    objElement: Array<Block>;
    nameUser: string | null | undefined;
    id: number;
    sectionAria: SectionAddBlock;
    name: string;
    avatar: string;
    sort: SortList;
    favoriteSort: boolean;
    amountComments: HTMLElement | null

    constructor(name: string,) {
        this.id = <number>new State().creatClass(true),
        this.objElement = <Block[]>new State().creatClass(),
        this.sectionAria = new SectionAddBlock(),
        this.sort = new SortList(),
        this.amountComments = document.querySelector('.heading-comments--number')
        this.avatar = 'https://picsum.photos/seed/picsum/200',
        this.name = name,
        this.favoriteSort = false

    }

    extractId = (item: string): number => {
        const idRegExp: RegExp = /([0-9]+)/g;
        return Number(item.match(idRegExp)?.join(''));
    }

    sortElement = (e: Event): void => {
        const target: HTMLElement = <HTMLElement>e.target
        let idSort: number = this.extractId(target.id)
        const textTarget = target.innerText
        const activeSort: HTMLElement = <HTMLElement>document.querySelector('.list-active')
        console.log(idSort)
        if(isNaN(idSort))return
        if (idSort && idSort!==123) {
            activeSort.classList.remove('list-active')
            target.classList.add('list-active')
        } else {
            idSort = this.extractId(activeSort.id)
            this.sort.changeStatusOrder()
        }
        if (this.sort.elementView && textTarget !== '') this.sort.elementView.innerText = textTarget
        this.sort.clearHTML()
        switch (idSort) {
            case 2:
                this.objElement = this.sort.quickSortLikes(this.objElement)
                break;
            case 1:
                this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxTime)
                break;
            case 4:
                this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxAnswer)
                break;
            case 3:
                this.objElement = this.sort.quickSortLikes(this.objElement, this.sort.maxActual)
                break;
        }
        this.render()
        this.update()
    }

    sortFavorite = (): void => {
        if (this.favoriteSort) {
            this.sort.clearHTML()
            this.render()
            this.favoriteSort = false
        } else {
            const sortArr = <Block[]>this.sort.sortFavorits(this.objElement)
            this.render(sortArr)
            this.favoriteSort = true
        }
        this.update()
    }

    giveResult = (): MocData | undefined => {
        const addTime = (): number => {
            const d = new Date()
            let hours: number | string = d.getHours()
            let minute: number | string = d.getMinutes()
            if (String(hours) === '0' || String(hours).length === 1) hours = '0' + String(hours)
            if (String(minute) === '0' || String(minute).length === 1) minute = '0' + String(minute)
            return Number([d.getDate(), d.getMonth() + 1, hours, minute].join(''))
        }
        if (!this.sectionAria.textArea?.value || this.sectionAria.textArea?.value.length > 1000) return
        const value = this.sectionAria.textArea.value
        this.sectionAria.textArea.value = ''
        this.sectionAria.textArea.style.height = ''
        this.sectionAria.toggleButton(false)
        return { id: this.id, avatar: this.avatar, text: value, name: this.name, data: addTime() }
    }
    addNewBlock = (): void => {
        if (!this.name) return
        const state = this.giveResult()
        if (!state) return
        const indxAnsw = this.objElement.findIndex((el) => el.answerStatus)
        if (indxAnsw < 0) {
            this.objElement.push(new Block(state.id, state.text, state.avatar, state.data, state.name))
            const indx = this.objElement.length - 1
            this.objElement[indx].render()
        } else {
            const newArr = this.objElement[indxAnsw].arr
            if (!newArr) return
            newArr.push(new Block(state.id, state.text, state.avatar, state.data, state.name))
            this.objElement[indxAnsw].render(true)
            this.objElement[indxAnsw].toogleAnswer()
        }
        this.sectionAria.writeNumber()
        this.id++
        this.update()
        new State().saveData(this.objElement, this.id)
    }

    toogleAnswer = (e: Event): void => {
        const target: HTMLElement = <HTMLElement>e.target
        const idx = this.extractId(target.id)
        const idxObj = this.objElement.findIndex((el) => el.id == idx ? true : false)
        const idxTrue = this.objElement.findIndex((el) => el.answerStatus)
        if (idxTrue > -1) this.objElement[idxTrue].toogleAnswer()
        if (idxTrue == idxObj) {
            return
        } else {
            this.objElement[idxObj].toogleAnswer()
        }
    }
    likeElement = (e: Event): void => {
        const target: HTMLElement = <HTMLElement>e.target
        const text: string = target.innerText
        const idx = this.extractId(target.id)
        let idxObj: number | Array<number> = this.objElement.findIndex((el) => el.id == idx ? true : false)
        if (idxObj < 0) {
            this.objElement.forEach((el) => {
                if (el.arr) {
                    el.arr.forEach((i) => {
                        if (i.id === idx) {
                            i.putLike(text)
                        }
                    })
                }
            })
        }else{this.objElement[idxObj].putLike(text)}
        new State().saveData(this.objElement, this.id)
    }
    addFavorites = (e: Event): void => {
        const target: HTMLElement = <HTMLElement>e.target
        const text: string = target.innerText
        const idx = this.extractId(target.id)
        let idxObj: number | Array<number> = this.objElement.findIndex((el) => el.id == idx ? true : false)
        if (idxObj < 0) {
            this.objElement.forEach((el) => {
                if (el.arr) {
                    el.arr.forEach((i) => {
                        if (i.id === idx) {
                            i.addFavorites(target)
                        }
                    })
                }
            })
        }else{this.objElement[idxObj].addFavorites(target)}
        new State().saveData(this.objElement, this.id)
    }
    render = (arr: Block[] = this.objElement): void => {
        arr.forEach((el) => {
            el.render()
        })
    }

    update = (): void => {
        if (this.amountComments) this.amountComments.innerText = `(${this.objElement.length})`
        const eventForElement = (el: Block): void => {
            const favoriteBtn: Element | null = document.getElementById(`favorit${el.id}`)
            const likeInc: Element | null = document.getElementById(`inc${el.id}`)
            const likeDec: Element | null = document.getElementById(`dec${el.id}`)
            const answerBtn: Element | null = document.getElementById(`answer${el.id}`)
            if (!favoriteBtn) return
            favoriteBtn.addEventListener('click', this.addFavorites)
            if (!likeDec && !likeInc) return
            likeInc?.addEventListener('click', this.likeElement)
            likeDec?.addEventListener('click', this.likeElement)
            if (!answerBtn) return
            answerBtn?.addEventListener('click', this.toogleAnswer)
        }
        this.objElement.forEach((block) => {
            if (block.arr) block.arr.forEach((i) => eventForElement(i))
            eventForElement(block)
        })
    }
    creatEvent = (): void => {
        this.sectionAria?.buttonAdd?.addEventListener('click', this.addNewBlock)
        this.sectionAria?.textArea?.addEventListener('keyup', this.sectionAria.textAreaResize)
        this.sort.buttonFavorites?.addEventListener('click', this.sortFavorite)
        this.sort.elementSort?.addEventListener('click', this.sortElement)
        this.sort.buttonSort?.addEventListener('click', this.sortElement)
    }
    start = (): void => {
        let userText = document.querySelector('.user-name')
        if (!userText) return
        userText.textContent = this.name
        this.render()
        this.creatEvent()
        this.update()
    }
}

const main: Comments = new Comments('Roman Obakko')
main.start()
