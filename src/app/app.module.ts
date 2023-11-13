import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { SettingsComponent } from './settings/settings.component';

import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TutorialComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DatePipe,
    MatExpansionModule,
    CanvasJSAngularChartsModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
