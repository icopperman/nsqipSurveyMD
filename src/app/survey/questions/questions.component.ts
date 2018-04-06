import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FormGroup }                 from '@angular/forms';

import { NsqipDataService } from '../../shared/nsqip-data.service';
import { Question, NsqipPage, PQs, Patient, PatientWithAnswers } from '../../models/nqsip-data';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  Pages              : NsqipPage[];
  patient            : Patient;
  patientWithAnswers : PatientWithAnswers;
  currentPage        : number;
  prevPages          : number[];

  //@Input()
  //questions: QuestionBase<any>[] = [];
  //@Input()
  //adultQuestions: question[];
  //@Input()

  //allTheData: allData;

//  form: FormGroup;
//  nsqipForm: FormGroup;

//  payLoad = '';

  constructor(
    //private route: ActivatedRoute,
    private router: Router, private q: NsqipDataService) {

    console.log('survey constructor');

    this.currentPage = 1;
    this.prevPages = [];

  }
  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }
  onAction(nextPage: number): void {

    if ( nextPage === 99) {

      this.router.navigate(['/confirm']);
    } else {

      if ( nextPage === -1) {

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

    //this.form = this.qcs.toFormGroup(this.questions);
    //this.nsqipForm = this.qcs.nsqipFormGroup(this.adultQuestions)
    //this.adultPages = this.route.snapshot.data['pages'];
    //this.adultQuestions = this.route.snapshot.data['questions'];

    //this.adultPages = this.allTheData.pages;
    //this.adultQuestions = this.allTheData.questions.adults;


    // this.getPages();

   // let i = 0;
}

getQuestions(): void {

  const id = window.localStorage.getItem('id');
  this.q.getQuestions(id)
  .subscribe( (pqs: PQs) => {

    this.Pages = pqs.pages;
    this.patient = pqs.patient;
    this.patientWithAnswers = pqs.patientWithAnswers;

    // if ( this.patient.patientLanguage == 'es') {

    //   this.Pages.forEach( p => {

    //     p.pageQuestions.forEach( q => {

    //       q.questionText = q.questionTextSpanish

    //     });

    //   });

    // }
    // this.nsQuestions = questions;
    // this.adultQuestions = pqs.questions;
    // let z = questions.children;
    // console.log(this.adultQuestions);

  });

}

// getPages(): void {

//   this.q.getPages().subscribe(pages =>  {
//     this.adultPages = pages;
//     console.log(this.adultPages);

//   });
// }
  // onSubmit() {
  //   this.payLoad = JSON.stringify(this.form.value);
  // }
}
