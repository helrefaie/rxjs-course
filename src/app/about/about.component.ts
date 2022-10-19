import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, noop, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { cerateHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {


   const http$= cerateHttpObservable('api/courses');
   const sub=http$.subscribe(console.log);

   setTimeout(()=> sub.unsubscribe(),0);



  }
  

}
