/*

given an array: 

[
    {value: 'green', delay: 3000, fn: func,},
    {value: 'red', delay: 2000, fn: func,},
    {value: 'yellow', delay: 1000, fn: func,},
    {value: 'white', delay: 5000, fn: func,},
    ...
]

ouput: 

after 3 sec, print green
after another 2 sec, print red
after another 1 sec, print yellow
after another 5 sec, print white

*/

function delayPrint(arr){
    let totalDelay = 0;
    arr.forEach(({value, delay, fn}) => {
        waitAndReturn(delay);
        console.log(value);
        fn();
    });
}


/*
async function delayPrintValue({value, delay, fn}){
    console.log(val);
    await fn();
}
*/



const arr = [
    {value: 'green', delay: 3000, fn: () => waitAndReturn(200)},
    {value: 'red', delay: 2000, fn: () => waitAndReturn(400)},
    {value: 'yellow', delay: 1000, fn: () => waitAndReturn(300)},
    {value: 'white', delay: 5000, fn: () => waitAndReturn(100)},
]

// delayPrint(arr)


/*
 function 
    wait for 2 sec, then return 'after wait'
 
 new Date().getTime()
 // delayTime ms
*/

function waitAndReturn(){
    const time = new Date().getTime();
    const delay = 2000 * Math.random();
    
    console.log('before wait for ' + delay);
    
    while(true){
        const now = new Date().getTime();
        if(now - time > delay){
            break;
        }
    }
    
    console.log('after wait for ' + delay);
}

/*

timer.   0fn()     1,fn().      2, fn().      3, fn()

fn() {
  waitAndReturn();
}

*/


function intervalRun(fn, time = 1000) {
    let isRunning = false;
    
    return setInterval(() => {
        if(!isRunning){
            
            isRunning = true;
          
             fn();
        
            isRunning = false;
        }
    }, time);
}

/*
clock.     0.      1,      2,     3,
           FN ---------1.5
interval   fn     fn     fn    fn
*/


