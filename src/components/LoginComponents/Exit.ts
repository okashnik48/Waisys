import { serviceApi } from "../../services/app.service";
import { ClearUserProperties } from "../../store/slices/user";
import { useAppDispatch } from "../../store/store-hooks";

export const ClearUserInfo = ()=>{
  
    const dispatch = useAppDispatch()
    localStorage.clear()
    dispatch(serviceApi.util.resetApiState());
    dispatch(ClearUserProperties())
  }