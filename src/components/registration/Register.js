import React, { useRef, useState, useEffect, Fragment } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Register.module.css";
import { createNewUser } from "../../services/api";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstN, setFirstN] = useState('');
    const [firstNFocus, setFirstNFocus] = useState(false);

    const [lastN, setLastN] = useState('');
    const [lastNFocus, setLastNFocus] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userEmailFocus, setUserEmailFocus] = useState(false);

    const [userPhone, setUserPhone] = useState('');
    const [userPhoneFocus, setUserPhoneFocus] = useState(false);

    const [userAddress, setUserAddress] = useState('');
    const [userAddressFocus, setUserAddressFocus] = useState(false);

    const [userCountry, setUserCountry] = useState('');
    const [userCountryFocus, setUserCountryFocus] = useState(false);

    const [userCity, setUserCity] = useState('');
    const [userCityFocus, setUserCityFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const newUserBody = {
                firstName: firstN,
                lastName: lastN,
                email: userEmail,
                username: user,
                password: pwd,
                phone: userPhone,
                addr: [userCountry,userCity],
                active: 0
            }
        
            const response = await createNewUser(newUserBody);
            setSuccess(true);

            setFirstN('');
            setLastN('');
            setUserEmail('');
            setUser('');
            setPwd('');
            setMatchPwd('');
            setUserPhone('');
            setUserAddress('');


        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <Fragment >
            <div className={classes.all}>
                <br></br>  <br></br>  <br></br>


                {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to={"/login"}>Sign In</Link>
                        </p>
                    </section>
                ) : (
                    <section >

                        <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="firstname">
                                First Name:
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="firstname"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setFirstN(e.target.value)}
                                value={firstN}
                                required
                                onFocus={() => setFirstNFocus(true)}
                                onBlur={() => setFirstNFocus(false)}
                            />


                            <label htmlFor="lastname">
                                Last Name:
                            </label>
                            <input
                                className={classes.inputs}

                                type="text"
                                id="lastname"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setLastN(e.target.value)}
                                value={lastN}
                                required
                                onFocus={() => setLastNFocus(true)}
                                onBlur={() => setLastNFocus(false)}
                            />

                            <label htmlFor="useremail">
                                Email:
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="useremail"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserEmail(e.target.value)}
                                value={userEmail}
                                required
                                onFocus={() => setUserEmailFocus(true)}
                                onBlur={() => setUserEmailFocus(false)}
                            />

                            <label htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validName ? classes.valid : classes.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? classes.hide : classes.invalid} />
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />  <br></br>

                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? classes.valid : classes.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? classes.hide : classes.invalid} />
                            </label>
                            <input
                                className={classes.inputs}
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />  <br></br>

                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                            </p>


                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? classes.valid : classes.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? classes.hide : classes.invalid} />
                            </label>
                            <input
                                className={classes.inputs}
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br></br>
                                Must match the first password input field.
                            </p>

                            <label htmlFor="userphone">
                                Phone:
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="userphone"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserPhone(e.target.value)}
                                value={userPhone}
                                required
                                onFocus={() => setUserPhoneFocus(true)}
                                onBlur={() => setUserPhoneFocus(false)}
                            />
<label htmlFor="usercountry">
                                Country:
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="usercountry"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserCountry(e.target.value)}
                                value={userCountry}
                                required
                                onFocus={() => setUserCountryFocus(true)}
                                onBlur={() => setUserCountryFocus(false)}
                            />

<label htmlFor="usercity">
                                City:
                            </label>
                            <input
                                className={classes.inputs}
                                type="text"
                                id="usercity"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserCity(e.target.value)}
                                value={userCity}
                                required
                                onFocus={() => setUserCityFocus(true)}
                                onBlur={() => setUserCityFocus(false)}
                            />



                            <button className={classes.btnsignup} disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className={classes.line}>
                                <Link to={"/login"}>Sign In</Link>
                            </span>
                        </p>
                    </section>
                )}
            </div>
        </Fragment>
    )
}

export default Register