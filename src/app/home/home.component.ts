import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Course } from './../model/course';
import {Component, OnInit} from '@angular/core';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retryWhen, share, shareReplay, tap} from 'rxjs/operators';
import { cerateHttpObservable } from '../common/util';
import { Store } from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$ : Observable<Course[]>;
    advancedCourses$ : Observable<Course[]>;


    constructor(private store:Store) {

    }

    ngOnInit() {

        const courses$ = this.store.courses$;
        // //Latest without store
        // const http$  = cerateHttpObservable('/api/courses');
        // const courses$ : Observable<Course[]>= http$
        // .pipe(
           
        //     tap(()=> console.log('HTTP request executed')),
        //     map(res => Object.values(res["payload"])as Course[]),
        //     shareReplay(),
        //     retryWhen(errors => errors.pipe(delayWhen(()=> timer(2000))))
        // );


        //error handling
        // const courses$ : Observable<Course[]>= http$
        // .pipe(
        //     catchError(err=>{
        //         console.log("Error Occured ", err);
        //         return throwError(err);
        //     }),
        //     finalize(()=>{console.log('Finalize executed...')}),
        //     tap(()=> console.log('HTTP request executed')),
        //     map(res => Object.values(res["payload"])as Course[]),
        //     shareReplay()
        // );

        this.beginnersCourses$ = this.store.selectBeginnerCourses();
        this.advancedCourses$ = this.store.selectAdvancedCourses();
       

                
       // //Latest without store
        // this.beginnersCourses$ = courses$
        // .pipe(
        //     map(courses =>courses
        //         .filter(course=> course.category =='BEGINNER')
        //         )
        // );
        // this.advancedCourses$ = courses$
        // .pipe(
        //     map(courses =>courses
        //         .filter(course=> course.category =='ADVANCED')
        //         )
        // );

        // courses$.subscribe(
        //     courses => {
        //         this.beginnersCourses=(courses as Course[])
        //         .filter(course=> (course as Course).category =='BEGINNER');
        //         this.advancedCourses=(courses as Course[])
        //         .filter(course=> (course as Course).category =='ADVANCED');
        //     },
        //     noop, //()=>{}
        //     () => console.log('completed')
        // );

    }

}
