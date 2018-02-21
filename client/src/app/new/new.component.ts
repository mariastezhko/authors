import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newAuthor = {name: ""}
  }
  
  onAdd(){
    console.log("Trying to create new", this.newAuthor);
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.newAuthor = {name: ""}
      //this.getAuthors();
    })
  }
}
