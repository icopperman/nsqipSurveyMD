import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NsqipDataService } from './shared/nsqip-data.service';
import { Router, ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private q: NsqipDataService, private location: Location, r: Router, a: ActivatedRoute  ) {

      const path = this.location.path();
      q.pathid   = path.split('=')[1];

  }

  ngOnInit(): void {  }

}

// if ( path == undefined || path == "") {
    //   //path = "a";
    //   //throw error
    // }
    // else {
    //   if (path.indexOf('?') != -1 ) {
    //     path = path.split('=')[1]
    //   }
    //   else {
    //     path = 'a'
    //   }
    // }

    // this.getQuestions();

    // this.getPages();

    // router.navigate(['/login', path])
