import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HumorService } from '../service/humor.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
  cols: any[];
  youtubeData : any;
  url : any;
  // player : any;
  player: YT.Player;
  id: string = '';
  playList = [];

  types: any[];
  selectedType: string = "K-POP";
  update_dt : any;
  constructor(
    private service : HumorService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getYoutubeMusic(this.selectedType)

    this.cols = [
      { field: 'title', header: 'Title' },
    ];

    this.types = [
      {label: 'K-POP', value: 'K-POP', icon: 'fa fa-fw fa-music'},
      {label: 'J-POP', value: 'J-POP', icon: 'fa fa-fw fa-music'},
      {label: 'Indi', value: 'Indi', icon: 'fa fa-fw fa-music '},
    ];
  
  }
  savePlayer (player) {
    this.player = player;
    // console.log('player instance', player)
    this.player.cueVideoById(this.youtubeData[0].videoId)
   
    this.player.cuePlaylist(this.playList)
    }
  onStateChange(event){
    // console.log('player state', event.data);
  }

  getYoutubeMusic(type){
    this.playList = []
    this.service.getYoutubeMusic(type).subscribe(data=>{
      for(var item of data){
        var url = "https://www.youtube.com/embed/" + item.videoId;
        item.url = this._sanitizer.bypassSecurityTrustResourceUrl(url);
        this.playList.push(item.videoId)
      }
      this.youtubeData = data;
      this.url = this.youtubeData[0].url;
      this.id = this.youtubeData[0].videoId;
      console.log(this.youtubeData)
      console.log(this.youtubeData[0].update_dt)
      this.update_dt = this.youtubeData[0].update_dt
    })

  }
  onRowSelect(event) {
    // console.log(event)
    // console.log(event.data)

    // this.url = event.data.url

    // var iframe = document.getElementsByTagName("iframe").item(0);
    // console.log(iframe)
    
    // iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    // console.log(iframe)
    // this.player.cueVideoById(event.data.videoId)
    // this.player.cuePlaylist(this.playList, (event.data.rank - 1))
    var test = this.playList.findIndex(function(element){
      return  element == event.data.videoId
    })
   
    this.player.loadPlaylist(this.playList, test)
    // this.player.loadVideoById(event.data.videoId)
  }

  onClick(){

    this.getYoutubeMusic(this.selectedType)
  }


}
