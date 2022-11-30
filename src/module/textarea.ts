class SectionAddBlock {
    textArea: HTMLTextAreaElement | null;
    buttonAdd: HTMLButtonElement | null;
    numberLines: HTMLParagraphElement | null
    constructor() {
        this.textArea = document.querySelector('.text-comments'),
        this.buttonAdd = document.querySelector('.button-comments'),
        this.numberLines = document.querySelector('.number-lines')
    }

    writeNumber = (num: number | undefined = undefined): void => {
        if (!this.numberLines) return
        if (!num) {
            this.numberLines.innerText = `Макс. 1000 символов`
        } else {
            this.numberLines.innerText = `${num}/1000`
            if(num>1000){this.numberLines.style.color='red'}else{
                this.numberLines.removeAttribute('style')
            }
        }
    }

    textAreaResize = (): void => {
        if (!this.textArea) return
        const valueLength = this.textArea.value.length
        if (valueLength >= 1) {
            this.writeNumber(valueLength)
            if (valueLength > 1000) {
                this.buttonAdd?.classList.add('number-lines--danger')
                this.toggleButton(false)
            } else {
                this.toggleButton(true)
                this.buttonAdd?.classList.remove('number-lines--danger')
            }
        } else {
            this.writeNumber()
            this.toggleButton(false)
            this.buttonAdd?.classList.remove('number-lines--danger')
        }
        this.textArea.style.height = ""
        this.textArea.style.height = this.textArea.scrollHeight + 'px';
    }

    toggleButton = (id: boolean = true): void => {
        if (!this.buttonAdd) return
        id ? this.buttonAdd.classList.add('button-active') : this.buttonAdd.classList.remove('button-active')
    }
}

