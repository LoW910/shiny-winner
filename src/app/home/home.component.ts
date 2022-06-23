import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSub: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSub = interval(500).subscribe(count => {
    //   console.log(count)
    // })

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(
        () => {
          observer.next(count);
          if (count > 5) {
            observer.error(new Error('Count is greater than 3!'));
          }
          if (count === 4) {
            observer.complete();
          }
          count++;
        }, 50
      );
    });



    this.firstObsSub = customIntervalObservable.pipe(filter(data => {
      return data > 1;
    }),map((data) => {
      return `Round: ${data}`;
    }))
    .subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => {
        console.log(error);
        alert(error);
      },
      complete: () => {
        console.log("completed: " + Date.now());
      }

    });

    // this.firstObsSub = customInternalObservable.subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   error => {
    //     console.log(error);
    //     alert(error);
    //   }
    // );
  }
  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }

}
