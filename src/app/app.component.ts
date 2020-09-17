import { Component } from '@angular/core';
import { CommonService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  moviesavailable:boolean = false;
  headElements = ['Name', 'Rating', 'Duration', 'Genre'];
  moviesList:any[] = [];
  groups = 2;
  peoplesToShow = 2;
  public searchText : string;
  constructor(public commonService: CommonService) {
  }

  searchData(){
    this.commonService.postData("search")
    .subscribe((result:any) => {
        console.log("result",result);
        this.moviesList = result;
        this.moviesavailable = true;
      });
  }
}
