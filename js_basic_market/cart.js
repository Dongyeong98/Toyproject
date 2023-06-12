import { getCartInfo } from "./module/cartToggleButton.js";
import { getProductList } from "./module/productList.js";
import { makeDOMWithProperties } from "./utils/dom.js";

// 부모 -> section tag
// 뒤에 있는 요소 -> id : cart-pay-container
// 장바구니 내부에 있는 물품 -> product-list-con

const sectionDOM = document.getElementsByTagName('section')[0];
const cartPayContanerDOM = document.getElementById('cart-pay-container');

// 1. 장바구니에 있는 물품 정보 가져오기

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();

// 2. 물품 정보 - productList 연결

if (cartInfo.length < 1) {
     // 장바구니에 상품이 없다는 언지
    const noticeDOM = makeDOMWithProperties('div',{
        innerHTML : '장바구니에 상품이 없습니다',
        className : 'product-list-con',
    })
    sectionDOM.insertBefore(noticeDOM, cartPayContanerDOM);
} else {
   const productListDOM = getProductList(cartInfo, reloadPage);
   sectionDOM.insertBefore(productListDOM, cartPayContanerDOM);
   
   // A.insertBefore(B,C)
   // B가 A아래의 C앞에 삽입된다.
}

// 3. section 아래의 cart-pay-container 앞에 삽입하기

