import { tap, map, filter, first } from 'rxjs/operators';
import { BehaviorSubject, Observable  } from 'rxjs';
import { Injectable } from "@angular/core";
import { Course } from '../model/course';
import { cerateHttpObservable } from './util';
import { fromPromise } from 'rxjs/internal-compatibility';
import { json } from 'body-parser';
import { stringify } from 'querystring';


@Injectable({
    providedIn: 'root'
})
export class Store {
    
    
    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    init() {
        const http$ = cerateHttpObservable('/api/courses');
        http$
            .pipe(
                tap(() => console.log('HTTP request executed')),
                map(res => Object.values(res["payload"]) as Course[])
            ).subscribe(
                courses => this.subject.next(courses)
            );
    }

    selectAdvancedCourses(): Observable<Course[]> {
        return this.filterByCategory("ADVANCED");
    }

    selectBeginnerCourses(): Observable<Course[]> {
        return this.filterByCategory("BEGINNER");
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(
            map(courses => courses
                .filter(course => course.category == category)
            )
        );

    }
    saveCourse(courseId: number, changes: any): Observable<any> {
        const courses = this.subject.getValue();
        const courseIndex = courses.findIndex(course => course.id == courseId);
        const newCourses = courses.slice(0);
        newCourses[courseIndex] ={
            ...courses[courseIndex],
            ...changes
        };
        this.subject.next(newCourses);
        
        return fromPromise(fetch('/api/courses/'+courseId,
        {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {'content-type': 'application/json'}
        }));
    }

    selectCourseById(courseId: number): Observable<Course> {
        return this.courses$.pipe(
            map(courses => courses
                .find(course => course.id == courseId)
            ),
            filter(course => !!course)
        );
    }


}