function getLang(): string{
    let params: string[] = window.location.search.substring(1).split("&");
    let lang = "";
    params.forEach((v: string)=>{
        let l: string[] = v.split("=");
        if ("lang" === l[0]) {
            lang = l[1];
        } else {
            lang = window.navigator.language;
        }
    });
    console.log(`Current lang is ${lang}`);
    return lang;
}
export const NPPCSettings = {
    lang: getLang(),
    server: {
        url: "http://localhost:8000/",
    }
}