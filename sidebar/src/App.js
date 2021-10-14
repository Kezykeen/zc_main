import Sidebar from "./sidebar.component"
import { useEffect, useReducer } from "react"
import SkeletonLoader from "./components/SkeletonLoader"
import { fetchUser } from "./utils/fetchUserDetails"
import themeColors from "../../theming/themecolors"

export const ACTIONS = {
  ADD_USER_INFO: "add-user-info",
  ADD_ITEM: "add",
  UPDATE_PLUGINS: "update",
  ADD_ORGANIZATION: "add-org-email"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      //Add items to sidebar
      var sidebar_data = action.payload
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          ...sidebar_data
        }
      }
    case ACTIONS.UPDATE_ITEM:
      //Update sidebar
      var sidebar_update = action.payload
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          ...sidebar_update
        }
      }

    case ACTIONS.ADD_USER_INFO:
      //Add user info
      var userInfo = action.payload
      return {
        ...state,
        user: {
          ...state.user,
          ...userInfo
        }
      }
    case ACTIONS.ADD_ORGANIZATION:
      //set organization info
      var org_info = action.payload
      return {
        ...state,
        organization_info: {
          ...state.organization_info,
          ...org_info
        }
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {})
  const themeStyle= localStorage.getItem("customTheme");
  if(themeStyle!==null|| themeStyle!=="") {
    const sideBarDiv = document.getElementById("single-spa-application:@zuri/sidebar")
  sideBarDiv.style.backgroundColor= themeColors[themeStyle]?.primary
  sideBarDiv.style.color= themeColors[themeStyle]?.textColor;
  } else{
    const newClass= document.getElementsByClassName("sb__container--pk_Ve__Sidebar-module")
    newClass[0].style.backgroundColor="#fff"
  }
  
  //const newClass= document.getElementsByClassName("sb__container--pk_Ve__Sidebar-module")
  //newClass[0].style.backgroundColor="inherit"
  useEffect(() => {
    //Load user related information when component mounts
    fetchUser(dispatch)
  }, [])

  return !state.sidebar ? (
    <SkeletonLoader />
  ) : (
    <Sidebar state={state} dispatch={dispatch} />
  )
}
