import { SELECT_RESULT_KEY } from "../constants/result.js";
import { appendChildrenList, makeDOMwithProperties  } from "../utils/dom.js";

const cardInfoList = [
    {
        id : 1,
        imgSrc : 'public/assets/허니버터칩.jpeg',
        name : '허니버터칩',
        description : '단짠단짠 존맛탱 허니버터칩',
    },
    {
        id : 2,
        imgSrc : 'public/assets/나쵸.jpeg',
        name : '나쵸',
        description : '치즈소스 있으면 존맛인 나쵸',
    },
    {
        id : 3,
        imgSrc : 'public/assets/초코꼬북칩.jpeg',
        name : '초코꼬북칩',
        description : '일반 꼬북칩 잡으러 나온 초코맛 꼬북칩',
    },
    {
        id : 4,
        imgSrc : 'public/assets/홈런볼.jpeg',
        name : '홈런볼',
        description : '홈런쳤을때 느껴지는 그 달콤한 초코맛과자',
    },
]


const snackCardList = document.getElementsByClassName('snack-card-list')[0];
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [ notyetContainerDOM, resultContainerDOM ] = document.getElementsByClassName('result-container');
const [ , resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButtonDOM] = resultContainerDOM.children;



const getSelectedCard = () => {
    return document.getElementsByClassName('select')[0];
}
const getCardById = (id) => {
    return document.getElementById(`select-${id}`);
}

const handleSelectCard = (cardId) => {
    // 선택된 카드를 선택했다는 표시를 하는 함수 
    const originalSelectedCard = getSelectedCard();
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = getCardById(cardId);
    newSelectedCard?.classList.add('select');
};

const getSelectCardDOM = ({
    id,
    imgSrc,
    name,
    description,
}) => {
    const snackCardDOM = makeDOMwithProperties('button',{
        id : `select-${id}`,
        className : 'snack-card',
        onclick : () => handleSelectCard(id),
    });

    const imageDOM = makeDOMwithProperties('img', {
        src : imgSrc,
        alt : name,
    });

    const descriptionContainerDOM = makeDOMwithProperties('div',{
        className : 'snack-description',
    });
    
    const nameDOM = makeDOMwithProperties('div',{
        innerHTML : name,
    });

    const descriptionDOM = makeDOMwithProperties('div',{
        innerHTML : description,
    });

    appendChildrenList(descriptionContainerDOM, [nameDOM, descriptionDOM]);
    appendChildrenList(snackCardDOM, [imageDOM, descriptionContainerDOM]);

    return snackCardDOM;
};

export const setSelectCards = () => {

    const originalSnackCards = Object.assign([],snackCardList.children);
    originalSnackCards.forEach((snackCard) => snackCard.remove());

    cardInfoList.forEach((cardInfo) => {
        const selectCardDOM = getSelectCardDOM(cardInfo);
        snackCardList.appendChild(selectCardDOM);
    });

    const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    if (!cardId || isNaN(cardId)) return;

    handleSelectCard(cardId);
};

export const setSelectButton = () => {
    selectButtonDOM.onclick = () => {
        const selectedCard = getSelectedCard();
        if (!selectedCard) {
            alert("선택된 카드가 없습니다.");
            return;
        }
        const cardId = selectedCard.id?.split('-')[1];
        localStorage.setItem(SELECT_RESULT_KEY, cardId);
        setResultContainer();

        const resultSectionDOM = document.getElementById('result-section');
        const scrollTargetY = resultSectionDOM.offsetTop;
        window.scroll({
            top :scrollTargetY,
            left : 0,
            behavior: 'smooth'
        });
    };
};

const initialize = () => {
    // 과자가 선택되기 전의 상태로 되돌려주는 함수
    // 1. localStorage의 선택된 cardID 삭제
    // 2. selectCard의 DOM 다시 구성
    // 3. resultContainer의 DOM 다시 구성

    localStorage.removeItem(SELECT_RESULT_KEY);
    setSelectCards();
    setResultContainer();
    
    const selectSectionDOM = document.getElementById('participate-section');
    const scrollTargetY = selectSectionDOM.offsetTop;
    window.scroll({
        top :scrollTargetY,
        left : 0,
        behavior: 'smooth'
    });
};

export const setResultContainer = () => {

    const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    
    const isSelected = !!selectedId;

    if (!isSelected) {
        notyetContainerDOM.style.display = 'block';
        resultContainerDOM.style.display = 'none';
        return;
    }
        notyetContainerDOM.style.display = 'none';
        resultContainerDOM.style.display = 'flex';

        const cardInfo = cardInfoList.find((info) => info.id === selectedId);
        
        resultImageDOM.src = cardInfo.imgSrc;
        resultImageDOM.alt = cardInfo.name;
        resultNameDOM.innerHTML = cardInfo.name;
        resultDescriptionDOM.innerHTML = cardInfo.description;

        // 다시하기 버튼 구현
        selectRetryButtonDOM.onclick = initialize;
};