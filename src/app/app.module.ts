import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFilterPipe } from './contact/contact-filter.pipe';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { UserModalComponent } from './contact/user-modal/user-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactFilterPipe,
    ContactDetailComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    AsyncPipe,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    TranslocoRootModule,
    provideFunctions(() => {
      const functions = getFunctions();
      connectFunctionsEmulator(functions, 'localhost', 5001);
      return functions;
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
