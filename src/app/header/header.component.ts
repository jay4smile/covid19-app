import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  logout(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['login']);
    this.isLoggedIn = false;
  }
}
