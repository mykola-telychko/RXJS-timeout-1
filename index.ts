import { of } from 'rxjs';
import { concatMap, timeout, catchError, delay } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/utility/timeout
// Example 1: Timeout after 2.5 seconds

// simulate request
function makeRequest(timeToDelay) {
  return of('Request Complete!').pipe(delay(timeToDelay));
}

of(4000, 3000, 2000)
  .pipe(
    concatMap((duration) =>
      makeRequest(duration).pipe(
        timeout(2500),
        catchError((error) => of(`Request timed out after: ${duration}`))
      )
    )
  )
  .subscribe((val) => console.log(val));
/*
 *  "Request timed out after: 4000"
 *  "Request timed out after: 3000"
 *  "Request Complete!"
 */
