import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors');
  }
  deleteAuthor(author_id){
    console.log('request to delete');
    return this._http.delete('/authors/'+author_id);
  }
  editAuthor(editAuthor){
    console.log('request to edit', editAuthor._id);
    return this._http.put('/authors/'+editAuthor._id, editAuthor);
  }
}
