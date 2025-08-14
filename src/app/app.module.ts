import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

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

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactFilterPipe,
    ContactDetailComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
