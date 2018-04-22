import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
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
import {PageBoxesComponent} from '../page-boxes/page-boxes.component';
import { PageYesNoComponent } from '../page-yes-no/page-yes-no.component';

@Component({
  selector   : 'app-questions1',
  templateUrl: './questions.component1.html',
  styleUrls  : ['./questions.component.css']
})
export class QuestionsComponent1 implements OnInit, OnDestroy {

  Pages             : NsqipPage[];
  patient           : Patient;
  patientWithAnswers : PatientWithAnswers;
  currentPage       : number;
  prevPages         : number[];

  @ViewChild('questionContainer', { read: ViewContainerRef}) questionContainer : ViewContainerRef;

  constructor(
    //private route: ActivatedRoute,
    private router: Router,
    private cfr: ComponentFactoryResolver,
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
        const currPage   = this.Pages[nextPage];
        const pagetype   = currPage.pageType;
        let factory      = null;
        let componentRef = null;

        this.questionContainer.clear();

        factory = ( pagetype === 'yesno') ?
           this.cfr.resolveComponentFactory(PageYesNoComponent)
         : this.cfr.resolveComponentFactory(PageBoxesComponent);

        componentRef                             = this.questionContainer.createComponent(factory);
        componentRef.instance.Page               = this.Pages[nextPage];
        componentRef.instance.patientWithAnswers = this.patientWithAnswers;

        componentRef.instance.action.subscribe(e => this.onAction(e) );

      }
    }
  }

  ngOnInit() {

    console.log('here');

    const id = window.localStorage.getItem('id');

    this.q.getQuestions(id).subscribe((pqs: PQs) => {

      this.Pages                               = pqs.pages;
      this.patient                             = pqs.patient;
      this.patientWithAnswers                  = pqs.patientWithAnswers;

      const factory                            = this.cfr.resolveComponentFactory(PageYesNoComponent);
      const componentRef                       = this.questionContainer.createComponent(factory);

      componentRef.instance.Page               = pqs.pages[0];
      componentRef.instance.patientWithAnswers = pqs.patientWithAnswers;

      componentRef.instance.action.subscribe(e => this.onAction(e) );

    });

  }

  ngOnDestroy(): void {

   // throw new Error('Method not implemented.');

  }

}
