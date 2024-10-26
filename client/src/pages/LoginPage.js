export default function LoginPage(){
    return(
        <div>
            <form className="login">
                <h1>Enter Username & password</h1>
                <input type="text" placeholder="username"/>                
                <input type="password" placeholder="passsword"/>                
                <button>Login</button>
            </form>
        </div>
    )
}