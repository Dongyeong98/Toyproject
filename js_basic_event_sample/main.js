import { countUp } from "./utils/countUp.js";
import { setSelectCards, setSelectButton } from "./module/selectCard.js";
// import { setMbtiSection } from "./module/mbtiSelect.js";
import { setTabMenu } from "./module/tabMenu.js";
// import { setShareURLButton } from "./module/share.js";

const data = {
  participate: 123141251,
};

const participateDOM = document.getElementById('participate-number');
countUp(participateDOM, data.participate, 5);

setTabMenu();

setSelectCards();
setSelectButton();

// setResultContainer();

// setMbtiSection();

// setShareURLButton();
