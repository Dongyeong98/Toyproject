const MAX_TIME = 3600*24;
const timerDOM = document.getElementsByClassName('game-time')[0];

let time = 0;
let timerId = null;
export let isGmaeStart = false;

const convertToTwoNumber = (num) => {
    const stringNum = `${num}`;
    if (stringNum.length === 1) return `0${stringNum}`;
    else return stringNum;
}

export const getTimeString = (time) => {
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    const minutes = Math.floor(time / 60);
    time = time - minutes * 60;
    const seconds = time;

    return `${convertToTwoNumber(hours)}:${convertToTwoNumber(minutes)}:${convertToTwoNumber(seconds)}`;
};

export const startTimer = (onTimeOver) => {
    isGmaeStart = true;
    timerId =  setInterval(() => {
        time++;
        timerDOM.innerHTML = getTimeString(time);
        if (MAX_TIME < time) {
            onTimeOver?.();
            clearInterval(timerId);
        }
    }, 1000);
};

export const stopTimer = () => {
    isGmaeStart = false;
    if (!timerId == null) return;
    clearInterval(timerId);
};

export const setTimer  = (initTime) => {
    time = initTime;
    timerDOM.innerHTML = getTimeString(time);
};

export const getResultTimeString = () => {
    return getTimeString(time);
};

export const getNowTime = () => {
    return time;
}

