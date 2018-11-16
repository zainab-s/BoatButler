import { Component, OnInit, Directive } from '@angular/core';
import { poeditor } from '../poeditor.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ContactService } from '../services/contact.service';
import { Contact } from '../Data/Contact_data';
import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: '../templates/contact.component.html',
  providers: [poeditor]
})

export class ContactComponent implements OnInit {
  //Initialize Strings used in HTML View
  GetInTouch: string = "";
  GetInTouchText: string = "";
  Name: string = "";
  NameError1: string = "";
  NameError2: string = "";
  Email: string = "";
  EmailError1: string = "";
  EmailError2: string = "";
  Message: string = "";
  MessageError1: string = "";
  MessageError2: string = "";
  SendButton: string = "";
  //Footer
  Telephone: string = "";
  TelephoneNubmer: string = "";
  TelephoneTimings: string = "";
  Timings: string = "";
  ContactEmail: string = "";
  TandC: string = "";
  CopyRights: string = "";

  ContactForm;
  submitted = false;
  contact = <Contact>{ name: '', email: '', message: '' };
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
//Work Done to Get JSON Content into Array and print it on html
  translationJSON: Array<any>;
  translations: string;
  private language: string = "da";
  private poEditorEn: any;
  
  constructor(public formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialog: MatDialog,
    private eTranslate: poeditor) {
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
    this.createForm();

    this.GetInTouch = this.translationJSON[0].GetInTouch;
    this.GetInTouchText = this.translationJSON[0].GetInTouchText;
    this.Name = this.translationJSON[0].Name;
    this.NameError1 = this.translationJSON[0].NameError1;
    this.NameError2 = this.translationJSON[0].NameError2;
    this.Email = this.translationJSON[0].Email;
    this.EmailError1 = this.translationJSON[0].EmailError1;
    this.EmailError2 = this.translationJSON[0].EmailError2;
    this.Message = this.translationJSON[0].Message;
    this.MessageError1 = this.translationJSON[0].MessageError1;
    this.MessageError2 = this.translationJSON[0].MessageError2;

    this.Telephone = this.translationJSON[0].Telephone;
    this.TelephoneNubmer = this.translationJSON[0].TelephoneNubmer;
    this.TelephoneTimings = this.translationJSON[0].TelephoneTimings;
    this.Timings = this.translationJSON[0].Timings;
    this.ContactEmail = this.translationJSON[0].ContactEmail;
    this.TandC = this.translationJSON[0].TandC;
    this.CopyRights = this.translationJSON[0].CopyRights;


    this.SendButton = this.translationJSON[0].SendButton;
    console.log(name);
  }

  createForm() {
    this.ContactForm = this.formBuilder.group({
      name: this.formBuilder.control(this.contact.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: this.formBuilder.control(this.contact.email, [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      message: this.formBuilder.control(this.contact.message, [
        Validators.required,
        Validators.minLength(13)
      ]),
    });
  }

  get name() { return this.ContactForm.get('name').value; }
  get email() { return this.ContactForm.get('email').value; }
  get message() { return this.ContactForm.get('message').value; }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }

  public onSubmit(ContactItem): void {
    this.submitted = true;

    if (this.ContactForm.valid) {
      this.contactService.addContact(this.ContactForm.getRawValue());
      this.contactService.postContact(this.contactService.getContacts());
    }
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