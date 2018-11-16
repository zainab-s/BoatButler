import { NgModule } from '@angular/core';
import {imports} from './app.imports';
import { AppComponent } from './root/app.component';
import { components } from './app.components';
import { ContactService } from './services/contact.service';
import { ContactComponent } from './components/contact.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { Http ,HttpModule} from '@angular/http';
import { EgnTranslateService } from './app.service';
import { poeditor } from './poeditor.service';



@NgModule({ 
  declarations: [components],
  imports: [UiSwitchModule,imports,HttpModule,ScrollToModule.forRoot()],
  providers: [ContactService,EgnTranslateService,poeditor],
  bootstrap: [AppComponent],
  entryComponents: [components]
  
})
export class AppModule { }
