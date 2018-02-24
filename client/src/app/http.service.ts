import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors');
  }
  getAuthor(author_id){
    console.log('ID is', author_id);
    // let tempObservable = this._http.get('/tasks/5a84f4c3d7dee2b8012d96ae');
    // tempObservable.subscribe(data => console.log("Got the task!", data));
    return this._http.get('/authors/'+author_id);
  }
  deleteAuthor(author_id){
    console.log('request to delete');
    return this._http.delete('/authors/'+author_id);
  }
  editAuthor(editAuthor){
    console.log('request to edit', editAuthor._id);
    return this._http.put('/authors/'+editAuthor._id, editAuthor);
  }
  addAuthor(newauthor){
    console.log("sending request to backend to add new", newauthor)
    return this._http.post('/authors', newauthor);
  }
  addQuote(quoteauthor_id, quote){
    console.log("sending request to backend to add new quote", quoteauthor_id, quote)
    return this._http.put('/quotes/'+quoteauthor_id, quote);
  }
  deleteQuote(quoteauthor_id, quote_id){
    console.log("sending request to backend to delete a quote", quoteauthor_id, quote_id)
    return this._http.delete('/quotes/'+quoteauthor_id+'/'+quote_id);
  }
  vote(quoteauthor_id, quote_id, up_or_down){
    console.log("UP OR DOWN", up_or_down)
    console.log("sending request to backend to vote up a quote", quoteauthor_id, quote_id, up_or_down)
    return this._http.put('/vote/'+quoteauthor_id+'/'+quote_id+'/'+up_or_down, up_or_down);
  }
}
