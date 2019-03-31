import 'whatwg-fetch';
import 'es6-promise';

export function getData(){
    var result=fetch('/article/list');
    result.then(res=>{
        return res.text();
    }).then(text=>{
        console.log(text);
    })
}