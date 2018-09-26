import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HumorService } from '../service/humor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Car } from '../domain/car';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  ipAddress: any; //user ip
  data : any;
  youtubeData: any;
  news : Car[];
  images: any = [];
  selectedCar3: Car;
  cols: any[];

  constructor(
    private http: HttpClient,
    private service : HumorService,
    private _sanitizer: DomSanitizer) { }

    player: YT.Player;
    private id: string = 'qDuKsiwS5xw';

    
    savePlayer(player) {
      this.player = player;
      console.log('player instance', player);
    }
    onStateChange(event) {
      console.log('player state', event.data);
    }

    ngOnInit() {
     
    this.youtubeData = null;

    this.http.get('https://jsonip.com').subscribe((ipOfNetwork) => {

     
      this.ipAddress = ipOfNetwork['ip']
      //console.log(this.ipAddress)

      var user = {
        ip : this.ipAddress
      }

      this.service.getSiteEnter(user).subscribe(data=>{
        //console.log(data)

        var currentDay = new Date();
        var dbDay = new Date(data[0][0].connected_dt);
        
        //console.log(currentDay, currentDay.getTime())
        //console.log(dbDay, dbDay.getTime())
        var timeDiff = (currentDay.getTime() - dbDay.getTime()) /1000;

        //console.log(timeDiff)
        this.getNaverRank();
      })

    });

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'src', header: 'Src' },

  ];
  }

  getNaverRank(){
    console.log('getNaverRank click')
    this.service.getNaverRank().subscribe(data=>{
      var temp = [];

      for(var i=0; i < 5;i++){
        temp.push(data[i])
      }
      this.data = temp;
      //console.log('getNaverRank',this.data);
      this.getYoutube(this.data[0].name);
      this.getNaverNews(this.data[0].name);
      this.getNaverImages(this.data[0].name);
    })
  }

  getYoutube(q){
  
    this.service.getYoutube(q).subscribe(data=>{
      

      for(var item of data.items){
        var url = "https://www.youtube.com/embed/" + item.id.videoId;
        item.url = this._sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      this.youtubeData = data;
    })
   
  }

  getNaverNews(q){
    this.service.getNaverNews(q).subscribe(data=>{
      console.log('getNaverNews',data)

      this.news = data;
    })
  }

  getNaverImages(q){
    this.service.getNaverImages(q).subscribe(data=>{
      console.log('getNaverImages',data)

      for(var i = 0; i < data.length; i++){
        var temp = {
          source: data[i].url,
          alt: '',
          title: ''
        }
        this.images.push(temp);
      }

     


    })
  }

  onRowSelect(event) {
    console.log(event)
    console.log(event.data)
  }

  ngOnDestroy(){
   
  }

  

}
