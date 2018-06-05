import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { ApiUrlsService } from './api-urls.service';
import { HttpHeaders, HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './adduser/adduser.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [UserService, ApiService, ApiUrlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
