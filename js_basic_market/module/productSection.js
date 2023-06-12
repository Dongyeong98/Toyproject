import { appendChildrenList, makeDOMWithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

export const getProductSection = (sectionName, productInfoList) => {
    const productListSection = makeDOMWithProperties('div',{
        className : 'product-list-section',
    });

    const sectionTitle = makeDOMWithProperties('div',{
        className : 'section-title',
    });

    const titleHighLight = makeDOMWithProperties('span',{
        className : 'section-title-highlight',
    });

    const title = makeDOMWithProperties('span',{
        innerHTML : sectionName,
    });

    appendChildrenList(sectionTitle, [titleHighLight, title]);

    const productListContainer = getProductList(productInfoList);

    appendChildrenList(productListSection, [sectionTitle, productListContainer]);

    return productListSection;
}