import { Component,       OnInit }    from '@angular/core';
import { Router           }      from '@angular/router/';
import { NsqipDataService }      from '../shared/nsqip-data.service';
import { PQs              }      from '../models/nqsip-data';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  patientName         : string;
  introMessage        : string;

  constructor(private router: Router, private q: NsqipDataService) {

    const id = window.localStorage.getItem('id');

    this.q.getQuestions(id).subscribe( ( pq: PQs) => {

          const aorc = pq.patient.patientType.toLowerCase();

          const rowIdx = (aorc.startsWith('a') === true) ? 0 : 1;
          const colIdx = (pq.patient.patientLanguage === 'en') ? 0 : 1;

          this.patientName = pq.patient.patientName.split(',')[1];
          const replacements = [pq.patient.surgeryDate];

          if (aorc.substring(0, 1) === 'c') {

              this.patientName = this.q.getString('Parent/Guardian of ') + this.patientName;
              replacements.push(pq.patient.hospitalName, pq.patient.surgeonName);

            }

            this.introMessage = this.doReplacement(replacements, rowIdx, colIdx);

     });

  }

  doReplacement(replaceArray: string[], rowIdx: number, colIdx: number): string {

    const xx = this.q.welcomeMessages[rowIdx][colIdx]
                    .split('$')
                    .reduce(function(acc, cv, idx, aray): string {

                      if (idx === replaceArray.length) {
                        return acc + cv;
                      } else {
                        return acc += cv + replaceArray[idx];
                      }
                    }, '');

    return xx;

  }

  ngOnInit() {}

  startSurvey() {

    console.log('start survey');
    this.router.navigate(['/survey']);

  }

   getString(msg: string): string {

    const amsg = this.q.getString(msg);

    return amsg;

  }

  //this.q.welcomeMessages[rowIdx][colIdx]
              //     .split('$')
              //     .reduce(function(acc, cv, idx, aray): string {
              //                   if (idx === replacements.length) {
              //                     return acc + cv;
              //                   } else {
              //                     return acc += cv + replacements[idx];
              //                   }
              //             }, '');

    // this.q.welcomeMessages[rowIdx][colIdx]
              //                     .split('$')
              //                     .reduce(function(acc, cv, idx, aray): string {

              //                       if (idx === replacements.length) {
              //                         return acc + cv;
              //                       } else {
              //                         return acc += cv + replacements[idx];
              //                       }
              //                     }, '');

//   setAdultStrings(pq: PQs): void {

//     this.patientName = pq.patient.patientName.split(',')[1];
//     this.surgeryDate = pq.patient.surgeryDate;
//     let lang = pq.patient.patientLanguage;

//     if (lang == null) {
//       console.log('welcome: lang is null');
//       lang = 'en';
//     }

//     if (lang === 'en') {

//       this.introMessage = `Thank you for choosing New York-Presbyterian Hospital for your care.<br/><br/>
//                                You had surgery on ${this.surgeryDate}. We are interested in your recovery <b>after</b> you left the hospital. <br/><br/>The Department of
//                                Surgery at our hospital is a member of the American College of Surgeons' National Surgical Quality Improvemnt Porgram (NSQIP).
//                                We are gathering information on the outcomes of our patients after surgery.<br/><br/> Please take a few minutes to answer the questions below and
//                                return this letter in the self-addressed envolope.<br/><br/> The information you provide is maintained as strictly <b>confidential</b>.
//                                `;

//   } else {

//       this.introMessage = `Gracias por elegir New York-Presbyterian Hospital para su atención médica.<br/><br/>
//                               Hace varias semanas usted tenía cirugía y estamos interesados en su recuperación después de salir del hospital. <br/><br/>El Departamento de Cirugía
//                               de nuestro hospital son miembros del Programa nacional de mejora de la calidad quirúrgica, dirigido por el Colegio Americano de Cirujanos.
//                               Estamos recopilando información sobre el estado de nuestros pacientes después de la cirugía.<br/><br/> Tome por favor algunos unos minutos
//                               para contestar a las preguntas siguientes y para volver esta letra en el uno mismo incluido dirigido, sobre estampado. <br/><br/>La información que proporcione se mantiene de forma estrictamente confidencial.
//                               `;
//   }


//   }

//   setChildStrings(pq) {

//     this.patientName = `Parent/Guardian of ${pq.patient.patientName.split(',')[1]}`;
//     this.surgeryDate = pq.patient.surgeryDate;
//     this.hospitalName = pq.patient.hospitalName;
//     this.doctorName = pq.patient.surgeonName;
//     this.operationDate = pq.patient.surgeryDate;
//     let lang = pq.patient.patientLanguage;

//     if (lang == null) {
//       console.log('welcome: lang is null');
//       lang = 'en';
//     }

//     if (lang === 'en') {

//       this.introMessage = ` On ${this.operationDate} your child had an operation at ${this.hospitalName}.<br/><br/>
//                                  Dr. ${this.doctorName} and the Department of Pediatric Surgery, at our hospital, are members of the American College
//                                  of Surgeons' National Surgical Quality Improvement Program. We are gathering information on the
//                                  outcomes of our patients after surgery. <br/><br/>Please take a few minutes to answer the questions in this survey. <br/><br/>Your answers are strictly <b>confidential</b>.
//                                  `;
//       } else {

//         this.introMessage = `
//         El ${this.operationDate} su hijo tuvo una operación en ${this.hospitalName}. <br/><br/>
//         El ${this.doctorName} y el Departamento de Cirugía Pediátrica, en nuestro hospital, son miembros del Colegio Americano
//          of Surgeons' National Surgical Quality Improvement Programme. Estamos recopilando información sobre
//          resultados de nuestros pacientes después de la cirugía.<br/><br/>Tómese unos minutos para responder las preguntas de esta encuesta.
//          <br/><br/>Sus respuestas son <b>estrictamente</b> confidenciales.
//                                   `;
//       }

//   }
// }


