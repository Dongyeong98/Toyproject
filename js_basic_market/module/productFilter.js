import { makeDOMWithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFilter = document.getElementById('price-min-filter');
const maxPriceFilter = document.getElementById('price-max-filter');
const discountFilter = document.getElementById('discount-filter');
const filterButton = document.getElementsByClassName('product-filter-con')[0]?.lastElementChild;
// 필터 버튼 누름 -> min, max, discount 값을 받아옴 -> 값을 이용하여 해당하는  물품을 추출 -> 다시 화면에 나타냄

const convertPriceToNumber = (originalPrice) => {
    const formattedString = String(originalPrice).replace('원',' ').replace(',',' ');
    const formattedNumber = Number(formattedString);
    return isNaN(formattedNumber) ? 0 : formattedNumber;
};

const formatToPrice = (event) => {
    const value = event.target.value;
    const result = Number(value);
    if (isNaN(result)) {
        alert("숫자를 입력해주세요");
    }
    event.target.value = `${result.toLocaleString()}원`;
};

const convertPercentToNumber = (originalValue) => {
    const formattedString = String(originalValue).replace('%','');
    const formattenNumber = Number(formattedString);
    return isNaN(formattenNumber) ? 0 : formattenNumber;
};

export const setButtonEvent = (productList) => {
    filterButton.onclick = () => {
        const maxPrice = convertPriceToNumber(maxPriceFilter.value) || MAX_PRICE;
        const minPrice = convertPriceToNumber(minPriceFilter.value) || 0;
        const discountRate = convertPercentToNumber(discountFilter.value) || 0;

        const newProductList =  productList.filter((productInfo) => {
            const { price, discountPercent } = productInfo;
            return price >= minPrice && price <= maxPrice && discountRate <= discountPercent;
        });

        const sectionDOM = document.getElementsByTagName('section')[0];
        const originalProductListDOM = document.getElementsByClassName('product-list-con')[0];
        sectionDOM.removeChild(originalProductListDOM);

        if (newProductList.length > 0) {
            //화면에 표시될 물품이 있음
            const productListDOM = getProductList(newProductList);
            sectionDOM.appendChild(productListDOM);
        } else {
            const emptyProductListDOM = makeDOMWithProperties('div',{
                className : 'product-list-con empty',
                innerHTML: '조건에 해당하는 상품이 없습니다.'
            });
            sectionDOM.appendChild(emptyProductListDOM);
        }  
    };
};

export const setFilterEvent = () => {
    minPriceFilter.onfocus = (event) => {
     event.target.value = convertPriceToNumber(event.target.value)
    };
    minPriceFilter.onblur = formatToPrice;
    maxPriceFilter.onfocus = (event) => {
     event.target.value = convertPriceToNumber(event.target.value)
    };
    maxPriceFilter.onblur = formatToPrice;
    discountFilter.onfocus = (event) => {
        event.target.value = convertPercentToNumber(event.target.value);
    };
    discountFilter.onblur =  (event) => {
        const value = event.target.value;
        const result = Number(value);
        if (isNaN(result)) {
            alert("숫자를 입력해주세요");
            event.target.value = 0;
        }
        if(result > 100 || result < 0) {
            alert("0 이상 100 이하의 숫자를 입력해주세요");
            event.target.value = 0;
            return;
        }
        event.target.value = `${result}%`;
    };
};