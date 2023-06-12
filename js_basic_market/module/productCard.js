import { makeDOMWithProperties,appendChildrenList } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";
export const getProductCard = (productInfo, removeCartCallback) => {
    const {
        imgSrc,
        name,
        discountPercent,
        price,
        originalPrice,
    } = productInfo;

const productCard = makeDOMWithProperties('div',{
    className : 'product-card',
});

// --- product-image-con ---
const productImageCon = makeDOMWithProperties('div', {
    className : 'product-image-con',
});

const productImage = makeDOMWithProperties('img', {
    src : imgSrc,
    alt : name,
});

const cartToggleBtn =  getCartToggleButton(productInfo, removeCartCallback);

appendChildrenList(productImageCon,[productImage, cartToggleBtn]);
// --- product-image-con ---

// --- product-description ---

const productDescription = makeDOMWithProperties('div', {
    className : 'product-description',
});

const productName = makeDOMWithProperties('div', {
    className : 'product-name',
    innerHTML: name,
});

const productPriceContainer = makeDOMWithProperties('div', {
    className : 'product-price-con',
});
const productDiscount = makeDOMWithProperties('div', {
    className : 'product-discount-percent',
    innerHTML : `${discountPercent}%`,
});
const productPrice = makeDOMWithProperties('div', {
    className: 'product-price',
    innerHTML : `${price.toLocaleString()}원`,
});

const productOriginalPrice = makeDOMWithProperties('div', {
    className : 'product-original-price',
    innerHTML : `${originalPrice.toLocaleString()}원`,
});

appendChildrenList(productPriceContainer,[productDiscount, productPrice]);
appendChildrenList(productDescription, [productName, productPriceContainer, productOriginalPrice]);

appendChildrenList(productCard, [productImageCon, productDescription]);

    return productCard;

}