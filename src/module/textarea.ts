class SectionAddBlock {
    textArea: HTMLTextAreaElement | null
    buttonAdd: HTMLButtonElement | null
    numberLines: HTMLParagraphElement | null
    constructor() {
        this.textArea = document.querySelector('.text-comments'),
            this.buttonAdd = document.querySelector('.button-comments'),
            this.numberLines = document.querySelector('.number-lines')
    }

    textAreaResize = (): void => {
        if (!this.textArea || !this.numberLines) return

        const valueLength = this.textArea.value.length

        if (valueLength >= 1) {
            this.numberLines.innerText = `${valueLength}/1000`
            if (valueLength > 1000) {
                this.toggleButton(false)
            } else {
                this.toggleButton()
            }
        } else { this.toggleButton(false) }
        this.textArea.style.height = ""
        this.textArea.style.height = this.textArea.scrollHeight + "px";
    }

    toggleButton = (id: boolean = true): void => {
        if (!this.buttonAdd) return
        id ? this.buttonAdd.classList.add('button-active') : this.buttonAdd.classList.add('button-active')
    }

    giveResult = ():string|undefined => {
        if (!this.textArea?.value||this.textArea?.value.length > 1000)return
        return this.textArea.value
    }

    addTime = ():string => {
        const data:Date = new Date();
        return`${data.getDate()}.${data.getMonth()+1} ${data.getHours()}:${data.getMinutes()}`
    }
}

