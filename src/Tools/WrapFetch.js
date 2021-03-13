import { message} from 'antd';

let WrapFetch ={
     get:(config)=>{
         let url=config['url'];
         let successStr=config['successStr'];
         let queryParam=config['queryParam'];
         if (queryParam) {
            let paramsArray = [];
            //拼接参数
            Object.keys(queryParam).forEach(key => paramsArray.push(key + '=' + queryParam[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return new Promise((resolve,reject)=>{
            fetch(url).then(
                response=>{
                    if(response.ok){
                        return response.json();
                    }else{
                        message.error(response.statusText);
                        reject(response.statusText);
                    }
                }
            ).then(json =>{
                try{
                    if(!json){
                        return ;
                    }
                    if(json.code!==0){
                        message.error(json.msg);
                    }else{
                        if(successStr){
                            message.success(successStr);
                        }
                        resolve(json.data);
                    }
                }catch(err){
                    message.error(err.message);
                    console.log(err);
                    reject(err);
                }
            })
         })
    }
}
export default WrapFetch;