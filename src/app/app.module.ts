import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudioListComponent } from './@pages/studio-list/studio-list.component';
import { ApiService } from './@services/api.service';
import { CorsInterceptor } from './@interceptors/cors.interceptor';
import { CommonModule } from '@angular/common';
import { StudioComponent } from './@components/studio/studio.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudioListComponent,
    StudioComponent
  ],
  imports: [
    FormsModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    CardModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
