import { Component, OnInit, Input } from '@angular/core';
import { HumorService } from '../../service/humor.service'

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { parse } from 'url';
import { Parser } from '@angular/compiler/src/ml_parser/parser';

import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {SelectItem} from '../../../components/common/api';

@Component({
  selector: 'app-instargall',
  templateUrl: './instargall.component.html',
  styleUrls: ['./instargall.component.css']
})
export class InstargallComponent implements OnInit {
  id : any;
  selectMenu: any;
  data : any;

  page : number;
  totalPage : number;

  startPageNo : number;
  endPageNo : number;

  pages : number[] = [];
  
  constructor(
    private carService: CarService,
    private humorService : HumorService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router) { }

  ngOnInit() {

    var page = this.route.snapshot.paramMap.get('page');

    if(page != null) {
      this.page = parseInt(page);
    }

    this.humorService.getInstars('page',50).subscribe(data=>{
      this.totalPage = data.page;
      
      this.onComplete(data);
      console.log(this.data);
      this.startPageNo = this.getStartPageNo();
      this.endPageNo = this.getEndPageNo();
      for(var i = this.startPageNo; i <= this.endPageNo;i++){
        this.pages.push(i);
      }
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
   
    this.router.events.subscribe((evt) => {

      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);

    });
  }
  onComplete(data){
    
    for(var i = 0 ; i < data.value.length;i++){
      if(data.value[i].mp4 == ''){
        var galleryImages = [];
        for(var k = 0; k < data.value[i].imgs.length;k++){
          var temp = {
            source: data.value[i].imgs[k].src,
            alt : 'desc',
            title :'title'
          }
          galleryImages.push(temp);

        }
        data.value[i].galleryImages = galleryImages;
      }
      
    }
  
    this.data = data.value;
  }

  getCurrentPageGroup(){

    let pageGroupCount = 10;
    let currentPageGroup;

    if(this.page % pageGroupCount!=0){
      currentPageGroup = (this.page/pageGroupCount) + 1;
    }else{
      currentPageGroup = this.page/pageGroupCount;
    }


    return parseInt( currentPageGroup);
  }

  getStartPageNo(){

    let startPageNo = 10 * (this.getCurrentPageGroup()-1) + 1

    return startPageNo;

  }

  getEndPageNo(){
    let endPageNo = 10 * this.getCurrentPageGroup();

    if(endPageNo > this.totalPage){
      endPageNo = this.totalPage;
    }
    return endPageNo;
  }

  changeRoute(page){
    this.router.navigateByUrl('/humorboard/'+page);

  }

  onSelect(menu){
    this.selectMenu = menu;
    console.log(this.selectMenu);
  }

}
