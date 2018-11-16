import { Component, OnInit, Input } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { poeditor } from '../poeditor.service';

@Component({
  selector: 'app-work',
  templateUrl: '../templates/work.component.html',
  providers:[poeditor]
})
export class WorkComponent implements OnInit {
  //Initialize Strings used in HTML View
  Contact: string = "";
  ContactText1: string = "";
  ContactButton: string = "";

  //Work Done to Get JSON Content into Array and print it on html
  translationJSON: Array<any>;
  translations: string;
  private language: string = "da";
  private poEditorEn: any;
  @Input('isCompany') isCompany: boolean;

  constructor(private eTranslate:poeditor) { 
  
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
    
          let r=this.translationJSON[0];
          this.Contact = r.Contact;
          this.ContactText1=r.ContactText1;
          this.ContactButton= r.ContactButton;
         
        
                
        }
        async getPoEditorTranslations(language) {
          const result = await this.eTranslate.getPoEditorEnTranslation(language).subscribe((data) => {
            console.log(data)
            this.poEditorEn = data.result.url;
            this.getEnglishJson(this.poEditorEn)
          })
        }
      
        async getEnglishJson(url) {
          const result = await this.eTranslate.getEnglishJsonObj(url).subscribe((data) => {
            this.translationJSON = data;
            // console.log(this.translationJSON)
            localStorage.setItem('translationJSON', JSON.stringify(this.translationJSON))
          })
        }
      
}
