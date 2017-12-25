import { OxfordResponse } from './oxford-response.model';
export class Word{
    word:String;
    constructor(obj:OxfordResponse){
        if(obj.word){
            this.word = obj.word;
        }
    }
}