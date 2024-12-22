import actionNames from "./actionName";
import favoriteItems from "./state";
export default function favoriteReducer(state = favoriteItems,action){
        switch (action.type) {
            case actionNames.REMOVE_ALL:
                return {...state,items:[]}
            case actionNames.INJECT_FAVORITE_ITEMS:
                return {...state,items:action?.items??[],init:true}
        
            default:
                return state
        }
}