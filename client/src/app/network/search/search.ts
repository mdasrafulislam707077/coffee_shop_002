import axios from "axios";
import config from "../config";
export function searchFatch(search,callback){
    const formdata = new FormData()
    formdata.append("search",search)
    axios.post(`${config.HOST_SERVER_BASE_POINT}/searchProdect`,formdata).then((res)=>{
        if (callback) {
            callback(res)
        }
    }).catch((err)=>{
        if (callback) {
            callback(err)
        }
    })
    
}
