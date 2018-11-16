import { Component, OnInit, EventEmitter } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { HeadData } from '../Data/Head-slide-data';
import { EgnTranslateService } from '../app.service';
import { environment } from '../../environments/environment';
import { poeditor } from '../poeditor.service';

@Component({
  selector: 'app-head-slide',
  templateUrl: '../templates/head-slide.component.html',
  styleUrls: ['../styles/head-slide.component.css'],
  providers: [EgnTranslateService,poeditor,
  { provide: CarouselConfig, useValue: {  showIndicators: true } }
]
})

export class HeadSlideComponent implements OnInit {
 //Initialize Strings used in HTML View
 LogIn: string = "";
 DownloadNJORD: string = "";
 Introduce: string = "";
 NJORD: string = "";
 tittle2: string = "";
 par1: string = "";
 par2: string = "";
 par3: string = "";

  isCollapsed = true;
  companyPanel = `${environment.companyPanel}/login`;
  
  translationJSON: Array<any>;
  translations: string;
  private language: string = "da";
  private poEditorEn: any;
slidersData = HeadData;
  constructor(private service:EgnTranslateService, 
      private eTranslate: poeditor,) {
        this.translationJSON = [];
        Promise.resolve(
          this.getPoEditorTranslations(this.language)
        ).then(res => {
          
          this.translations = localStorage.getItem('translationJSON')
          this.translationJSON.push(JSON.parse(this.translations));
          console.log(this.translationJSON);
         
        }).catch(err => {
          //console.log(this.translations);
         // console.log(err);
        })
       }

  ngOnInit() {
    this.LogIn= this.translationJSON[0].LogIn;
 this.DownloadNJORD= this.translationJSON[0].DownloadNJORD;
 this.Introduce= this.translationJSON[0].Introduce;
 this.NJORD= this.translationJSON[0].NJORD;
 this.tittle2= this.translationJSON[0].tittle2;
 this.par1=this.translationJSON[0].par1;
 this.par2=this.translationJSON[0].par2;
 this.par3=this.translationJSON[0].par3;

    
     
  }
    
    
        // Translation variables 

// Getting English translations
	
	async getPoEditorTranslations(language){
		const result = await this.eTranslate.getPoEditorEnTranslation(language).subscribe((data)=>{
			console.log(data)
			this.poEditorEn = data.result.url;
			this.getEnglishJson(this.poEditorEn)
		})
	}

	async getEnglishJson(url){
		const result = await this.eTranslate.getEnglishJsonObj(url).subscribe((data)=>{
            this.translationJSON =data;
            // console.log(this.translationJSON)
			localStorage.setItem('translationJSON',JSON.stringify(this.translationJSON))
		})
  }
  
}
