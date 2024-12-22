import actionNames from "./actionName"
export default function injectFavoriteItems(items){
    return {
        type:actionNames.INJECT_FAVORITE_ITEMS,
         items
    }
}