import { Component, OnInit } from '@angular/core';
import { poeditor } from '../poeditor.service';


@Component({
  selector: 'app-features',
  templateUrl: '../templates/features.component.html',
  providers: [poeditor]
})
export class FeaturesComponent implements OnInit {

  BoatOwner: string = "";
  ServiceProvider: string = "";
  About: string = "";
  Boat_About: string = "";
  Boat_Head_AboutFeature1: string = "";
  Boat_Detail_AboutFeature1: string = "";
  Boat_Head_AboutFeature2: string = "";
  Boat_Detail_AboutFeature2: string = "";
  Boat_Head_AboutFeature3: string = "";
  Boat_Detail_AboutFeature3: string = "";
  Service_About: string = "";
  Service_Head_AboutFeature1: string = "";
  Service_Detail_AboutFeature1: string = "";
  Service_Head_AboutFeature2: string = "";
  Service_Detail_AboutFeature2: string = "";
  Service_Head_AboutFeature3: string = "";
  Service_Detail_AboutFeature3: string = "";
  Contact="";
  isCompany: boolean;
  //Work Done to Get JSON Content into Array and print it on html
  translationJSON: Array<any>;
  translations: string;
  private language: string = "da";
  private poEditorEn: any;

  constructor(private eTranslate: poeditor) {
    this.isCompany = false;

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
   var r=this.translationJSON[0];
        this.BoatOwner = r.BoatOwner,
          this.ServiceProvider = r.ServiceProvider,
          this.About = r.About
          this.Contact = r.Contact,
        this.Boat_About = r.Boat_About,
          this.Boat_Head_AboutFeature1 = r.Boat_Head_AboutFeature1,
          this.Boat_Head_AboutFeature1 = r.Boat_Head_AboutFeature1,
          this.Boat_Detail_AboutFeature1 = r.Boat_Detail_AboutFeature1,
          this.Boat_Head_AboutFeature2 = r.Boat_Head_AboutFeature2,
          this.Boat_Detail_AboutFeature2 = r.Boat_Detail_AboutFeature2,
          this.Boat_Head_AboutFeature3 = r.Boat_Head_AboutFeature3,
          this.Boat_Detail_AboutFeature3 = r.Boat_Detail_AboutFeature3,
          this.Service_About = r.Service_About,
          this.Service_Head_AboutFeature1 = r.Service_Head_AboutFeature1,
          this.Service_Detail_AboutFeature1 = r.Service_Detail_AboutFeature1,
          this.Service_Head_AboutFeature2 = r.Service_Head_AboutFeature2,
          this.Service_Detail_AboutFeature2 = r.Service_Detail_AboutFeature2,
          this.Service_Head_AboutFeature3 = r.Service_Head_AboutFeature3,
          this.Service_Detail_AboutFeature3 = r.Service_Detail_AboutFeature3

        console.log(name);
      

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
