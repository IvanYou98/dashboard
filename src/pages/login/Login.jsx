import "./login.scss"
import {useContext, useEffect, useState} from 'react'
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    let {dispatch} = useContext(AuthContext);


    const handleLogIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch({type: "LOGIN", payload: user})
                setError(false);
                navigate("/")
            })
            .catch((error) => {
                setError(true);
            });
    }

    return (
    <div className="login">
      <form onSubmit={handleLogIn}>
          <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
          {error && <span>Wrong password and email!</span>}
      </form>
    </div>
  )
}

export default Login