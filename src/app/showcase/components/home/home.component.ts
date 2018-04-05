import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private location : Location,
    private router : Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
  }

  ngOnInit() {
  }

}
