import { Component, OnInit, OnDestroy } from '@angular/core';
import {MessagesService} from '../../../services/sockets/messages.service';
import {ControllerService} from '../../../services/controller.service';
import { saveAs } from "file-saver";
declare var $: any;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  chatId: any;
  user: any = {};
  email: string;
  chatInit: any;
  messageData: any;
  messageArray:any = [];
  messageArrayLength = false;
  cont = 0;
  delivs:any = {
    deliveries:[]
  };
  imageUpload: File = null;
  sended = false;
  constructor(private messagesService: MessagesService,
              private controller: ControllerService) {
    this.cont = 0;
    console.log(this.messageArrayLength);
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.userDB) {
      console.log(this.user.userDB.email);
      this.email = this.user.userDB.email;
    }else {
      console.log(this.user.companyDB.email);
      this.email = this.user.companyDB.email;
    }
    this.chatId = localStorage.getItem("chatID");
    console.log(this.chatId);
    this.controller.getDeliveries(this.chatId).subscribe(data => {
      this.delivs = data;
    }, error => {
      console.log(error);
    });


    this.messagesService.chatInit(this.email, this.chatId);



    this.messagesService.chatLoad();
    this.messagesService.loadMessages.subscribe(data => {
      console.log(data);
      this.chatInit = data;
    });


    /*this.messagesService.showData.subscribe(data =>{
      this.messageArrayLength = data;
    });*/



    /*this.messagesService.newMessage();
    this.messagesService.newMessageData.subscribe(data => {
      console.log(data);
      this.messageData = data;
      this.messageArray.push({content: this.messageData.content, date: this.messageData.date, email: this.messageData.email, idConversation: this.messageData.idConversation, state: this.messageData.state, _id: this.messageData._id})

      if(this.messageArrayLength === false){
        this.messageArray.splice(0,1);
        this.messageArrayLength = true;
      }
    });*/





    console.log(this.messageArray)
  }

  ngOnInit() {
    this.cont = 0;
    //this.messagesService.chatInit(this.email, this.projectID);
    this.messagesService
      .getMessages()
      .subscribe((message: string) => {
        this.messageArray.push(message);
        console.log(this.messageArray)
      });
    this.messagesService
      .getFiles()
      .subscribe((message: string) => {
        this.delivs.deliveries.push(message);
        console.log(this.messageArray)
      });
  }

  ngOnDestroy(): void {
    localStorage.removeItem("projectID");
    this.messagesService.closeSocket();
    this.cont = 0;
  }

  sendMessage( content: string){
    let message = {
      email: this.email,
      content : content
    };
    if(!this.sended){
      console.log("in");
      this.messagesService.sendMessage(message);
      //this.sended = true;
    }
    message = {
      email: "",
      content : ""
    };
    $('#textarea').val('');
  }

  download(delivery: string) {
    console.log("RECIBO: " + delivery);
    let filename = delivery;
    this.controller.downloadReport(filename).subscribe(
      data => {
        saveAs(data, filename);
      },
      err => {
        alert("Problem while downloading the file.");
        console.error(err);
      }
    );
  }

  selectionImage( file: File ) {
    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;
    console.log(this.imageUpload)
  }

  async upload() {
    let rsp = await this.controller.saveFile(this.imageUpload, this.chatId);
    console.log(rsp);
    // @ts-ignore
    if(rsp.ok){
      this.controller.getDeliveries(this.chatId).subscribe(data => {
        this.delivs = data;
      }, error => {
        console.log(error);
      });
    }
  }


}
