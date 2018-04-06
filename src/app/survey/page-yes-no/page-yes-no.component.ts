import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NsqipDataService } from '../../shared/nsqip-data.service';
import {
  Question,
  NsqipPage,
  Patient,
  Answer,
  PatientWithAnswers
} from '../../models/nqsip-data';

@Component({
  selector: 'app-page-yes-no',
  templateUrl: './page-yes-no.component.html',
  styleUrls: ['./page-yes-no.component.css']
})
export class PageYesNoComponent implements OnInit {

  @Input() Page               : NsqipPage;
  @Input() patientWithAnswers : PatientWithAnswers;
  pageNumber                  : number;
  pageQuestions               : Question[];

  @Output() action = new EventEmitter<number>();


  // form: FormGroup;
  //nsqipForm: FormGroup;
  // payLoad = "";

  constructor(private q: NsqipDataService) {}

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }

  ans(page: Question, questionAnswer: string) {

    const currentPage = page.pageNumber;
    const apatient = this.patientWithAnswers;
    const theAns : Answer = new Answer();

    theAns.questionNumber = page.questionNo;
    theAns.questionText = page.questionText;
    theAns.questionType = page.questionType;
    theAns.answer = questionAnswer;

    apatient.answers[+theAns.questionNumber - 1].answer = questionAnswer;

    if (questionAnswer === 'back') {

      this.action.emit(-1);

    } else {

      const nextPage = questionAnswer === 'yes' ? page.questionNextYes : page.questionNextNo;

      this.action.emit(+nextPage);

    }
  }

  ngOnInit() {

    console.log('yesno init');

    this.pageNumber = this.Page.pageNumber;
    this.pageQuestions = this.Page.pageQuestions;

  }

  // onSubmit() {
  //   this.payLoad = JSON.stringify(this.form.value);
  // }

}
