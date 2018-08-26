import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MessageService } from '../../components/common/messageservice';
import { HumorService } from '../service/humor.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  
})
export class CommentsComponent implements OnInit {
  
  id : any; //page id
  ipAddress: any; //user ip
  name : any;
  password : any;
  comment: any;

  //
  data : any;

  constructor(private http: HttpClient,
    private toastr : ToastrService,
    private service : HumorService) {
    this.http.get('https://jsonip.com').subscribe((ipOfNetwork) => {

      this.ipAddress = ipOfNetwork['ip']

    });
         
   }

  ngOnInit() {

  }

  onInit(id){
    console.log(id);
    this.id = id;

    this.getComments();
  }

  getComments(){
    this.service.getComments(this.id).subscribe((data)=>{
      console.log(data);
      this.data = data[0];
    })
  }
  addComment(){

    if(this.password == undefined || 
        this.password == ''){
  
    }
    this.showSuccess();
    var board = {
      id : this.id,
      ip : this.ipAddress,
      name : this.name,
      password : this.password,
      comment : this.comment
    }
    console.log(board)
   
    this.service.addComment(board).subscribe((t)=>{
      console.log('등록');
      this.getComments();
    })
  }

 showSuccess(){
   this.toastr.success('message','title');
   
 }


}
