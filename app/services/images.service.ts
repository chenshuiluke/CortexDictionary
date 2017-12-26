import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models';
@Injectable()
export class ImagesService{
    constructor(private http:HttpClient){

    }

    getImageResults(name:String){
        return new Promise((resolve, reject) => {
            this.http.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=imageinfo&iiprop=url&format=json`)
                .subscribe(
                    (data:any) => {
                        let obj:any = Object.keys(data.query.pages)[0]
                        let url:String = data.query.pages[obj].imageinfo[0].url;
                        resolve(url);
                    },
                    (err) => {
                        reject(err);
                    }
                )
        });
    }

    getImages(word:String){
        return new Promise((resolve, reject) => {
            this.http.get(`https://en.wikipedia.org/w/api.php?action=query&prop=images&titles=${word}&format=json`)
                .subscribe(
                    (data:any) => {
                        let images:Image[] = [];
                        for(let page_key in data.query.pages){
                            let page = data.query.pages[page_key];
                            if(page.images){
                                let promises = [];
                                for(let image_counter = 0; image_counter < page.images.length; image_counter++){
                                    let image_obj = page.images[image_counter];
                                    let promise = this.getImageResults(image_obj.title);
                                    promises.push(promise);
                                }
                                Promise.all(promises)
                                    .then((data) => {
                                        console.log("Image results");
                                        console.log(data);
                                        let images:Image[] = data.map((item) => {
                                            return new Image(item);
                                        })
                                        .filter((item) => {
                                            if(item.url){
                                                return !item.url.endsWith(".svg");
                                            }
                                            else{
                                                return false;
                                            }
                                        });
                                        resolve(images);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            }
                        }
                    },
                    (err) => {
                        reject(err);
                    }
                )
        });
    }
}