import { useContext } from 'react'
import './LandingPage.css'
import { authContext } from '../../Context/authContext/authContext'

export default function LandingPage(){

    const {authState,authDispatch,login} = useContext(authContext);

    const guestLogin = () =>{
        authDispatch({type:'guestLogin'})
    }

    return(
        <div className="landingPage">
            <h1>ALCONN</h1>
            <div className='loginPage'>
                <p className="loginTitle">Login to Alconn</p>
                <p onClick={()=>guestLogin()} className="guestName">Guest Login</p>
                <input onChange={(e) => authDispatch({type:'userName',payload:e.target.value})}    value={authState.userName} className="email" type="email" placeholder='Email address' />
                <input  onChange={(e) => authDispatch({type:'loginPassword',payload:e.target.value})}    value={authState.loginPassword} className="password" type="password" placeholder="Password" />
                <button onClick={()=>login()} className="login-btn">Log in</button>
                <div> <p>Forgotten account?</p>  <p>Sign up for Alconn</p> </div>
            </div>

        </div>
    )
}