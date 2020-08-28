import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportar-admin',
  templateUrl: './reportar-admin.component.html',
  styleUrls: ['./reportar-admin.component.css']
})
export class ReportarAdminComponent implements OnInit {
  cargando=false
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargando=true
    }, 500);
  }

}
