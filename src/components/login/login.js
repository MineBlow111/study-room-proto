import {auth, provider} from '../../firebase-config.js';
import {signInWithPopup} from 'firebase/auth';
import {useState} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Auth = (props) => {
    const { setIsAuth } = props;
    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    });

    const handleAvatar = e => {
        if (e.target.files[0])
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(cookies.get('auth-token'));
        }
        catch(err) {
            console.error(err);
        }
    }

    // <div className = "container">
    //     <p> Sign in wit Gooog NOW </p>
    //     <button onClick={signInWithGoogle}> SIGN IN WITH GOOG </button>
    // </div>

    return <div className = "login">
        <div className='loginf'>
            <h2> Welcome back </h2>
            <form>
                <input type = "text" placeholder='Email' name = "email"/>
                <input type = "password" placeholder='Password' name = "password"/>
                <button>Sign In</button>
                <button type = "button" className = "specialButton" onClick={signInWithGoogle}>Sign in With Google Account</button>
            </form>
        </div>
        <div className='separator'>
        </div>
        <div className='item'>
            <h2> Create an account </h2>
            <form>
                <label htmlFor='file'>
                <img src = {avatar.url || "./logo192.png"} alt=""/>
                    Upload an image</label>
                <input type = "file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type = "text" placeholder='Username' name = "email"/>
                <input type = "password" placeholder='Password' name = "password"/>
                <button>Register</button>
            </form>
        </div>
    </div>
}