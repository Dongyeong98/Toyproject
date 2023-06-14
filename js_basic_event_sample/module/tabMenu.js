const selectAchorMenuDOM = document.getElementById('anchor-to-select');
const resultAchorMenuDOM = document.getElementById('anchor-to-result');
const mbtiAchorMenuDOM = document.getElementById('anchor-to-mbti');

const selectSectionDOM = document.getElementById('participate-section');
const resultSectionDOM = document.getElementById('result-section');
const mbtiSectionDOM = document.getElementById('mbti-section');

const setScrollHandler = (anchorDOM, targetDOM) => {
    anchorDOM.onclick = () => {
        const scrollTargetY = targetDOM.offsetTop;
        window.scroll({
            top :scrollTargetY,
            left : 0,
            behavior: 'smooth'
        });
    };
};

export const setTabMenu = () => {
    setScrollHandler(selectAchorMenuDOM, selectSectionDOM);
    setScrollHandler(resultAchorMenuDOM, resultSectionDOM);
    setScrollHandler(mbtiAchorMenuDOM, mbtiSectionDOM);
};