import { Component, OnInit } from "@angular/core";
import { StateService } from '../../services';
import { Page } from "ui/page";
@Component({
    selector:'definition',
    templateUrl: 'components/definition/definition.component.html',
    styleUrls: ['components/definition/definition.component.css']
})
export class DefinitionComponent implements OnInit{
    constructor(public state:StateService, private _page: Page){

    }

    ngOnInit(){
        this._page.actionBarHidden = true;
    }
}