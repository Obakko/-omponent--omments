

class Block {
    id: number;
    text: string;
    name: string;
    data: string;
    likes: number;
    favorites: boolean;
    arr: Array<Block> | undefined
    constructor(id: number, text: string, data: string, name: string,
        likes: number = 0, favorites: boolean = false, arr: Array<Block> = []) {
        this.text = text,
            this.data = data,
            this.name = name,
            this.likes = likes,
            this.favorites = favorites
        this.id = id
        this.arr = arr
        
    }

    putLike = (id: boolean): void => {
        id ? this.likes += 1 : this.likes -= 1
    }

    addToFavorites = (): void => {
        this.favorites ? this.favorites = false : this.favorites = true
    }

    render1 = (): string => {
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
            <div class="data-favorite ${this.favorites?'favorites':null}">
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
      </div>`)
    }
}

class Comments {
    objElement: Array<Block>;
    block: Element | null;
    buttonAdd: HTMLButtonElement | null
    nameUser: string | null | undefined
    textarea: HTMLTextAreaElement | null
    id:number
    numberLines:HTMLParagraphElement|null
    likesButton: NodeListOf<Element> | null
    constructor(obj: Array<Block>) {
        this.id = 1
        this.objElement = obj,
        this.block = document.querySelector('.section-message'),
        this.buttonAdd = document.querySelector('.button-comments'),
        this.nameUser = document.querySelector('.user-name')?.textContent,
        this.textarea = document.querySelector('.text-comments'),
        this.numberLines = document.querySelector('.number-lines'),
        this.likesButton = document.querySelectorAll('.data-favorite')
    }

    addFavorites = (e:any):void =>{
        e.target.classList.toggle('favorites')
    }
    update=():void=>{
        
        const lik = document.querySelectorAll('.data-favorite')
        lik.forEach((el)=>el.addEventListener('click',this.addFavorites))
    }
    textareaResize = (): void => {
        if (!this.textarea|| !this.buttonAdd|| !this.numberLines) return
        if(this.textarea.value.length >=1){
            this.numberLines.innerText = `${this.textarea.value.length}/1000`
            if(this.textarea.value.length>1000){
                this.buttonAdd.classList.remove('button-active')
            }else {
            this.buttonAdd.classList.add("button-active")}
            } else {this.buttonAdd.classList.remove("button-active")}
        this.textarea.style.height = ""
        this.textarea.style.height = this.textarea.scrollHeight + "px";
    }

    addNewBlock = () => {
        if (!this.textarea?.value||this.textarea?.value.length > 1000){return}
        if(!this.nameUser)return
        const data:Date = new Date();
        const time:string = `${data.getDate()}.${data.getMonth()+1} ${data.getHours()}:${data.getMinutes()}`
        const newObj = new Block(this.id,this.textarea?.value,time,this.nameUser)
        this.textarea.value = ""
        this.textarea.style.height=""
        this.render([newObj])
        this.update()
    }
    render = (item:Array<Block>): void => {
        item.forEach((el)=>this.block?.insertAdjacentHTML("beforeend", el.render1()))
    }

}

const main: Comments = new Comments([new Block(1, "Тест произведен", "24.11 22:54", "roman Guga"),
new Block(2, "Да ну", "24.11 22:59", "Kek Guga")])
main.render(main.objElement)
main.textarea?.addEventListener('keyup', main.textareaResize)
main.buttonAdd?.addEventListener('click', main.addNewBlock)
