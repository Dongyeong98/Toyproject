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

const handleSelectCard = (cardId) => {
    // 선택된 카드를 선택했다는 표시를 하는 함수 
    const originalSelectedCard = document.getElementsByClassName('select')?.[0];
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = document.getElementById(`select-${cardId}`);
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
    cardInfoList.forEach((cardInfo) => {
        const selectCardDOM = getSelectCardDOM(cardInfo);
        snackCardList.appendChild(selectCardDOM);
    });
    
}