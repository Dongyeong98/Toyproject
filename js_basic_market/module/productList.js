import { makeDOMWithProperties } from "../utils/dom.js"
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList, removeCartCallback) => {
    if(productInfoList == null || !Array.isArray(productInfoList)) return;
    const productListContainer = makeDOMWithProperties('div',{
        className : 'product-list-con',
    });

    productInfoList.forEach((productInfo) => {
        productListContainer.appendChild(
            getProductCard({
                ...productInfo,
            },removeCartCallback)
        );
     })

     return productListContainer;
}