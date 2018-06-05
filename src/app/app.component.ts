import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  path:any='';
  selectedItem = '';
  currentUser: any = [];
  updatedUsers: any = [];
  

  constructor(
  	private location: Location
  ){}
  ngOnInit() {
  	this.path = this.location.path();
  	this.selectedItem = this.path;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('updatedUsers');
  }

  toggle(path){
  	this.selectedItem = path;
  }

}
