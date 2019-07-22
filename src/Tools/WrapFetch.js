import { message} from 'antd';

let WrapFetch ={
     get:(url,callback,successStr)=>{
        fetch(url).then(
            response=>{
                if(response.ok){
                    return response.json();
                }else{
                    message.error(response.statusText);
                }
            }
        ).then(json =>{
            try{
                if(!json){
                    return ;
                }
                if(json.code!='0'){
                    message.error(json.msg);
                }else{
                    if(successStr){
                        message.success(successStr);
                    }
                    callback(json.data);
                }
            }catch(err){
                message.error(err.message);
                console.log(err);
            }
        })
    }
}
export default WrapFetch;