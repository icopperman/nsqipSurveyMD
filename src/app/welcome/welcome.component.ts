import { Component,       OnInit, Renderer2, ViewChild, ElementRef }    from '@angular/core';
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
  @ViewChild('start') startBtn: ElementRef;

  constructor(private router: Router, private q: NsqipDataService  ) 
  {
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

  ngAfterViewInit(): void {

    //this.firstField.nativeElement.focus();
    this.startBtn.nativeElement.focus();

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

}

