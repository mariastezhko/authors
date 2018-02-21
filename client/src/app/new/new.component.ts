import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }
  onEdit(editAuthor){
    console.log("Edit the author", editAuthor._id)
    let observable = this._httpService.editAuthor(editAuthor);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
    })
  }
}
