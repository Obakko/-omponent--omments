
class SortList {
    elementSort: HTMLElement | null;
    elementView: HTMLElement | null;
    buttonSort: HTMLButtonElement | null;
    buttonFavorites: HTMLElement | null;
    block: HTMLElement | null;
    order: boolean

    constructor() {
        this.elementSort = document.querySelector('.sort-list--visability'),
        this.elementView = document.querySelector('.sort-comments__list'),
        this.buttonSort = document.querySelector('.sort-comments__button'),
        this.buttonFavorites = document.querySelector('.sort-comments__favorites'),
        this.block = document.querySelector('.section-message'),
        this.order = true
    }

    changeStatusOrder = ():void => {
        this.order? this.order=false:this.order=true
        this.buttonSort?.classList.toggle('button_order')
    }

    clearHTML = (): void => {
        if (!this.block) return
        this.block.innerHTML = ''
    }

    sortFavorits = (arr: Block[]): Block[] => {
        this.clearHTML()
        const newArr = arr.filter((el) => {
            const test = el.arr?.findIndex((elem) => { if (elem.favorites) { return true } })
            if (test || test === 0) { if (test > -1) return true }
            if (el.favorites) return true
        })
        return newArr
    }

    quickSortLikes = (arr: Block[], func = this.maxLike): Block[] => {
      
        if (arr.length < 2) return arr
        let left = []
        let right = []
        let center = Math.floor(arr.length / 2)
        for (let i = 0; arr.length > i; i++) {
            if (center === i) continue
            let status: boolean
            if (this.order) {
                status = func(arr[center]) < func(arr[i])
            } else {
                status = func(arr[center]) > func(arr[i])
            }
            if (status) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...this.quickSortLikes(left), arr[center], ...this.quickSortLikes(right)]    
    }

    maxLike = (obj: Block): number => {
        let thisLike = obj.likes
        if (obj.arr !== null) {
            const maxLikesInArr = obj.arr?.reduce((a, b) => a.likes > b.likes ? a : b)
            if (thisLike > maxLikesInArr.likes) { return thisLike } else { return maxLikesInArr?.likes }
        } else { return thisLike }
    }
    maxTime = (obj: Block): number => {
        let thisTime = obj.data
        if (obj.arr !== null) {
            const maxTime = obj.arr?.reduce((a, b) => a.data > b.data ? a : b)
            if (thisTime > maxTime.data) { return thisTime } else { return maxTime?.data }
        } else { return thisTime }
    }
    maxAnswer = (obj: Block):number => {
        if (obj.arr == null)return 0
        return obj.arr.length
    }
    maxActual= (obj: Block):number => {
        return obj.id
    }
}