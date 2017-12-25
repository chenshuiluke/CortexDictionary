import { Component } from '@angular/core';
import { SearchBar } from "ui/search-bar";
import { environment } from "../../environment/environment";
import { SearchService } from "../../services";
import { Word } from '../../models';
@Component({
    selector:'home',
    styleUrls:['components/home/home.component.css'],
    templateUrl: 'components/home/home.component.html'
})
export class HomeComponent{
    words:Word[];
    constructor(private search:SearchService){
    }
    searchForTerm(event){
        if(event.value){
            console.log("Searching");
            console.log(event.value);
            this.search.searchForWord(event.value)
                .then((words:Word[]) => {
                    this.words = words;
                    this.words.map((item:Word) => {
                        console.log(item.word);
                        return item;
                    })
                })
                .catch((err) => {
                    console.log(err);   
                });

            this.clearBox();
        }
    }

    clearBox(){
        this.words = [];
    }

    onSubmit(event){
        console.log(event);
    }
}