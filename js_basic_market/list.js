import { fetchSectionListDate } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

// 물품 목록을 모두 불러와서 페이지에 띄우기

const sectionInfoList = await fetchSectionListDate();

const productList = sectionInfoList.reduce(
    (prev, curr) => [...prev, ...curr.productList],
    [],
);

const section = document.getElementsByTagName('section')[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilterEvent();
setButtonEvent(productList); 