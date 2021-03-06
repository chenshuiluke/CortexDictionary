import { Component, OnInit } from '@angular/core';
import { SearchBar } from "ui/search-bar";
import { environment } from "../../environment/environment";
import { SearchService } from "../../services";
import { Word } from '../../models';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { StateService } from '../../services';
import { Router } from "@angular/router";
import { Page } from "ui/page";

@Component({
    selector:'home',
    styleUrls:[`${environment.prod ? './home.component.css' : 'components/home/home.component.css'}`],
    templateUrl: `${environment.prod ? './home.component.html' : 'components/home/home.component.html'}`
})
export class HomeComponent implements OnInit{
    loading:boolean = false;
    
    userSearched: Subject<string> = new Subject<string>();
    constructor(private search:SearchService, public state:StateService, 
        private router:Router,  private _page: Page){
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
        this.loading = true;
        this.search.searchForWord(word)
            .then((words:Word[]) => {
                this.state.setWords(words);
                this.loading = false;
            })
            .catch((err) => {
                console.log(err);   
                this.loading = false;
            });

        this.clearBox();
    }

    getWords(){
        let filteredWords:Word[] = [];
        
        let words = this.state.getWords();
        if(words != undefined){
            for(let counter = 0; counter < words.length; counter++){
                let word:Word = words[counter];
                if(word.definition && word.definition.length > 0){
                    filteredWords.push(word);
                }
            }
        }
        
        return filteredWords;
    }

    showDefinition(word:Word){
        this.state.setSelectedWord(word);
        this.router.navigate(['definition']);
    }

    clearBox(){
        this.state.setWords([]);
    }

    onSubmit(event){
        console.log(event);
    }
    ngOnInit(){
        this._page.actionBarHidden = true;
    }
}
