import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { CheckedPage } from '../pages/checked/checked';
import { AboutPage } from '../pages/about/about';
import{ AngularFireModule } from 'angularfire2';

export const firebaseConfig ={
  apiKey: "AIzaSyBr0UYmmP42p5VCyPjoe5zDhaX-knvOHo4",
  authDomain: "booklist-two-cc839.firebaseapp.com",
  databaseURL: "https://booklist-two-cc839.firebaseio.com",
  storageBucket: "booklist-two-cc839.appspot.com",
  messagingSenderId: "782120091302"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    CheckedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookPage,
    CheckedPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
