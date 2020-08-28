import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  cargando=false
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargando=true
    }, 500);
  }

}
