import { Injectable } from '@angular/core';
import { Word } from '../models';
@Injectable()
export class StateService{
    words:Word[];
    selectedWord:Word;
    constructor(){

    }

    setWords(words:Word[]){
        this.words = words;
    }

    getWords():Word[]{
        return this.words;
    }

    setSelectedWord(word:Word){
        this.selectedWord = word;
    }

    getSelectedWord(){
        return this.selectedWord;
    }
}