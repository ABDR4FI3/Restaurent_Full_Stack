import { useNavigate } from "react-router-dom";

export const RedirectToLogin = (token: string) => {
  const navigate = useNavigate();

  if (!token) {
    navigate("/"); 
    localStorage.removeItem("token");
  }else{
    console.log("token Valid :" + token);
  }
};
