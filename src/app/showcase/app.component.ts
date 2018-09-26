import { Component, OnInit, ViewChild } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import { HumorService } from './service/humor.service';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BodygallComponent } from '../showcase/bodygall/bodygall.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ HumorService, UserService ],
  animations: [
      trigger('overlayState', [
          state('hidden', style({
              opacity: 0
          })),
          state('visible', style({
              opacity: 1
          })),
          transition('visible => hidden', animate('400ms ease-in')),
          transition('hidden => visible', animate('400ms ease-out'))
      ]),
  
      trigger('notificationTopbar', [
        state('hidden', style({
          height: '0',
          opacity: 0
        })),
        state('visible', style({
          height: '*',
          opacity: 1
        })),
        transition('visible => hidden', animate('400ms ease-in')),
        transition('hidden => visible', animate('400ms ease-out'))
      ])
  ],
})
export class AppComponent implements OnInit{
    @ViewChild(BodygallComponent)
    private bodygallComponent : BodygallComponent;

    menuActive: boolean;
    
    activeMenuId: string;
    
    notification: boolean = false;
    constructor(
        private location : Location,
        private route: ActivatedRoute,
        private router: Router,
      ){

      }
    ngOnInit() {
      setTimeout(()=>this.notification = true , 1000)


    }
    
    changeTheme(event: Event, theme: string) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
        event.preventDefault();
    }
    
    onMenuButtonClick(event: Event) {
        console.log('aa')
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
    
    closeNotification(event) {
      this.notification = false;
      event.preventDefault();
    }

    onSelect(t){
        this.menuActive = false
    }
}
