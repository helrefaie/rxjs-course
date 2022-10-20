import { resolve } from "dns";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";


export function cerateHttpObservable(url: string): Observable<any> {

    // return fromPromise(fetch(url).then(response =>{
    //       return response.json();
    //        }));

    return new Observable(observer => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(url, { signal })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    observer.error('Request faild with status: ' + response.status)
                }
            }).then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                observer.error(err);
            });
        return () => controller.abort();
    });
}