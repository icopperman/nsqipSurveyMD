import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NsqipDataService } from '../shared/nsqip-data.service';

@Injectable()
export class AppLoadService {

  constructor(private http: HttpClient, private q: NsqipDataService) {}

  getURL() {

    const path = 'assets/url.json'; //really a json file, but iis will not serve json files
    const promise = this.http.get(path)
                  .toPromise()
                  .then(settings => {
                    this.q.url = settings['url'];
                    this.q.langDictionary = settings['langDictionary'];
                    this.q.confirmMessages = settings['confirmMessages'];
                    this.q.welcomeMessages = settings['welcomeMessages'];

                    console.log('here');
                    return settings;
                  })
                  .catch( (err) => {
                    this.http.get('assets/url.txt')
                        .toPromise()
                        .then(settings => {
                          this.q.url = settings['url'];
                          this.q.langDictionary = settings['langDictionary'];
                          this.q.confirmMessages = settings['confirmMessages'];
                          this.q.welcomeMessages = settings['welcomeMessages'];
                          console.log('here');
                          return settings;
                        })
                        .catch( (err2) => {
                          console.log('cant find assets/url');

                        });

                  });

    return promise;

  }

}
