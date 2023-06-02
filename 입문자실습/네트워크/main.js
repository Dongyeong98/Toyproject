fetch("./sample.json")
.then(async (result) => {
    console.log(result);
    if(result.ok){
        const data = await result.json();
        console.log(data);
    }
});

fetch("https://ohou.se")
.then((res) => {
    console.log("success", res);
})
.catch((err) => {
    console.log("error", err);
});