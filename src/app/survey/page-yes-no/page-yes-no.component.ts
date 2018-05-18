import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NsqipDataService } from '../../shared/nsqip-data.service';
import { Question, NsqipPage, Patient, Answer,  PatientWithAnswers} from '../../models/nqsip-data';

@Component({
  selector: 'app-page-yes-no',
  templateUrl: './page-yes-no.component.html',
  styleUrls: ['./page-yes-no.component.css']
})
export class PageYesNoComponent implements OnInit {

  @Input() Page               : NsqipPage;
  @Input() patientWithAnswers : PatientWithAnswers;

  pageQuestions    : Question[];
  questionsEnglish : Question[];
  questionsSpanish : Question[];

  @Output() action = new EventEmitter<number>();

  constructor(private q: NsqipDataService) {}

  ngOnInit() {

    console.log('yesno init');
    
    this.questionsEnglish = JSON.parse(JSON.stringify(this.Page.pageQuestions));
    this.questionsSpanish = JSON.parse(JSON.stringify(this.Page.pageQuestions));

    this.questionsSpanish.map( (q: Question) => q.questionText = q.questionTextSpanish );

    this.pageQuestions = ( this.q.language === 'es') ? this.questionsSpanish : this.questionsEnglish;

  }

  ans(theQuestion: Question, questionAnswer: string) {

    this.patientWithAnswers.answers[+theQuestion.questionNo - 1].answer = questionAnswer;

    let rc = 0;

    switch (questionAnswer) {

      // case 'back': rc = -1; break;
      case 'yes' : rc = +theQuestion.questionNextYes; break;
      case 'no'  : rc = +theQuestion.questionNextNo; break;

    }

    this.action.emit(rc);

  }

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;

  }

}

