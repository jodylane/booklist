import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BookPage } from '../book/book';


/*
  Generated class for the Checked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checked',
  templateUrl: 'checked.html'
})
export class CheckedPage {

  books: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public angFire: AngularFire,public toastCtrl: ToastController) {
    this.books = angFire.database.list('/Books');
  }
  viewBook(book):void {
    this.navCtrl.push(BookPage, {
      book: book
    });
  }


}
