import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
/*
  Generated class for the Book page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage {
  book:any;
  books: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, private navParams: NavParams, public angFire: AngularFire,public toastCtrl: ToastController) {
    this.book = this.navParams.get('book');
    this.books = angFire.database.list('/Books');
    console.log();
  }


  ionViewDidLoad() {
    console.log('Hello BookPage Page');
  }
  checkout(book):void{
    console.log(book.user == "Null");
    let newChecked = !book.checked;
    this.books.update(book.$key,{
      checked: newChecked,
      user:'0'
    })
    let str = book.title + " was successfully Checked Out!";
    this.toast(str);
    this.navCtrl.pop();
  }
  toast(message):void{
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();

  }
  checkin(book):void{
    let newChecked = !book.checked;
    this.books.update(book.$key,{
      checked: newChecked,
      user:'Null'
    })
    let str = book.title + " was successfully Checked In!";
    this.toast(str);
    this.navCtrl.pop();
  }
}
