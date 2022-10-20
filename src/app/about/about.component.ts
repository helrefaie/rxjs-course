import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncSubject, BehaviorSubject, concat, fromEvent, noop, Observable, of, ReplaySubject, Subject } from 'rxjs';
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

    


  }
  

}
