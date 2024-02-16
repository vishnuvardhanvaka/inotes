import React,{useState} from "react";
import logincss from './Login.module.css';
import {Link,useNavigate} from 'react-router-dom';


function Login({isLogin,URL}){
  URL=URL+'login/';
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

  const [message1,setmessage1]=useState('')
  const [message2,setmessage2]=useState('')
  
  const navigate=useNavigate();

  
  function handleForgetPassword(e){
    
    setmessage2('Please wait...')
    if (email.trim()!=''){
    const form=new FormData()
    form.append('stage',1)
    form.append('email',email)
    
    fetch(URL,{
        method:'POST',
        mode:'cors',
        credentials:'include',
        body:form
    })
    .then((response)=>response.json())
    .then((data)=>{
        {
        setmessage2(data['message']);
        }

    })
    }
    else{
        setmessage2('Please enter your Mail ID');
    }
  }


  function handleSubmit(e){
    e.preventDefault()
    setmessage1('Please wait ...')
    const form=new FormData;
    form.append('stage',0)
    form.append('email',email)
    form.append('password',password)
    fetch(URL,{
      method:'POST',
      body:form
    })
    .then((response)=>response.json())
    .then((data)=>{
      if (data['status']!=1){
      setmessage1(data['message'])
      }
      else{
        setmessage1('')
        isLogin()
        localStorage.setItem('isLoggedIn','true')
        localStorage.setItem('email',email)
        localStorage.setItem('username',data['username'])
        localStorage.setItem('age',data['age'])
        localStorage.setItem('tab','knowledge-base')
        navigate('/home')
        
        
      }
    })
  }
  return (
    <div className={logincss.loginpage}>
    <div className={logincss.container}>
      <div className={logincss.name}>Login</div>
      <form onSubmit={handleSubmit}>
        <div className={logincss.email}>
          <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          required
          />
        </div>
        <div className={logincss.email}>
          <input
          type='text'
          placeholder="Password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          required
          />
        </div>
        <div className={logincss.message1}>{message1}</div>
        <button type='submit'>Login</button>
      </form>
      <div className={logincss.loginoptions}>
      <div className={logincss.message2}>{message2}</div>
        <button type='button' onClick={handleForgetPassword}>Forget Password</button>
        <span className={logincss.registerlink}>
          Don't have an account?
          <Link to="/signup"><button type='button'>Register</button></Link>
        </span>
      </div>
    </div>
    </div>
  )
}

export default Login;