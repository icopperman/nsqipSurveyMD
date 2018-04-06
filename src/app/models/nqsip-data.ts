import { HttpErrorResponse } from '@angular/common/http';

export class NsqipPage {

  pageNumber    : number;
  pageType      : string;
  pageQuestions : Question[];

}

export class PatientWithAnswers {

  patient : Patient;
  answers : Answer[];

}

export class PQs {

  patient            : Patient;
  questions          : Question[];
  pages              : NsqipPage[];
  patientWithAnswers :  PatientWithAnswers;

}


export class Question {

  idQuestion          : number;
  questionNo          : string;
  questionText        : string;
  questionTextSpanish : string;
  questionType        : string;
  questionNextYes     : string;
  questionNextNo      : string;
  pageNumber          : number;
  surveyType          : string;

}

export class Answer {

  questionNumber : string;
  questionText   : string;
  questionType   : string;
  answer         : string;

}

export class Patient {

  idPatient           : number;
  patientType         : string;
  patientMRN          : string;
  patientEMPI         : string;
  patientName         : string;
  patientDOB          : string;
  patientPhone        : string;
  patientCell         : string;
  patientEmail        : string;
  patientLanguage     : string;
  patientOptInOut     : string;
  surgeonName         : string;
  surgeryDate         : string;
  hospitalName        : string;
  dateTextSent        : string;
  dateTextClicked     : string;
  dateSurveyCompleted : string;
  hasErrors           : string;
  filteredBy          : string;
  urlForText          : string;
  shortenedUrl        : string;
  createdDate         : string;
  isProcessed         : string;

}

export class PQError {

  errType    : string;
  errMsg     : string;
  httpError? : HttpErrorResponse;
  // localError?: ErrorEvent;

}
// export class allData {

//   questions: nsqipQuestions;
//   pages: nsqipPage[];

// }

// export class nsqipQuestions {
//   adults: question[];
//   children: question[];
// }
