import {useState} from 'react'
import {Navigate} from 'react-router-dom'

export default function LoginPage(){
    
    const[username, setUsername]=useState('');
    const[password, setPassword]=useState('');
    const[redirect,setRedirect] = useState(false);


    async function login(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        } else {
            alert('wrong credentials');
          }
        }

        if(redirect){
            return <Navigate to={'/'}/>
        }
    return(
        <div>
            <form className="login" onSubmit={login}>
                <h1>Enter Username & password</h1>
                <input 
                    type="text" 
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>                
                <input 
                    type="password" 
                    placeholder="passsword"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>                
                <button>Login</button>
            </form>
        </div>
    )
}