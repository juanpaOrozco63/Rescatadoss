import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent implements OnInit {
cargando=false
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargando=true

    }, 500);
  }

}
