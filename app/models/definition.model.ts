export class Definition{
    category:String;
    definition:String;

    constructor(obj:any){
        if(obj.category){
            this.category = obj.category;
        }

        if(obj.definition){
            this.definition = obj.definition;
        }
    }
}