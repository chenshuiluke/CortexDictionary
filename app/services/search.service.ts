import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment";
import { Word, OxfordResponse, UrbanDictionaryResponse, Definition } from '../models';
@Injectable()
export class SearchService{
    constructor(private http:HttpClient){

    }

    searchForWordOnOxford(word:String){
        return new Promise((resolve, reject) => {
            let headers:HttpHeaders = new HttpHeaders();
            headers = headers.set("app_id", environment.oxford_api.app_id);
            headers = headers.set("app_key", environment.oxford_api.app_key);
            this.http.get(`${environment.oxford_api.base_url}/search/en?q=${word.toLowerCase()}`, 
                {
                    headers: headers
                })
                .subscribe(
                    (data:any) => {
                        console.log(data.results);
                        let words:Word[] = data.results.slice(0,3).map((item) => {
                            return new OxfordResponse(item);
                        })
                        .map((item:OxfordResponse) => {
                            return new Word(item, this);
                        })
                        resolve(words);
                    },
                    (err) => {
                        reject(err);
                    }
                )
        })
    }

    searchForWordOnUrbanDictionary(word:String){
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.urban_dict_api.base_url}?term=${word.toLowerCase()}`)
                .subscribe(
                    (data:any) => {
                        console.log(data);
                        if(data.result_type === "exact"){
                            let word = new Word(new UrbanDictionaryResponse(data.list[0]));
                            let definitions:Definition[] = [];

                            data.list = data.list.sort((a, b) => {
                                let a_score = a.thumbs_up - a.thumbs_down;
                                let b_score = b.thumbs_up - b.thumbs_down;
                                return a_score - b_score
                            });

                            for(let counter = 0; counter < data.list.length; counter++){
                                let item:any = data.list[counter];
                                definitions.push(new Definition({definition:item.definition}));
                            }
                            word.definition = definitions;
                            console.log("Got urban dictionary");
                            resolve([word]);
                        }
                        else{
                            console.log("Not exact")
                        }
                        resolve([]);
                    },
                    (err) => {
                        console.log("error");
                        reject(err);
                    }
                )
        })        
    }

    searchForWord(word:String){
        return new Promise((resolve, reject) => {
            Promise.all([
                this.searchForWordOnUrbanDictionary(word),
                this.searchForWordOnOxford(word)
            ])
            .then((data:any) => {
                console.log("Result:");
                let arr1 = data[0];
                let arr2 = data[1];
                let result = arr1.concat(arr2);
                console.log("Combined result:");
                console.log(result);
                resolve(result)
            })
            .catch((err) => {
                console.log("All promise error");
                console.log(err);
                reject(err);
            })
        })
    }

    getOxfordDefinition(word:String){
        return new Promise((resolve, reject) => {
            let headers:HttpHeaders = new HttpHeaders();
            headers = headers.set("app_id", environment.oxford_api.app_id);
            headers = headers.set("app_key", environment.oxford_api.app_key);
            this.http.get(`${environment.oxford_api.base_url}/entries/en/${word.toLowerCase()}`, 
                {
                    headers: headers
                })
                .subscribe(
                    (data:any) => {
                        console.log(data);
                        let definitions:Definition[] = [];
                        if(data.results && data.results.length > 0){
                            let result_item = data.results[0];
                            for(let lexical_entry_counter = 0; lexical_entry_counter < result_item.lexicalEntries.length; lexical_entry_counter++){
                                let lexical_entry = result_item.lexicalEntries[lexical_entry_counter];
                                for( let entry_counter = 0; entry_counter < lexical_entry.entries.length; entry_counter++){
                                    let entry = lexical_entry.entries[entry_counter];
                                    for(let senses_counter = 0; senses_counter < entry.senses.length; senses_counter++){
                                        let sense = entry.senses[senses_counter];
                                        sense.definitions.map((item) => {
                                            definitions.push(new Definition({
                                                category: lexical_entry.lexicalCategory, 
                                                definition: item
                                            }));
                                            return item;
                                        })
                                    }
                                }
                            }
                        }
                        resolve(definitions);
                    },
                    (err) => {
                        reject(err);
                    }
                )
        })
    }
}