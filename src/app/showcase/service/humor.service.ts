import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Injectable()
export class HumorService{
    constructor(private http:Http){
    }

    getHumors(page ,size){
        return this.http.get('https://motherbirds.com/api/star?page='+page + '&size='+ size).
        pipe(
            map(res=>res.json())
        )
           
    }

    getHumor(id){
        return this.http.get('https://motherbirds.com/api/star/'+id).
        pipe(
            map(res=>res.json())
        )
    }

    getBodyGalls(page ,size){
        return this.http.get('https://motherbirds.com/api/bodygall?page='+page + '&size='+ size).
        pipe(
            map(res=>res.json())
        )
    }

    getBodyGall(id){
        return this.http.get('https://motherbirds.com/api/bodygall/'+id).
        pipe(
            map(res=>res.json())
        )
    }

    getInstars(page ,size){
        return this.http.get('https://motherbirds.com/api/he_le_n_?page='+page + '&size='+ size)
        .
        pipe(
            map(res=>res.json())
        )
    }
    getInstaList(){
        return this.http.get('https://motherbirds.com/api/instalist')
        .
        pipe(
            map(res=>res.json())
        )
    }

    getInstar(instaId, page ,size){
        return this.http.get('https://motherbirds.com/api/he_le_n_/'+instaId+'?page='+ page +'&size=' + size)
        .
        pipe(
            map(res=>res.json())
        )
    }

    getAvSearch(cid){
        return this.http.get('https://motherbirds.com/api/av?cid='+ cid)
        .
        pipe(
            map(res=>res.json())
        )
    }

    // addBoard(newBoard){
    //     var headers = new Headers();

    //     headers.append('Content-Type', 'application/json');
    //     return this.http.post('http://localhost:3000/api/board',JSON.stringify(newBoard),{headers :headers}).map(res =>res.json());
    // }
    getComments(board_id){
        return this.http.get('https://motherbirds.com/api/comments?board_id='+ board_id)
        .
        pipe(
            map(res=>res.json())
        )
    }
    addComment(newBoard){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http.post('https://motherbirds.com/api/comments',JSON.stringify(newBoard),{headers :headers}).
        pipe(
            map(res=>res.json())
        )
    }
}
