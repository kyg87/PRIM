import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HumorService } from '../service/humor.service';


@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  ipAddress: any; //user ip
  data : any;
  constructor(
    private http: HttpClient,
    private service : HumorService) { }


  ngOnInit() {

    this.http.get('https://jsonip.com').subscribe((ipOfNetwork) => {

     
      this.ipAddress = ipOfNetwork['ip']
      console.log(this.ipAddress)

      var user = {
        ip : this.ipAddress
      }

      this.service.getSiteEnter(user).subscribe(data=>{
        console.log(data)

        var currentDay = new Date();
        var dbDay = new Date(data[0][0].connected_dt);
        
        console.log(currentDay, currentDay.getTime())
        console.log(dbDay, dbDay.getTime())
        var timeDiff = (currentDay.getTime() - dbDay.getTime()) /1000;

        console.log(timeDiff)

      })

    });
  }

  getNaverRank(){
    console.log('getNaverRank click')
    this.service.getNaverRank().subscribe( data=>{
      this.data = data;
      console.log(this.data)
    })
  }

  

}
