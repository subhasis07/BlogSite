export default function RegisterPage(){
    return(
        <div>
            <form className="register">
                <h1>Register here</h1>
                <input type="text" placeholder="username"/>                
                <input type="password" placeholder="passsword"/>                
                <button>Register</button>
            </form>
        </div>
    )
}