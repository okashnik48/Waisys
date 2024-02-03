import { useAppDispatch } from "../../App";
import { serviceApi } from "../../services/app.service";
import { ClearUserProperties } from "../Flowbite/redux/user";

export const ClearUserInfo = ()=>{
  
    const dispatch = useAppDispatch()
    localStorage.clear()
    dispatch(serviceApi.util.resetApiState());
    dispatch(ClearUserProperties())
  }