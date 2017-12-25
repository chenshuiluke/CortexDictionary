export class UrbanDictionaryResponse{
    word:String;
    definition:String;

    constructor(obj:any){
        if(obj.word){
            this.word = obj.word;
        }
        if(obj.definition){
            this.definition = obj.definition;
        }
    }
}