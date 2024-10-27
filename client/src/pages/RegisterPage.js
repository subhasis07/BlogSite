import {useState} from 'react'

export default function RegisterPage(){
    const[username, setUsername]=useState('');
    const[password, setPassword]=useState('');

    async function register(event){
        event.preventDefault();
        
        const response = await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers: {'content-type':'application/json'}
        })

        if(response.status===200){
            alert("Registration Success")
        }else{
            alert("Registration failed")
        }
    }
    return(
        <div>
            <form className="register" onSubmit={register}>
                <h1>Register here</h1>
                <input 
                    type="text" 
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>                
                <input 
                    type="password" 
                    placeholder="passsword"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}/>                
                <button>Register</button>
            </form>
        </div>
    )
}