import { Observable } from 'rxjs';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ThisReceiver } from '@angular/compiler';
import { JsonFormatter } from 'tslint/lib/formatters';
import { Store } from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course: Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        private strore: Store) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [course.releasedAt, Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

    }

    // ngOnInit() {

    //     this.form.valueChanges
    //         .pipe(
    //             filter(() => this.form.valid),
    //            mergeMap(changes=>this.saveCourses(changes))
    //         )
    //         .subscribe();
    // }

    ngOnInit() {

        // this.form.valueChanges
        //     .pipe(
        //         filter(() => this.form.valid),
        //         concatMap(changes=>this.saveCourses(changes))
        //     )
        //     .subscribe();
    }

    // saveCourses(changes: any) :Observable<Response>
    // {
    //     return fromPromise(fetch('api/courses/'+this.course.id,
    //                 {
    //                     method: 'PUT', body: JSON.stringify(changes),
    //                     headers: {
    //                         'content-type': 'application/json'
    //                     }
    //                 }));
    // }

    // ngOnInit() {

    //     this.form.valueChanges
    //         .pipe(
    //             filter(() => this.form.valid)
    //         )
    //         .subscribe(changes => {
    //             const saveCourse$ = this.saveCourses(changes)
    //             saveCourse$.subscribe();
    //         });
    // }

    // saveCourses(changes: any) :Observable<Response>
    // {
    //     console.log(this.course.id)
    //     return fromPromise(fetch('api/courses/'+this.course.id,
    //                 {
    //                     method: 'PUT', body: JSON.stringify(changes),
    //                     headers: {
    //                         'content-type': 'application/json'
    //                     }
    //                 }));
    // }



    ngAfterViewInit() {
        // fromEvent(this.saveButton.nativeElement,'click')
        // .pipe(
        //     exhaustMap(()=> this.saveCourses(this.form.value))
        // ).subscribe();

    }
    save(){
        this.strore.saveCourse(this.course.id,this.form.value)
        .subscribe(
            () => this.close(),
            err =>console.log("Error saving course" , err)
        );
        
    
    }



    close() {
        this.dialogRef.close();
    }

}
