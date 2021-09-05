/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-no-duplicate-props */
import styles from '../../styles/Login.module.css'
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import LoginLoading from '../../components/LoginLoading'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)



  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Your state values: \n
            emal: ${email} \n
            password: ${password} \n
            You can replace this alert with your proces`)
  }
  let history = useHistory()
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  const successResponseGoogle = response => {
    history.push('/')
  }
  const failureResponseGoogle = response => {
    console.log(response)
  }
  return (
    <div className={`container-fluid ${styles.body}`}>
        {showLoader && <LoginLoading />}
      <div class={`row`}>
        <div class={`col-lg-5 col-md-12 ${styles.side}`}>
          <div className={`row`}>
            <img src="/Group3155.png" alt="" />
            <div className={`col-md-12 mb-5`}>
              <img
                className={`float-end mt-4 ${styles.headimg}`}
                src="/Group3150.svg"
                alt=""
              />
            </div>
          </div>
          <div className={`col-md-12 text-center text-white ${styles.header}`}>
            <h3 className={` ${styles.headertext}`}>
              Have fun while working <br /> as a team
            </h3>
            <p className={`${styles.text}`}>
              Unlimited team collaboration platform
            </p>
            <img src="/Group3149.svg" alt="" />
          </div>
          <div class={`col-md-6 col-md-6 d-flex ${styles.person}`}>
            <img class={`${styles.flower}`} src="/Group3151.png" alt="" />
            <img class={`${styles.person1}`} src="person1.svg" alt="" />
            <img class={`${styles.person2}`} src="person2.svg" alt="" />
          </div>
        </div>
        <div class={`col-lg-7 col-md-12 ${styles.login}`}>
          <div className={`pt-4 mt-3 text-center`}>
            <span>
              <img src="logo.svg" alt="logo" />
            </span>
          </div>
          <div className={`pt-1 mt-3`}>
            <h2 className={`pt-2 ${styles.loginheader} text-dark`}>Log in</h2>
            <p className={styles.subtext}>
              Login with the data you entered during your registration
            </p>
            <div className={`my-lg-3 my-sm-3 text-center`}>
              <GoogleLogin
                clientId="78755437309-27q9m2toval9c439d2r7q5gj28h0pqcc.apps.googleusercontent.com"
                render={renderProps => (
                  <img
                    onClick={renderProps.onClick}
                    className={`mx-3 ${styles.icon}`}
                    src={`/google.png`}
                    alt="google icon"
                  />
                )}
                buttonText=""
                onSuccess={successResponseGoogle}
                onFailure={failureResponseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <img
                className={`mx-lg-3 mx-sm-3 ${styles.icon}`}
                src={`/apple.png`}
                alt="apple icon"
              />
            </div>
            <div className={`d-flex ${styles.email_input}`}>
              <div className={`mb-2 col-12 col-md-6 w-100`}>
            </div>
            <form className={`mb-sm-3`} onSubmit={handleSubmit}>
              <div className={` ${styles.email_input}`}>
                <div className={`mb-lg-3 mb-md-3 mb-sm-3 col-sm-12 col-md-6 w-100`}>
                  <label for="Email1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`py-lg-3 py-md-3 py-sm-3 form-control`}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                   
                  />
                </div>
              </div>
              <div className={`d-flex ${styles.email_input}`}>
                <div className={`mb-lg-3 mb-md-3 mb-sm-3  col-sm-12 col-md-6 w-100`}>
                  <label for="Password" class="form-label">
                    Password
                  </label>
                  <input
                     type={showPassword ? 'text' : 'password'}
                    className={`py-lg-3 py-md-3 py-sm-3 form-control`}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
                    placeholder="Enter a password"
                  />
                </div>
                <i
                className={`cursor-pointer far fa-eye${
                  showPassword ? '' : '-slash'
                } ${styles.far}`}
                onClick={handleClickShowPassword}
              ></i>
              </div>
              <div class="mb-lg-2 mb-md-2 mb-sm-3 my-sm-3 form-check">
                <input type="checkbox" class="form-check-input" id="Check" />
                <label
                  className={`form-check-label text-secondary ${styles.check}`}
                  for="Check"
                >
                  Remember me
                </label>
                <label
                  className={`float-md-end text-secondary  ${styles.checktext}`}
                >
                  Forgot password?{' '}
                  <a href="/" className={`${styles.checklink}`}>
                    Get help signing in
                  </a>
                </label>
              </div>
            </form>
            <div>
              <Button
                 className={`${styles.button} btn mb-3 col-12 col-md-6 px-lg-5 px-md-5 py-lg-3 py-md-3`}
                 type="submit"
                 disabled={!email || !password}
                 onClick={() => setShowLoader(true)}
               >
                 Log in
              </Button>
            </div>
            <div className={`my-2`}>
              <p
              >
                New to us?{' '}
                <a href="/" className={`${styles.checklink}`}>
                  Create an Account
                </a>
              </p>
            </div>
          </div>
          <div
            class={`d-flex justify-content-around ${styles.footer}`}
          >
            <a href="/" class={`mx-md-4 text-secondary`}>
              Contact Us
            </a>
            <a href="/" class={`mx-md-4 text-secondary`}>
              Legal Policy
            </a>
            <a href="/" class={`mx-md-4 text-secondary`}>
              <i class="fas fa-globe"></i> Change Region{' '}
              <i class="fas fa-caret-down"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
