import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  quoteAuthor = {name: '', quotes: []};
  author_id = '';
  quote = {quote: '', rank: 0};
  error = '';
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.author_id = params['id'];
      let observable = this._httpService.getAuthor(this.author_id)
      observable.subscribe(data => {
        //this.author = data['author'];
        console.log("Got the author!", data['author']);
        this.quoteAuthor = data['author'];
        console.log("AUTHOR", this.quoteAuthor)
      })
    })
  }
  onAdd(){
    console.log("Trying to create new quote", this.quote, "for", this.quoteAuthor);
    let observable = this._httpService.addQuote(this.author_id, this.quote);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error'].errors.name.message
        console.log("ERROR IS!!!", this.error);
      }
      else {
        this.quoteAuthor = {name: "", quotes: []}
        this.goHome();
      }
      //this.getAuthors();
    })
  }
  goHome() {
    this._router.navigate(['/quotes/'+this.author_id]);
  }
}
