import { getproductSection } from "./module/productSection.js";

const productSection = getproductSection('인기 상품', [
    {
        "id" : 4,
        "imgSrc" : "public/assets/삼겹살.jpg",
        "name" : "구이용 삼겹살 600g (냉장)",
        "discountPercent" : 5,
        "price" : 14820,
        "originalPrice" : 15600
    },
    {
        "id" : 5,
        "imgSrc" : "public/assets/머핀.jpg",
        "name" : "[홍대 W마켓] 머핀 (2입)",
        "discountPercent" : 20,
        "price" : 4800,
        "originalPrice" : 6000
    },
    {
        "id" : 6,
        "imgSrc" : "public/assets/원두.jpg",
        "name" : "[카페 W] 디카페인 원두 1kg",
        "discountPercent" : 15,
        "price" : 7140,
        "originalPrice" : 8400
    }  
]);

const bodyDOM = document.body;
bodyDOM.appendChild(productSection);