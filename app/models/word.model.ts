import { Inject } from '@angular/core';
import { SearchService } from '../services';
import { Definition } from './definition.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
export class Word{
    word:String;
    definition:String|Definition[];
    source:String;
    id:String;
    constructor(obj:any, private search?:SearchService){
        if(obj.word){
            this.word = obj.word;
        }
        if(obj.definition){
            this.definition = obj.definition;
        }
        if(obj.id !== undefined ){
            this.id = obj.id;
        }
    }
}