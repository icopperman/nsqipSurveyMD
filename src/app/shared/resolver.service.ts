import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NsqipDataService} from './nsqip-data.service';
import { Question, NsqipPage, Patient, PQs, PQError } from '../models/nqsip-data';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ResolverService implements Resolve<PQs | PQError> {

  constructor(private q: NsqipDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PQs | PQError> {

    console.log('resolve: getquestions');

    let id : string = route.params.id;

    if ( ( id === undefined) || ( id == null) || (id === '') ) {

      if ( this.q.pathid == null )  {

        const x = new PQError();
        x.errType = 'missing parm';
        x.errMsg = 'no id presetnt';
        // x.httpError = new HttpErrorResponse({})

        return of(x);
      } else {

        id = this.q.pathid;

      }

    }

    return this.q.getQuestions(id.toUpperCase())
              .pipe(
                catchError(err => of(err))
              );

  }

}
