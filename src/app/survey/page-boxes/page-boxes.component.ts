import { Component, Input, Output, AfterViewInit, OnInit, EventEmitter } from '@angular/core';
//import { FormGroup } from "@angular/forms";
import { NsqipDataService } from '../../shared/nsqip-data.service';
import { Question, NsqipPage, Patient, Answer, PatientWithAnswers } from '../../models/nqsip-data';

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

  // form: FormGroup;
  // nsqipForm: FormGroup;

  // payLoad = "";

  constructor( private q: NsqipDataService) {
    console.log('box cons');
  }

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }

  ngOnInit() {

    console.log('box init');

    this.pageNumber = this.Page.pageNumber;

    //this.questionsEnglish = Object.assign({},this.Page.pageQuestions)
    //this.questionsSpanish = Object.assign({},this.Page.pageQuestions);

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

    if ( questionAnswer === 'back') {

      this.action.emit(-1);

    } else {

      this.action.emit(+nextPage);

    }


  }

  // onSubmit() {
  //   this.payLoad = JSON.stringify(this.form.value);
  // }

}
