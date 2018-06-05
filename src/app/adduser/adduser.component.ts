import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { ApiUrlsService } from '../api-urls.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  	users: User[];
  	searchText: any;
  	usersdata: any = [];
  	errors: any ='';
  	newForm: FormGroup;	

  	id: any = '';
  	name : any = '';
  	surname: any = '';
  	dob : any = '';
  	phone: any = '';
  	city : any = '';
  	street: any = '';
  	numberval : any = '';
  	data: any = {};
  	newUser: any = [];
  	cacheData: any = [];
  	showErr = false;
  	constructor(
  		private userService: UserService,
  		private apiService: ApiService,
  		private apiurlsService: ApiUrlsService,
  		private router: Router,
  		private fb: FormBuilder,
  	) {
  		// use FormBuilder to create a form group
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

  	/// list of users
  	getUsers(): void {
   	 	this.userService.getUsers()
        .subscribe(users => this.users = users);
        console.log(this.users);
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
	submitForm() {
		if(this.newForm.valid){
		this.errors = '';
		const credentials = this.newForm.value;
		console.log(credentials);
		this.apiurlsService.find(credentials)
		.subscribe(
		data => {
			this.newUser.push(credentials);
			console.log(this.newUser);
			localStorage.setItem('currentUser', JSON.stringify(this.newUser));			    
		    this.router.navigateByUrl("/");	
		    this.users.concat(this.newUser);
		    console.log(this.users);	 
		},
		err => {
		  this.errors = 'Failed';
		}
		);
		
		}else{
		  this.showErr = true;
		}
	}

}
