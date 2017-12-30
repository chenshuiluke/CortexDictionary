import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment";
import { Word, Definition } from '../models';
@Injectable()
export class SearchService{
    constructor(private http:HttpClient){

    }

    searchForWordOnWordApi(word:String){
        return new Promise((resolve, reject) => {
            let headers:HttpHeaders = new HttpHeaders();
            headers = headers.set("X-Mashape-Key", environment.word_api.app_key);
            this.http.get(`${environment.word_api.base_url}/${word}/definitions`, {
                headers:headers
            })
                .subscribe(
                    (data:any) => {
                        console.log(data);
                        
                        let definitions:Definition[] = [];
                        for(let counter = 0; counter < data.definitions.length; counter++){
                            let item = data.definitions[counter];
                            let definition:Definition = new Definition({category:item.partOfSpeech, definition:item.definition});
                            definitions.push(definition);
                        }

                        let word_obj:Word = new Word({word:word, definition:definitions});
                        word_obj.source = "word_api";
                        resolve([word_obj]);
                    },
                    (err:any) => {
                        //API returns an error when the word is not found - we don't want to catch this.
                        resolve([]);
                    }
                )
        });
    }

    searchForWordOnUrbanDictionary(word:String){
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.urban_dict_api.base_url}?term=${word.toLowerCase()}`)
                .subscribe(
                    (data:any) => {
                        console.log(data);
                        if(data.result_type === "exact"){
                            let word = new Word(data.list[0]);
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
                            word.source = "urban";
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
        word = word.replace(/\s+$/, '');
        return new Promise((resolve, reject) => {
            Promise.all([
                this.searchForWordOnUrbanDictionary(word),
                this.searchForWordOnWordApi(word)
            ])
            .then((data:any) => {
                
                let arr1 = data[0];
                let arr2 = data[1];

                let combined_arr:Word[] = [];

                let larger_arr = arr1.length >= arr2.length ? arr1 : arr2;
                let smaller_arr = arr1.length <= arr2.length ? arr1 : arr2;

                for(let larger_counter = 0; larger_counter < larger_arr.length; larger_counter++){
                    let larger_arr_word = larger_arr[larger_counter];

                    for(let smaller_counter = 0; smaller_counter < smaller_arr.length; smaller_counter++){
                        let smaller_arr_word = smaller_arr[smaller_counter];
                        if(larger_arr_word.word === smaller_arr_word.word){
                            let combined_definitions:Definition[] = [];
                            
                            larger_arr_word.definition = larger_arr_word.definition.concat(smaller_arr_word.definition);
                            larger_arr_word.definition.filter((item, index, arr) => {
                                return index === arr.findIndex((t:Definition) => {
                                    t.definition === item.definition;
                                });
                            })
                        }
                    }
                    combined_arr.push(larger_arr_word);
                }

                combined_arr

                console.log("Combined result:");
                console.log(combined_arr);
                resolve(combined_arr)
            })
            .catch((err) => {
                console.log("All promise error");
                console.log(err);
                reject(err);
            })
        })
    }
}