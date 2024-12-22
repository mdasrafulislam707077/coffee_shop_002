import config from "@/app/network/config"
import injectFavoriteItems from "@/app/redux/favorite/action"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function useFavorite(){
    const email = useSelector(state=>state?.userInfo?.email)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (email) {
            axios.get(`${config.HOST_SERVER_BASE_POINT}/favorites/${email}`).then((res)=>{
                dispatch(injectFavoriteItems(res?.data?.items))
            }).catch((err)=>{
                console.log(err)
    
            })
        }
        
    },[email])
    
}