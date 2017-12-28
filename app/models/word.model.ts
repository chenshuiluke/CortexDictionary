import { Inject } from '@angular/core';
import { SearchService } from '../services';
import { OxfordResponse } from './oxford-response.model';
import { Definition } from './definition.model';
import { UrbanDictionaryResponse } from './urban-dictionary-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
export class Word{
    word:String;
    definition:String|Definition[];
    source:String;
    id:String;
    constructor(obj:OxfordResponse|UrbanDictionaryResponse, private search?:SearchService){
        if(obj.word){
            this.word = obj.word;
        }
        if(obj.definition){
            this.definition = obj.definition;
        }
        if(obj.id !== undefined ){
            this.id = obj.id;
        }
        if(obj instanceof OxfordResponse){
            this.source = "oxford";
            if(this.search && !this.definition){
                let query:String = this.id ? this.id : this.word;
                this.search.getOxfordDefinition(query)
                    .then((result:Definition[]) => {
                        console.log(result);
                        console.log("Got definitions");
                        this.definition = result;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
        else{
            this.source = "urban";
            console.log("Urban dictionary source");
        }
    }
}