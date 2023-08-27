// Asynchronous Code

// How does JavaScript handle asynchronous code execution?
//  The browser communicates with JS via the Event Loop and the Message Queue to let it know once a longer-taking task finished.


// JS Engine has a Call Stack -- message queue of the (functions/"todo"s/etc)
// Event Loop -- part of the browser
//    it runs all the time and watches if the stack
//    is empty or not

const button = document.querySelector('button');
const output = document.querySelector('p');

// This executes second
function trackUserHandler() {
  console.log('Clicked!');
  // getCurrentPosition offloads the task to the browser
  // it is Web API: Geolocation
  navigator.geolocation.getCurrentPosition(
    // then browser pushes this to the Call Stack
    posData => {
      // callback in a callback, it is possible to nest those operattions
      // this timer kicks only when the position is there
      setTimeout(() => {
        console.log(posData);
      }, 5000);
    },
    error => {
      console.log(error);
    }
  );

  // We handoff this to the browser and it pushed it to the Call Stack
  //  it has to do a additinoal step to be added to hte queu
  setTimeout(() => {
    console.log('Timer done!');
  }, 0); // <-- 0 ms is not guaranteed time, it is a minimum

  // This executed immediately after getCurrentPosition offhanded to browser
  //  and right after the 0 sec timer above handed off to the browser
  //  as JS is non blocking
  console.log('Getting position...');
}
// Haniding it off to the browser and tell to execute is when click occurs
//  this is an async task and you wait for it to happen
//  but you don't wait for it by blocking your JS execution
//
button.addEventListener('click', trackUserHandler);

// This executes first
// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);