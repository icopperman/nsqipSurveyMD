import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './survey/questions/questions.component';
import { QuestionsComponent1 } from './survey/questions/questions.component1';

import { PageYesNoComponent } from './survey/page-yes-no/page-yes-no.component';
import { PageBoxesComponent } from './survey/page-boxes/page-boxes.component';
import { ConfirmComponent } from './confirm/confirm.component';

import { ResolverService } from './shared/resolver.service';
import { NsqipDataService  } from './shared/nsqip-data.service';
import { AppLoadService } from './shared/app-load.service';

// tslint:disable-next-line:comment-format
//import { httpInterceptorProviders } from './interceptorsBarrel';

const appRoutes : Routes = [

  { path: 'confirm', component: ConfirmComponent },
  { path: 'welcome', component: WelcomeComponent },
 // { path: 'survey',  component: QuestionsComponent  },
  { path: 'survey',  component: QuestionsComponent1  },

  { path: 'login/:id',  component: LoginComponent,
    resolve: { pqs: ResolverService  },
    data: { title: 'Login' }
  },
  { path: 'login',  component: LoginComponent,
  resolve: { pqs: ResolverService  },
  data: { title: 'Login' }
},

  { path: ':id',  redirectTo: '/login/:id',    pathMatch: 'full'  },
  { path: '',  redirectTo: '/login',    pathMatch: 'full'  }

// ,{ path: '**', component: PageNotFoundComponent }
];

export function getURL(appLoadSvc: AppLoadService) {

  return () => appLoadSvc.getURL();

}

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    LoginComponent,
    WelcomeComponent,
    PageBoxesComponent,
    PageYesNoComponent,
    QuestionsComponent,
    QuestionsComponent1
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes // ,      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule
  ],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: getURL, multi: true, deps: [AppLoadService]},
    ResolverService,
    NsqipDataService
    // tslint:disable-next-line:comment-format
    //httpInterceptorProviders,
  ],
  entryComponents: [PageYesNoComponent, PageBoxesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
