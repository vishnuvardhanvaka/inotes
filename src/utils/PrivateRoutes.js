import { Route,Navigate, Outlet } from "react-router-dom";

const PrivateRoutes =({children,...rest})=>{
    let auth = {'token':localStorage.getItem('access_token')!==null}
    return(
        auth.token ? <Outlet/> : <Navigate to='/signin'/>
    )
}
export default PrivateRoutes;

