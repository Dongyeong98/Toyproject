export const makeDOMwithProperties =(domType, propertyMap) => {
    // domType : div, a, li ...
    // propertyMap : { "className " : "product-card " }
    // Object.keys(propertMap) -> ["className"] 객체안에서 키값만 가져온다.

    const dom = document.createElement(domType);
    Object.keys(propertyMap).forEach((key) => {
        dom[key] = propertyMap[key];
    });
    return dom;
};

export const appendChildrenList = (target, childrenList) => {
    if (!Array.isArray(childrenList)) return;

    childrenList.forEach((children) => {
        if (children instanceof Node) { // 유효한 노드 객체인지 확인
            target.appendChild(children);
        }
    });
};