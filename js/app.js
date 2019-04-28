class TypeWriter {
    constructor(typedEle) {
        this.ele = typedEle;
        this.timeWait = parseInt(this.ele.getAttribute('data-wait')) || 3000;
        this.wordList = JSON.parse(this.ele.getAttribute('data-words')) || [];
        this.originalText = this.ele.textContent;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleteting = false;
        this.addedText = " ";
        this.type();
    }

    type() {
        const currentWord = this.wordList[this.currentWordIndex % this.wordList.length];
        if (!currentWord) return;
        // type next char from current word or delete it
        let speed = 300;
        if (!this.isDeleteting) {
            const nextChar = currentWord.substr(this.currentCharIndex, 1);
            this.addedText = this.addedText + nextChar;
        } else {
            speed = speed / 3;
            this.addedText = this.addedText.substr(0, this.addedText.length - 1);
        }
        // update dom
        this.ele.textContent = this.originalText + this.addedText;
        
        setTimeout(() => {
            // recursive call
            if (!this.isDeleteting) {
                // increase char index by one
                this.currentCharIndex++;
                if (!currentWord[this.currentCharIndex]) {
                    // already complete typing current word, delete it
                    this.isDeleteting = true;

                }
            } else {
                // decrease char index by one
                this.currentCharIndex--;

                if (this.currentCharIndex === 0) {
                    this.isDeleteting = false;
                    this.addedText = " ";
                    this.currentWordIndex++;
                }
            }
            this.type();
        }, speed);
    }

    typeCurrentWord() {

    }

    deleteCurrentWord() {

    }
}

window.addEventListener('DOMContentLoaded', e => {
    init();
})

function init() {
    const writer = new TypeWriter(document.querySelector('.text-typed'));
}