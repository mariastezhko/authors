import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors = [];
  author = [];
  id = '';
  newAuthor: any;
  editAuthor = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newAuthor = {name: ""}
    this.getAuthors()
  }
  getAuthors(){
    console.log("Trying to retrieve authors!")
    let observable = this._httpService.getAuthors()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.authors = data['authors'];
      console.log("Got our authors!", this.authors)
    })
  }
  // taskOnClick(event: any){
  //   this.task = [];
  //   this.id = event.target.value;
  //   let observable = this._httpService.getTask(this.id)
  //   observable.subscribe(data => {
  //     console.log("Clicked the button!", this.id)
  //     this.task = data['task'];
  //     console.log("Got our task!", this.task)
  //   })
  // }

  editOnClick(author){
    console.log("Author we need to edit", author._id);
    console.log("Author name", author.name);
    // Load Edit component
  }

  onDelete(author_id){
    let observable = this._httpService.deleteAuthor(author_id);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.getAuthors();
    })
  }
}
