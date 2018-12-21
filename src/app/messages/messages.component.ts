import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService:MessageService) { // messageService 属性必须是公共的，因为在模板中绑定它（angular 仅绑定到公共组件属性）

   }

  ngOnInit() {
  }

}
