import { makeDOMwithProperties } from "../utils/dom.js";
import { handleModalOpen } from "../utils/modal.js";
import { isGmaeStart, setTimer, startTimer, stopTimer, getResultTimeString, getNowTime } from "../utils/timer.js";
import { MOUSE_CONTROL_SCROPE_KEY } from "../constants/localStorage.js";

let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById('game-field');

export const initMouseControlGame = () => {
    startBoxDOM.innerHTML = '시작';
    endBoxDOM.innerHTML = '끝';
    boxDOMList.forEach((boxDOM) => {
        boxDOM.style.backgroundColor = 'transparent';
    })
    stopTimer();
    setTimer(0);
};

const handleSuccessGame = () => {
    stopTimer();
    
    handleModalOpen({
        isSucess : true,
        timeString : getResultTimeString(),
    });
    const nowSpendTime = getNowTime();
    const currentSpendTime = localStorage.getItem(MOUSE_CONTROL_SCROPE_KEY);

    if (!currentSpendTime || currentSpendTime > nowSpendTime) {
        localStorage.setItem(MOUSE_CONTROL_SCROPE_KEY,nowSpendTime);
    }

    setTimer(0);
};

const handleFailedGame = () => {
    console.log('실패');
   stopTimer();
   handleModalOpen({
    isSucess : false,
   });
   setTimer(0); // 타이머를 0으로 초기화
};

export const setBoxDOM = ({
    row, // 행이 몇갠지
    col, // 열이 몇갠지
    start, // 시작 위치 [행,열]
    end, // 종료 위치 [행,열]
    walls, // 벽의 위치들 [행,열]
}) => {
    // control-box-container 만들고,
    // box 채우기

    const controlBoxContainer = makeDOMwithProperties('div' , {
        id : 'control-box-container',
        onmouseleave : () => {
            if (!isGmaeStart) return;
            handleFailedGame();

        }
    });

    controlBoxContainer.style.display = 'grid'; 
    controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

    for(let i = 0; i < row; i++){
        for(let j = 0; j< col; j++){
            const { type, className, innerHTML='', onmouseover } = (function () {
                if (i === start[0] && j === start[1]) {
                    return {
                        type : 'start',
                        className : 'control-box start',
                        innerHTML : '시작',
                        onmouseover : (event) => {
                            startTimer(handleFailedGame);
                            event.target.innerHTML = '';
                            // 게임시작 -> 타이머가 시작
                            // innerHTML 없애기
                            
                        }
                    };
                }
                if (i === end[0] && j === end[1]){
                    return {
                        type : 'end',
                        className : 'control-box end',
                        innerHTML : '끝',
                        onmouseover : (event) => {
                            if (!isGmaeStart) return;
                            event.target.innerHTML = '';
                            handleSuccessGame();
                            // 게임끝 -> 타이머가 종료, 성공 모달이 뜸
                            // innerHTML 없애기
                            
                        }
                    };
                }
                for (let wall of walls){
                    if (i === wall[0] && j === wall[1]){
                        return {
                            type : 'wall',
                            className : 'control-box wall',
                            onmouseover : () => {
                                if (!isGmaeStart) return;
                                handleFailedGame();
                                // 게임 끝 -> 타이머가 종료, 실패 모달이 뜸
                            }
                        };
                    }
                }
                return {
                    type : 'normal',
                    className : 'control-box',
                    onmouseover : (event) => {
                        if (!isGmaeStart) return;
                        event.target.style.backgroundColor = 'linen';
                        // 길의 색상이 변경
                    }
                };
            }());
            const boxDOM = makeDOMwithProperties('div',{
                className : className,
                innerHTML : innerHTML,
                id : `box-${i}-${j}`,
                onmouseover,
            });

            switch(type) {
                case 'start' :
                    startBoxDOM = boxDOM;
                    break;
                case 'end' :
                    endBoxDOM = boxDOM;
                    break;
                case 'wall' :
                    wallBoxDOMList.push(boxDOM);
                    break;
                default :
                    boxDOMList.push(boxDOM);
            }

            controlBoxContainer.appendChild(boxDOM);
        }
    }
    gameFieldDOM.appendChild(controlBoxContainer);
};