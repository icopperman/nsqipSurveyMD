import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
//import { FormGroup }                 from '@angular/forms';

import { NsqipDataService } from '../../shared/nsqip-data.service';
import { Question, NsqipPage, PQs, Patient, PatientWithAnswers, Answer } from '../../models/nqsip-data';
import { PageBoxesComponent } from '../page-boxes/page-boxes.component';
import { PageYesNoComponent } from '../page-yes-no/page-yes-no.component';

@Component({
  selector: 'app-questions1',
  templateUrl: './questions.component1.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent1 implements OnInit, OnDestroy {

  Pages: NsqipPage[];
 // patient: Patient;
  patientWithAnswers: PatientWithAnswers;

  prevPages: number[];
  currentPageNumIdx: number;
  @ViewChild('questionContainer', { read: ViewContainerRef }) questionContainer: ViewContainerRef;

  constructor(private router: Router,  private cfr: ComponentFactoryResolver, private q: NsqipDataService  ) {

    console.log('survey constructor');

  }

  ngOnInit() {

    const id = window.localStorage.getItem('id');

    this.q.getQuestions(id).subscribe((pqs: PQs) => {

      this.Pages              = pqs.pages;
      //this.patient            = pqs.patient;
      this.patientWithAnswers = pqs.patientWithAnswers;

      this.currentPageNumIdx = 0;
      this.prevPages         = [];

      this.createNewComponent(this.currentPageNumIdx);

    });

  }

  onAction(nextPage: number): void {

    if (nextPage === 99) {

      this.router.navigate(['/confirm']);
      return;

    }

    this.prevPages.push(this.currentPageNumIdx);

    this.currentPageNumIdx = nextPage - 1;

    this.createNewComponent(this.currentPageNumIdx);

  }

  goBack() {


    if ( this.prevPages.length == 0 ) {

      return;
    }

    this.currentPageNumIdx = this.prevPages.pop();

    this.createNewComponent(this.currentPageNumIdx);

  }

  createNewComponent(pageNumber: number) {

    this.questionContainer.clear();

    let factory          = null;
    let componentRef     = null;

    const componentType  = this.Pages[pageNumber].pageType;
    
    factory              = (componentType === 'yesno') ? this.cfr.resolveComponentFactory(PageYesNoComponent) : this.cfr.resolveComponentFactory(PageBoxesComponent);
    componentRef         = this.questionContainer.createComponent(factory);

    //set up parms the component expects
    componentRef.instance.Page               = this.Pages[pageNumber];
    componentRef.instance.patientWithAnswers = this.patientWithAnswers;

    //wire up action that the component will emi
    componentRef.instance.action.subscribe(e => this.onAction(e));

  }

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;
  }

  ngOnDestroy(): void {

    // throw new Error('Method not implemented.');

  }

}
