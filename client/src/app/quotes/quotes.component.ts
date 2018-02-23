import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quoteAuthor = {name: '', quotes: []};
  author_id = '';
  quote = {quote: '', rank: 0};
  author = [];
  error = '';
  quotes = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this._route.params.subscribe((params: Params) => {
    //   this.author_id = params['id'];
    //   //this.editAuthor = this.getAuthor(this.author_id)
    //   //console.log("Author to edit", this.editAuthor)
    //   // this.getAuthor(this.author_id)
    //   // this.editAuthor = this.getAuthor(this.author_id);
    //   // console.log("AUTHOR", this.editAuthor)
    //   let observable = this._httpService.getAuthor(this.author_id)
    //   observable.subscribe(data => {
    //     //this.author = data['author'];
    //     console.log("Got the author!", data['author']);
    //     this.quoteAuthor = data['author'];
    //     console.log("AUTHOR", this.quoteAuthor);
    //
    //   })
    //
    // })
    this.getQuotes()
  }
  onDelete(quote_id) {
    console.log("Sending request to delete a quote", quote_id)
    let observable = this._httpService.deleteQuote(this.author_id, quote_id);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error'].errors.name.message
        console.log("ERROR IS!!!", this.error);
      }
      else {
        //this.quoteAuthor = {name: "", quotes: []}
        //this.goHome();
        console.log("Successfully deleted a quote");
        this.getQuotes()
      }
    })
  }
  // goHome() {
  //   this._router.navigate(['/quotes/'+this.author_id]);
  // }
  onVoteUp(quote_id) {
    //quote.rank ++;
    console.log("Sending request to backend to update", quote_id)
    let observable = this._httpService.vote(this.author_id, quote_id);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error'].errors.name.message
        console.log("ERROR IS!!!", this.error);
      }
      else {
        console.log("Successfully updated a quote");
      }
      //this.getAuthors();
    })
  }
  onVoteDown(quote) {
    quote.rank --;
    console.log("QUOTE RANK", quote)
  }
  getQuotes(){
    this._route.params.subscribe((params: Params) => {
      this.author_id = params['id'];
      //this.editAuthor = this.getAuthor(this.author_id)
      //console.log("Author to edit", this.editAuthor)
      // this.getAuthor(this.author_id)
      // this.editAuthor = this.getAuthor(this.author_id);
      // console.log("AUTHOR", this.editAuthor)
      let observable = this._httpService.getAuthor(this.author_id)
      observable.subscribe(data => {
        //this.author = data['author'];
        console.log("Got the author!", data['author']);
        this.quoteAuthor = data['author'];
        console.log("AUTHOR", this.quoteAuthor);

      })

    })
  }
}
