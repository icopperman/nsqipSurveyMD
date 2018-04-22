import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
//import { FormGroup }                 from '@angular/forms';

import { NsqipDataService } from '../../shared/nsqip-data.service';
import {
  Question,
  NsqipPage,
  PQs,
  Patient,
  PatientWithAnswers
} from '../../models/nqsip-data';

@Component({
  //selector   : 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls  : ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  Pages             : NsqipPage[];
  patient           : Patient;
  patientWithAnswers : PatientWithAnswers;
  currentPage       : number;
  prevPages         : number[];

  @ViewChild('container', { read: ViewContainerRef}) container : ViewContainerRef;

  constructor(
    //private route: ActivatedRoute,
    private router: Router,
    private q: NsqipDataService
  ) {

    console.log('survey constructor');

    this.currentPage = 1;
    this.prevPages = [];

  }

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }

  onAction(nextPage: number): void {
    if (nextPage === 99) {
      this.router.navigate(['/confirm']);
    } else {
      if (nextPage === -1) {
        this.currentPage = this.prevPages.pop();
      } else {
        this.prevPages.push(this.currentPage);
        this.currentPage = nextPage;
      }
    }
  }

  ngOnInit() {
    console.log('here');
    this.getQuestions();
  }

  getQuestions(): void {
    const id = window.localStorage.getItem('id');
    this.q.getQuestions(id).subscribe((pqs: PQs) => {
      this.Pages              = pqs.pages;
      this.patient            = pqs.patient;
      this.patientWithAnswers =  pqs.patientWithAnswers;
    });
  }
}
