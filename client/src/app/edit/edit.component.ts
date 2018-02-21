import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editAuthor = {name: ''};
  author_id = '';
  author = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
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
        this.editAuthor = data['author'];
        console.log("AUTHOR", this.editAuthor)
      })

    })
  }
  onEdit(editAuthor){
    console.log("Edit the author", editAuthor._id)
    let observable = this._httpService.editAuthor(editAuthor);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.goHome();
    })
  }
  getAuthor(id){
    console.log("Trying to get author", id)
    this.author = [];
    let observable = this._httpService.getAuthor(id)
    observable.subscribe(data => {
      //this.author = data['author'];
      console.log("Got the author!", data['author']);
      return data['author'];
    })
  }
  goHome() {
    this._router.navigate(['/authors']);
  }
}
