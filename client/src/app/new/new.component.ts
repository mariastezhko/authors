import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;
  error = '';

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.newAuthor = {name: "", quotes: []}
  }

  onAdd(){
    console.log("Trying to create new", this.newAuthor);
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error'].errors.name.message
        console.log("ERROR IS!!!", this.error);
      }
      else {
        this.newAuthor = {name: "", quotes: []}
        this.goHome();
      }
      //this.getAuthors();
    })
  }
  goHome() {
    this._router.navigate(['/authors']);
  }
}
