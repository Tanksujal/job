import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Home from "./pages/mainpages/home";
import RegisterUser from "./pages/mainpages/registerUser";
import LoginUser from "./pages/mainpages/loginuser";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterCompany from "./pages/compaypanelpages/companyregister";
import Profileuser from "./pages/mainpages/profileuser";
import LoginCompany from "./pages/compaypanelpages/companylogin";
import Dashboard from "./pages/compaypanelpages/dashboard";
import Showjobs from "./pages/compaypanelpages/jobspages/showjobs";
import Addjobs from "./pages/compaypanelpages/jobspages/addjobs";
import Editjobs from "./pages/compaypanelpages/jobspages/editjobs";
import JobDetails from "./pages/mainpages/jobdetails";
import Applications from "./pages/compaypanelpages/applications";
import PrivateRoute from "./pages/privateRoute/privateRoute";
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/loginuser" replace />;
//   }
//   return children;
// };
function App() {
  const apiurl = import.meta.env.VITE_API_URL
  const [user,setuser] = useState([])
  const [isloggedin,setisloggedin] = useState(false)
  
  useEffect(()=>{
    const getuser = async() => {
      try {
        const response = await axios.get(`${apiurl}/getuser`,{withCredentials:true})
        if(response.data.success){
          console.log(response.data);
          setuser(response.data.user)
          setisloggedin(true)
        }
      } catch (error) {
        console.log(error);
        setisloggedin(false);
        return false
      }
    }
    getuser()
  },[])
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home user={user} isloggedin={isloggedin}/>} />
          <Route path="/registeruser" element={<RegisterUser/>} />
          <Route path="/loginuser" element={<LoginUser/>} />
          <Route path="/registercompany" element={<RegisterCompany/>} />
          <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profileuser user={user} />
            </PrivateRoute>
          }
        />
          <Route path="/logincompany" element={<LoginCompany/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/application" element={<Applications/>} />
          <Route path="/showjobs" element={<Showjobs/>} />
          <Route path="/addjobs" element={<Addjobs/>} />
          <Route path="/editjobs/:id" element={<Editjobs/>} />
          <Route path="/jobs/:id" element={<JobDetails user={user} isloggedin={isloggedin}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App