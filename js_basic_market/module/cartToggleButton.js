import { makeDOMWithProperties } from "../utils/dom.js";
import { CART_COOKE_KEY } from "../constants/cart.js";

export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKE_KEY)) || [];

const isInCart = ({ id }) => {
    // 현재 해당 상품이 장바구니 안에 있는지 판단하여 결과를 반환
    const originalCartInfo = getCartInfo();
    
    return !!originalCartInfo.find((cartInfo) => cartInfo.id === id);

};

const removeCartInfo = ({ id }) => {
    // 장바구니에서 해당 물품의 정보를 삭제하는 함수
    const originalCartInfo = getCartInfo();
    const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);

    localStorage.setItem(CART_COOKE_KEY,JSON.stringify(newCartInfo));
};
 
const addCartInfo = (productInfo) => {
    // 장바구니에 해당 물품의 정보를 저장
    const originalCartInfo = getCartInfo();
    
    if(originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return;
    // 똑같은 물품이 한개만 입력되게 if문으로 구현
    localStorage.setItem(CART_COOKE_KEY,JSON.stringify([
        ...originalCartInfo,
        productInfo,
    ]));
};

export const getCartToggleButton = (productInfo,removeCartCallback ) => {
    let inCart = isInCart(productInfo);
    const cartToggleBtn = makeDOMWithProperties('button', {
        className : 'cart-toggle-btn',
        type : 'button',
        onclick : () => {
            if(inCart) { // 이미 장바구니에 들어가 있다면
                if(!confirm(`${productInfo.name}을 장바구니에서 삭제하시겠습니까?`)) return;   
                removeCartInfo(productInfo);
                cartImage.src = 'public/assets/cart.png';
                removeCartCallback?.();
            } else {
                addCartInfo(productInfo); // 장바구니 넣기
                cartImage.src = 'public/assets/cartDisabled.png';
                if(confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요?")){
                    location.href ='cart.html';
                }
            }
            inCart = !inCart;
        }
    });
    const cartImage = makeDOMWithProperties('img', {
        className : 'cart-image',
        src: inCart ? 'public/assets/cartDisabled.png' :'public/assets/cart.png',
    });
    cartToggleBtn.appendChild(cartImage);
    
    return cartToggleBtn;
}