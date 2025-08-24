import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeLang = this.translocoService.getActiveLang();

  constructor(
    private translocoService: TranslocoService,
    private http: HttpClient,
    private fns: AngularFireFunctions
  ) {
    if (!environment.production) {
      fns.useFunctionsEmulator('http://127.0.0.1:5001');
    }

    this.reqFunction();
    this.callFunction();
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
  }

  reqFunction() {
    this.http
      .get('http://127.0.0.1:5001/contact-app-1ba11/us-central1/helloWorldReq')
      .subscribe((res) => console.log(res));
  }

  callFunction() {
    const callable = this.fns.httpsCallable('helloWorldCall');
    callable({ name: 'Chris' }).subscribe((res) => console.log(res));
  }
}
