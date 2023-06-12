import { fetchSectionListDate } from "./module/fetch.js";
import { getProductSection } from "./module/productSection.js";

try{
const sectionInfoList = await fetchSectionListDate();

sectionInfoList.forEach((sectionInfo) => {
    console.log(sectionInfo);
    const { sectionTitle, productList } = sectionInfo;
    const productSectionDOM = getProductSection(sectionTitle, productList);
    document.body.appendChild(productSectionDOM);
})
} catch (error){
    console.log(error);
}




// document.body.appendChild(productSection);
