import React from 'react';
import './logo.css';
import { useNavigate } from 'react-router-dom';
import company_logo from "../../images/company_logo.png"

export default function Logo() {

    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar')
    }

    const navigate = useNavigate()
    
  return (
    <div className='d-flex align-items-center justify-content-between'>
<a href='/' style={{ textDecoration:"none"}} className='logo d-flex align-iems-center'>
{/* <img  src={company_logo}/> */} 
<span className='d-none d-lg-block' style={{textShadow:"5px 5px 15px darkorange"}}>SVL    India</span>
</a>
<i className='bi bi-list toggle-sidebar-btn'  style = {{color:"white", textShadow:"5px 5px 10px darkorange"}}
onClick={handleToggleSideBar}
>

</i>
    </div>
  )
}
