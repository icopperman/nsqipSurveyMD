import { Component,   OnInit } from '@angular/core';
import { NsqipDataService } from '../shared/nsqip-data.service';
import { Router       } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  confirmMessage    : string;
  adultMessage      : string;
  childMessage      : string;
  srcNameCredential : string;
  hospitalName      : string;
  phoneNumber       : string;
  submitted         : boolean = false;

  confirmMessages   : string[][] = [];

  constructor(private q: NsqipDataService, private router: Router) {

    const x    = this.q.getPatientWithAnswers();
    let lang = x.patient.patientLanguage;
    if ( lang == null) { lang = 'en'; }
    this.srcNameCredential = 'sourceName and credentials';
    this.hospitalName      = x.patient.hospitalName;
    this.phoneNumber       = '111-111-1111';

    const aorc               = x.patient.patientType.toLowerCase();
    const adultIdx = 0;
    const childIdx = 1;
    const engIdx = 0;
    const espIdx = 1;

    const rowIdx = (aorc.startsWith('a') === true) ? 0 : 1;
    const colIdx = (lang === 'en') ? 0 : 1;
    this.confirmMessages[0] = [];
    this.confirmMessages[1] = [];

    this.confirmMessages = this.q.confirmMessages;
    this.confirmMessage = this.confirmMessages[rowIdx][colIdx];

  }

  ngOnInit() {}

  getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;

  }

  closeSurvey() {

    const xx = this.q.getPatientWithAnswers();

    this.q.postAnswers(xx).subscribe(
      x => {
        console.log('postanswer: next');
        console.log(x);
      },
      y => {
          console.log('postanswer: error ');
          console.log(y);
      },
      () => {
        console.log('postanswer: completion');
        this.confirmMessage = "Survey has been submitted. Thank you for your participation."
        this.submitted = true;
      }
    );
  }

  back() {

    this.router.navigate(['/survey']);

  }

}


    //const xxx = JSON.stringify(this.confirmMessages);

  //   this.confirmMessages[adultIdx][engIdx] = `Your health and feedback are important
  //   to us. We greatly appreciate your response.<br/><br/>
  //   Thank you very much for your time and attention,<br/><br/>
  //   Sincerely,<br/><br/>
  //   Barbara Janiszewska, RN<br/>
  //   Quality Management Specialist/Surgical Clinical Reviewer for ACS NSQIP<br/><br/>
  //   Quality and Patient Saftety Division of New York-Presbyterian Hospital
  //   `;

  //   this.confirmMessages[adultIdx][espIdx] = `Su salud y sus comentarios son importantes para nosotros. Apreciamos mucho su respuesta.
  //   Gracias mucho por su tiempo y atención.<br/><br/>
  //   Sinceramente,<br/><br/>
  //   Barbara Janiszewska, RN<br/><br/>
  //   Quality Management Specialist/Revisor clínico de la cirugía para ACS NSQIP<br/><br/>
  //   Quality and Patient Safety Divison of New York-Presbyterian Hospital
  //   `;

  //   this.confirmMessages[childIdx][engIdx] = `Your child's health and your opinion are important to ${this.hospitalName}.
  //   Thank you for taking the time to complete this survey.<br/><br/>

  //   Sincerely,<br/><br/>
  //   ${this.srcNameCredential}<br/><br/>
  //   Surgical Clinical Reviewer<br/><br/>
  //   ${this.hospitalName}<br/><br/>
  //   ${this.phoneNumber}
  // ` ;

  //   this.confirmMessages[childIdx][espIdx] = `
  //   La salud de su hijo y su opinión son importantes para ${this.hospitalName}.
  //          Gracias por tomarse el tiempo para completar esta encuesta.<br/><br/>


  //                            Sinceramente,<br/><br/>
  //                            ${this.srcNameCredential}<br/><br/>
  //                            Surgical Clinical Reviewer<br/><br/>
  //                            ${this.hospitalName}<br/><br/>
  //                            ${this.phoneNumber}<br/><br/>
  //                            `;



    // if (lang === 'en') {

    //    this.childMessage = `Your child's health and your opinion are important to ${this.hospitalName}.
    //    Thank you for taking the time to complete this survey.<br/><br/>

    //    Sincerely,<br/><br/>
    //    ${this.srcNameCredential}<br/><br/>
    //    Surgical Clinical Reviewer<br/><br/>
    //    ${this.hospitalName}<br/><br/>
    //    ${this.phoneNumber}
    //  ` ;
    // } else {

    //   this.childMessage = `
    //   La salud de su hijo y su opinión son importantes para ${this.hospitalName}.
    //          Gracias por tomarse el tiempo para completar esta encuesta.<br/><br/>


    //                            Sinceramente,<br/><br/>
    //                            ${this.srcNameCredential}<br/><br/>
    //                            Surgical Clinical Reviewer<br/><br/>
    //                            ${this.hospitalName}<br/><br/>
    //                            ${this.phoneNumber}<br/><br/>
    //                            `;
    // }

    // if (lang === 'en') {

    //   this.adultMessage = `Your health and feedback are important
    //                           to us. We greatly appreciate your response.<br/><br/>
    //                           Thank you very much for your time and attention,<br/><br/>
    //                           Sincerely,<br/><br/>
    //                           Barbara Janiszewska, RN<br/>
    //                           Quality Management Specialist/Surgical Clinical Reviewer for ACS NSQIP<br/><br/>
    //                           Quality and Patient Saftety Division of New York-Presbyterian Hospital
    //                           `;
    // } else {

    //   this.adultMessage = `Su salud y sus comentarios son importantes para nosotros. Apreciamos mucho su respuesta.
    //                           Gracias mucho por su tiempo y atención.<br/><br/>
    //                           Sinceramente,<br/><br/>
    //                           Barbara Janiszewska, RN<br/><br/>
    //                           Quality Management Specialist/Revisor clínico de la cirugía para ACS NSQIP<br/><br/>
    //                           Quality and Patient Safety Divison of New York-Presbyterian Hospital
    //                           `;
    // }

    // this.confirmMessage = aorc.indexOf('a') === -1 ? this.childMessage : this.adultMessage;
