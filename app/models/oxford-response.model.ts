export class OxfordResponse{
    word: String;
    id: String;

    constructor(obj:any){
        if(obj.word){
            this.word = obj.word;
        }

        if(obj.id){
            this.id = obj.id;
        }
    }
}