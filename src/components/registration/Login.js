import React, { useRef, useState, useEffect, Fragment, useContext } from "react";
import classes from "./Login.module.css";
import { authenticate, updateUser,getUserById } from "../../services/api";
import { Link,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";


function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate(); 

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [id, setId] = useState();

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userBody = {
                username: user,
                password: pwd,
            };
            const response = await authenticate(userBody);
        
            const userSecondBody = {
                // id: 1,
                username: user,
                active: 1
            };
            updateUser(userSecondBody);
             const userId = await (await getUserById(user)).data;
             setId(userId);
            setSuccess(true);
            setAuth(response.data.jwt)
            // setUser("");
            setUser(user);
            setPwd("");



        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }

    };

    var isLoggedIn = false

    return (
        <Fragment>
            <div className={classes.all}><br></br><br></br><br></br>
                {success ? (
                    <section>
                

                        {sessionStorage.setItem('username', JSON.stringify(user))}
                        {sessionStorage.setItem('isActive', JSON.stringify(true))}
                        {sessionStorage.setItem('id', JSON.stringify(id))}
                        {navigate('/home')}

                    </section>

                )
                    : (
                        <section>
                            <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>
                                {errMsg}
                            </p>
                            <h1>Sign In</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="userName">User Name:</label>
                                <input
                                    className={classes.inputs}
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                                <label htmlFor="password">Password:</label>
                                <input
                                    className={classes.inputs}
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <button  className={classes.btnsignup} type="submit" disabled={!user || !pwd}>
                                    Sign In
                                </button>
                            </form>
                            <p >
                                <div class="acount" >
                                    Need an Account?
                                </div>
                                <span className="line">
                                    <Link to="/signUp">Sign Up</Link>
                                </span>
                            </p>
                        </section>
                    )}
            </div>
        </Fragment>
    );
}

export default Login;