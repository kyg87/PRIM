import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SELECT_VALUE_ACCESSOR } from '../../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor';

declare var daum: any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('map') private mapContainer: ElementRef;	 
  
  pos : any;

  constructor(
    private http: HttpClient,
    private location : Location,
    private router : Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   
  }

  success(pos){
    console.log(pos);
    this.pos = pos;
    this.makeMap(pos);
  }

  error(){
    console.log('거절')
  }


  ngOnInit() {
    navigator.geolocation.getCurrentPosition( (pos)=>{
      this.makeMap(pos);
    }, this.error);
    
  }

  makeMap(pos){
    console.log(pos)
    const element = this.mapContainer.nativeElement;
    var options = {
			center: new daum.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
			level: 3
    };
    
    var infowindow = new daum.maps.InfoWindow({ zIndex: 1 });
    var map = new daum.maps.Map(element, options);

    var ps = new daum.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('이태원 맛집', placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === daum.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new daum.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new daum.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

      // 마커를 생성하고 지도에 표시합니다
      var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭이벤트를 등록합니다
      daum.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }

  searchMap(keyword){
    console.log(keyword)
    const element = this.mapContainer.nativeElement;
    var options = {
			center: new daum.maps.LatLng(37.566826, 126.9786567),
			level: 3
    };
    
    var infowindow = new daum.maps.InfoWindow({ zIndex: 1 });
    var map = new daum.maps.Map(element, options);

    var ps = new daum.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === daum.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new daum.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new daum.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

      // 마커를 생성하고 지도에 표시합니다
      var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭이벤트를 등록합니다
      daum.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }
}
