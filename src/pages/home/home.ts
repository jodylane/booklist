import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BookPage } from '../book/book';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avail:String;
  books: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public angFire: AngularFire,public toastCtrl: ToastController) {
    this.books = angFire.database.list('/Books');
    this.avail = "available";
  }
  addBook():void{
    let prompt = this.alertCtrl.create({
      title: 'Book Title and Author',
      message: 'Enter the books title and author',
      inputs:[
        {
          name: 'title',
          placeholder: 'Book Title'
        },
        {
          name:'author',
          placeholder:'Author\'s Name'
        },
        {
          name:'cover',
          placeholder:'image url or leave blank'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data =>{
            console.log("Cancel clicked")
          }
        },
        {
          text: 'Save Book',
          handler: data =>{
            let newCover:String = data.cover;
            if(data.cover == ''){
              newCover = 'no_cover.gif'
            }
            this.books.push({
              title: data.title,
              author: data.author,
              cover: newCover,
              checked: 'true',
              user: 'Null'
            });
            let str = data.title + " was successfully Created!";
            this.toast(str);
          }
        }
      ]
    });
    prompt.present();
  }
  editBook(book):void{
    let prompt = this.alertCtrl.create({
      title: 'Book Title and Author',
      message: ' Edit the book Title and Author',
      inputs:[
        {
          name:'title',
          placeholder: book.title
        },
        {
          name: 'author',
          placeholder: book.author
        },
        {
          name: 'cover',
          placeholder: book.cover
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data =>{
            console.log("Cancel clicked")
          }
        },
        {
          text: 'Save Book',
          handler: data =>{
            let newTitle:String = book.title;
            let newAuthor:String = book.author;
            let newCover:String = book.cover;
            if(data.title != ""){
              newTitle = data.title;
            }
            if(data.author != ""){
              newAuthor = data.author;
            }
            if(data.cover != ""){
              newCover = data.cover;
            }
            this.books.update(book.$key,{
              title: newTitle,
              author: newAuthor,
              cover: newCover
            })
            let str = newTitle + " was successfully Edited!";
            this.toast(str);
          }
        }
      ]
    });
    prompt.present();
  }
  removeBook(book):void{
    let prompt = this.alertCtrl.create({
      title: 'Delete Book',
      buttons:[
        {
          text: 'Cancel',
          handler: data =>{
            console.log("Cancel clicked")
          }
        },
        {
          text: 'Delete Book',
          handler: data =>{
            this.books.remove(book.$key);
            let str = book.title + " was successfully Deleted!";
            this.toast(str);
          }
        }
      ]
    });
    prompt.present();
  }
  toast(message):void{
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  viewBook(book):void {
    this.navCtrl.push(BookPage, {
      book: book
    });
  }
}

