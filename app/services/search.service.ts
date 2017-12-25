import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment";
import { Word, OxfordResponse } from '../models';
@Injectable()
export class SearchService{
    constructor(private http:HttpClient){

    }

    searchForWord(word:String){
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
                        let words:Word[] = data.results.map((item) => {
                            return new OxfordResponse(item);
                        })
                        .map((item:OxfordResponse) => {
                            return new Word(item);
                        })
                        resolve(words);
                    },
                    (err) => {
                        reject(err);
                    }
                )
        })
        
    }
}