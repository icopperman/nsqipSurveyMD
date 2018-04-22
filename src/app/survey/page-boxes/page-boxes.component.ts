import { Component, Input, Output, AfterViewInit, OnInit, EventEmitter } from '@angular/core';
//import { FormGroup } from "@angular/forms";
import {NsqipDataService} from '../../shared/nsqip-data.service';
import {NsqipPage, PatientWithAnswers, Question, Answer} from '../../models/nqsip-data';

@Component({
  selector: 'app-page-boxes',
  templateUrl: './page-boxes.component.html',
  styleUrls: ['./page-boxes.component.css']
})
export class PageBoxesComponent implements OnInit, AfterViewInit {

  @Input() Page : NsqipPage;
  @Input() patientWithAnswers : PatientWithAnswers;

  @Output() action : EventEmitter<number> = new EventEmitter<number>();

  pageNumber       : number;
  pageQuestions    : Question[];
  questionsEnglish : Question[];
  questionsSpanish : Question[];
  answers          : string[] =  [];

  constructor( private q: NsqipDataService) {  }

  ngOnInit() {

    console.log('box init');

    this.pageNumber = this.Page.pageNumber;

    this.questionsEnglish = JSON.parse(JSON.stringify(this.Page.pageQuestions));
    this.questionsSpanish = JSON.parse(JSON.stringify(this.Page.pageQuestions));

    this.questionsSpanish.map( (q: Question) => q.questionText = q.questionTextSpanish );

    this.pageQuestions = ( this.q.language === 'es') ? this.questionsSpanish : this.questionsEnglish;

  }

  ngAfterViewInit(): void {

    this.pageNumber = this.Page.pageNumber;
    this.pageQuestions = this.Page.pageQuestions;

  }

  ans(page: NsqipPage, questionAnswer: string) {

    const apatient    = this.patientWithAnswers;
    const currentPage = page.pageNumber;
    const nextPage    = page.pageQuestions[0].questionNextYes;

    for (let i = 0; i < this.answers.length; i++) {

      const theAns : Answer = new Answer();

      theAns.questionNumber = page.pageQuestions[i].questionNo;
      theAns.questionText = page.pageQuestions[i].questionText;
      theAns.questionType = page.pageQuestions[i].questionType;

      theAns.answer = this.answers[i];

      apatient.answers[+theAns.questionNumber - 1].answer = theAns.answer;

    }

    const rc = ( questionAnswer === 'back') ? -1 : +nextPage;

    this.action.emit(rc);

  }

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }

}
