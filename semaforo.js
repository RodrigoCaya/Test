function pintarSemaforo(id) {
    // color = id del semaforo
    const semaforo = document.getElementById(id);
    console.log(semaforo);
    semaforo.style.opacity = 1.0;
}

async function despintar(id, duration) {
    await new Promise(resolve => setTimeout(function() {
        // color = id del semaforo
        const semaforo = document.getElementById(id);
        console.log(semaforo);
        semaforo.style.opacity = 0.5;
    }, 1000*duration, id));
}

function despintarSemaforo(id) {
    // color = id del semaforo
    const semaforo = document.getElementById(id);
    console.log(semaforo);
    semaforo.style.opacity = 0.5;
}

async function pintar(id, duration) {
    // color = id del semaforo
    const syncWait = ms => {
        const end = Date.now() + ms
        while (Date.now() < end) continue
    }
    const semaforo = document.getElementById(id);
    console.log(semaforo);
    semaforo.style.opacity = 1.0;
    syncWait(duration);
    semaforo.style.opacity = 0.5;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);
  
    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
  }
  
function wait(ms, cb) {
    var waitDateOne = new Date();
    while ((new Date()) - waitDateOne <= ms) {
        //Nothing
    }
    if (cb) {
        eval(cb);
    }
}

getJSON("https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json").then(data => {
    console.log(data);
    // recorrer el objeto json y pintar los semaforos
    while(true){
        for (let i = 0; i < data.lights.length; i++) {
            const element = data.lights[i];     
            console.log(element);
            var duration = element.duration;
            duration = duration * 1000;
            console.log(duration);
            // setInterval(pintarSemaforo, duration, element.color);
            // pintar(element.color, duration);
            pintarSemaforo(element.color);
            // const sleep = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds)
            // const syncWait = ms => {
            //     const end = Date.now() + ms
            //     while (Date.now() < end) continue
            // }
            // syncWait(duration);
            wait(10000);
            despintarSemaforo(element.color);
            // setInterval(despintarSemaforo, duration, element.color);
        }
        break;
    }
}).catch(error => {
    console.error(error);
});