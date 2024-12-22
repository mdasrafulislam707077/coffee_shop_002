import actionName from "./actionName";
import paymentToken from "./state";
export function tokenReducers(state=paymentToken, action) {
  switch (action.type) {
    case actionName.ACTIVE_TOKEN:
     return {...state,
        activeToken:{...action?.activeToken}
     }
    case actionName.ALL_TOKEN_INJECT:
     return {...state,
        listOfToken:action?.list
     }
    case actionName.REMOVE_TOKEN:
      return {...state,
        activeToken:{}
      }
      case actionName.ALL_REMOVE_LIST:
        return {...state,
          listOfToken:[]
        }

    default:
      return state;
  }
}