import { serviceApi } from "../services/app.service"
import { SetAddDishModal, SetAddUserModal } from "../store/slices/admin"
import { ClearUserProperties } from "../store/slices/user"
import { useAppDispatch } from "../store/store-hooks"

const dispatch = useAppDispatch()

export const AddUserHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
  e.preventDefault()
  dispatch(SetAddUserModal({status: true}))
}

export const AddDishHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
  e.preventDefault()
  dispatch(SetAddDishModal({status: true}))
}

export const ClearUserInfo = (e: React.MouseEvent<HTMLAnchorElement>)=>{
  e.preventDefault();
  localStorage.clear()
  dispatch(serviceApi.util.resetApiState());
  dispatch(ClearUserProperties())
}