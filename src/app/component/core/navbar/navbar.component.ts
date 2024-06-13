import { HttpClient } from '@angular/common/http';
import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

import { Category, responseCategory, responseRequestAdminCount } from '../../../model/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showMobileSearch: boolean = false // Imposta il valore predefinito a true


  enteredSearchValue = '';


  categories: Category[] | null = [];


  constructor(private http: HttpClient, public BasicAuth: AuthService, public Logout: AuthService, private router: Router) { }

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();



  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }

  // reload() {
  //   location.href

  // }


  ngOnInit() {
    this.loadCategories();

  }


  private loadCategories(): void {
    this.http.get<Category[]>('https://localhost:7157/api/Category', { observe: "response"}).subscribe(
      (response) => {
        console.log(response);
        console.log(response.body);
        this.categories = response.body || null;
        console.log(this.categories);
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }



}




