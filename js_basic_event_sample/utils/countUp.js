
// dom : innerHTML이 갱신될 노드
// target : 목표 숫자
// second : 몇 초가 걸릴 지
// term : 몇 초마다 실행할지
// countTerm : 한 trem에 몇이 증가해야 하는지 -> second, term으로 계산해서 넣어주기

export const countUp = (dom, target, second, term = 15) => {
    if (!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return
    const countTerm = Math.floor((target / second) / (1000 / term));

    let nowNumber = 0; //현재 값

    const timerID = setInterval(() => {
        if(nowNumber >= target) {
            nowNumber = target;
            clearInterval(timerID);
            return
        }
        nowNumber += countTerm;
        dom.innerHTML = `${nowNumber.toLocaleString()}`;
    }, term);
};