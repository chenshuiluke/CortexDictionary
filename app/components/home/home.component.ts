import { Component } from '@angular/core';
import { SearchBar } from "ui/search-bar";
import { environment } from "../../environment/environment";
import { SearchService } from "../../services";
import { Word } from '../../models';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
    selector:'home',
    styleUrls:['components/home/home.component.css'],
    templateUrl: 'components/home/home.component.html'
})
export class HomeComponent{
    words:Word[];
    userSearched: Subject<string> = new Subject<string>();
    constructor(private search:SearchService){
        this.userSearched
        .debounceTime(500) // wait 500ms after the last event before emitting last event
        .distinctUntilChanged() // only emit if value is different from previous value
        .subscribe((word:String) => {
            this.searchForTerm(word);
        });
    }

    registerKeyPress(event){
        if(event.value){
            this.userSearched.next(event.value)
        }
    }
    searchForTerm(word:String){
        console.log("Searching");
        console.log(word);
        this.search.searchForWord(word)
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

    clearBox(){
        this.words = [];
    }

    onSubmit(event){
        console.log(event);
    }
}