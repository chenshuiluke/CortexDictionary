import { Component, OnInit } from "@angular/core";
import { StateService, ImagesService } from '../../services';
import { Page } from "ui/page";
import { Image } from '../../models/image.model';
@Component({
    selector:'definition',
    templateUrl: 'components/definition/definition.component.html',
    styleUrls: ['components/definition/definition.component.css']
})
export class DefinitionComponent implements OnInit{
    images:Image[];
    constructor(public state:StateService, private _page: Page, private imagesService:ImagesService){

    }

    ngOnInit(){
        this._page.actionBarHidden = true;
        this.imagesService.getImages(this.state.getSelectedWord().word)
            .then((data:Image[]) => {
                console.log("Got image data");
                console.log(data);
                this.images = data;
            })
            .catch((err) => {
                console.log("Error getting images");
                console.log(err);
            });
    }

    getRandomImage(){
        return this.images[Math.floor(Math.random()*this.images.length)];
    }

}