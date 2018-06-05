import { Component, Input, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { ApiUrlsService } from '../api-urls.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	users: User[];
  	searchText: any;
  	usersdata: any = [];
  	errors: any ='';
  	userId: any = '';
  	newuser: any = [];
  	userFilteredList:User[];
  	defaultView = true;
  	editView = false;
  	editValues: any = {};
  	inpVal: any = {};
  	newForm: FormGroup;	
  	arrIndex = 0;
  	id: any = '';
  	name : any = '';
  	surname: any = '';
  	dob : any = '';
  	phone: any = '';
  	city : any = '';
  	street: any = '';
  	numberval : any = '';

  	constructor(
  		private userService: UserService,
  		private apiService: ApiService,
  		private apiurlsService: ApiUrlsService,
  		private router: Router,
  		private fb: FormBuilder
  	) {

  		this.newForm = this.fb.group({
	      'id': ['', Validators.required],
	      'name': ['', Validators.required],
	      'surname': ['', Validators.required],
	      'dob': ['', Validators.required],
	      'phone': ['', Validators.required],
	      'city': ['', Validators.required],
	      'street': ['', Validators.required],
	      'numberval': ['', Validators.required]
	    });
  	}

  	ngOnInit() {
  		this.getUsers();
  		this.createFormControls();
    	this.createForm();
  	}
  	createFormControls() {
	    this.id = new FormControl('', [
	      Validators.required
	    ]);
	    this.name = new FormControl('', [
	      Validators.required
	    ]);
	    this.surname = new FormControl('', [
	      Validators.required
	    ]);
	    this.dob = new FormControl('', [
	      Validators.required
	    ]);
	    this.phone = new FormControl('', [
	      Validators.required
	    ]);
	    this.city = new FormControl('', [
	      Validators.required
	    ]);
	    this.street = new FormControl('', [
	      Validators.required
	    ]);
	    this.numberval = new FormControl('', [
	      Validators.required
	    ]);
  	}

  	createForm() {
	    this.newForm = new FormGroup({      
	      id: this.id,
	      name:this.name,
	      surname: this.surname,
	      dob:this.dob,
	      phone: this.phone,
	      city:this.city,
	      street: this.street,
	      numberval:this.numberval
	    });
  	}

  	/// list of users
  	getUsers(): void {
   	 	this.userService.getUsers()
        .subscribe(users => this.users = users);
        console.log(this.users);
        this.newuser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.newuser != '' && this.newuser != undefined && this.newuser != null){
        	this.users= this.users.concat(this.newuser);
        	console.log(this.users);
        	localStorage.setItem('updatedUsers', JSON.stringify(this.users));
        }else{
        	localStorage.setItem('updatedUsers', JSON.stringify(this.users));
        }

  	}

  	clearVal(){
  		this.searchText = '';
  	}

  	/// edit record
  	editItem(ind){
  		this.arrIndex = ind;
  		this.editValues = this.users[ind];
		  this.defaultView = false;
	  	this.editView = true;  	
  	}

  	updateItem(){
	  	this.users[this.arrIndex] = this.newForm.value;
	  	this.defaultView = true;
	  	this.editView = false;
  	}

  	///delete record
  	deleteItem(indexVal){
  		this.userId = indexVal;
	    const Params = {
  			"id":this.userId
         }
	    this.apiurlsService.delete(Params)
	      .subscribe(
	        data => {
	          	for(let i = 0; i < this.users.length; ++i){
		            if (this.users[i].id === indexVal) {
		                this.users.splice(i,1);
		            }
		        }
	          	///alert('User Removed');         
	        },
	        err => {
		        alert('Couldnt Remove');
	          	this.errors = err;
	        }
	    );
  	}

  	ngOnDestroy() {
	    
  	}
}
