import { RxJsLoggingLevel, setRxJsLoggingLevel } from './../common/debug';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, concatMapTo, throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { cerateHttpObservable } from '../common/util';
import { objectify } from 'tslint/lib/utils';
import { STANDARD_DROPDOWN_BELOW_POSITIONS } from '@angular/cdk/overlay';
import { debug } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        this.course$=cerateHttpObservable('api/courses/'+this.courseId);
        // .pipe(
        //     debug (RxJsLoggingLevel.INFO, "cousrse Value ")
        //     // tap(course => console.log ("course" , course))
        // );
       // setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
    }

    
    ngAfterViewInit() {

        this.lessons$= fromEvent<any>(this.input.nativeElement , 'keyup')
        .pipe(
            map(evt => evt.target.value),
            startWith(''),
            //debug (RxJsLoggingLevel.TRACE, "search "),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search=>this.loadLessons(search)),
            //debug (RxJsLoggingLevel.DEBUG, "lessorns value ")

        );

    }
    // ngAfterViewInit() {

    //     this.lessons$= fromEvent<any>(this.input.nativeElement , 'keyup')
    //     .pipe(
    //         map(evt => evt.target.value),
    //         startWith(''),
    //         tap(search => console.log("search", search)),
    //         debounceTime(400),
    //         distinctUntilChanged(),
    //         switchMap(search=>this.loadLessons(search))
    //     );

    // }
    // ngAfterViewInit() {

    //     fromEvent<any>(this.input.nativeElement , 'keyup')
    //      .pipe(
    //          map(evt => evt.target.value),
    //          startWith(''),
    //          debounceTime(400),
    //          //throttleTime(500)
    //      ).subscribe(console.log)
 
    //  }
    // ngAfterViewInit() {

    //     const initialLessosn$ =this.loadLessons();
    //     const searchLessons$ = 
    //     fromEvent<any>(this.input.nativeElement , 'keyup').pipe(
    //         map(evt => evt.target.value),
    //         debounceTime(400),
    //         distinctUntilChanged(),
    //         switchMap(search=>this.loadLessons(search))
    //     );
    //     this.lessons$= concat(initialLessosn$,searchLessons$);

    // }
    loadLessons(search='') : Observable<Lesson[]>
    {
        return cerateHttpObservable('api/lessons?courseId='+this.courseId+'&pageSize=100&filter='+search).pipe(
            map(res=> res["payload"])
        );

    }




}
