import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SIGNUP, LOGIN } from '../redux/actionTypes.js'

function RegistationForm(props) {

  const dispatch = useDispatch()
  const history = useHistory()

  const signupHandler = (e) => {
    e.preventDefault()
    const { name, surname, email, password, role } = e.target
    console.log(name.value, surname, email, password);

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ name: name.value, surname: surname.value, email: email.value, password: password.value, role: role.value })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          dispatch({ type: SIGNUP, payload: data.user });
          return history.push('/profile')
        } else {
          alert('Failed to register user')
        }
      })
  }

  const signinHandler = (e) => {
    e.preventDefault()
    const { email, password } = e.target
    fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          dispatch({ type: LOGIN, payload: data.user });
          return history.push('/profile')
        } else {
          alert('Failed access to this account')
        };
      })
  }

  return (

    <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "marginTop": "5rem" }}>
      <div><h1>Welcome to app!</h1></div>

      <div style={{ "display": "flex", "flexDirection": "row" }}>
        <form onSubmit={signupHandler} style={{ "display": "flex", "flexDirection": "column", "marginRight": "5rem" }}>
          <label >Name</label>
          <input name="name" type="text" autoFocus /><br />

          <label >Surname</label>
          <input name="surname" type="text" /><br />

          <label >Email</label>
          <input name="email" type="email" /><br />

          <label >Password</label>
          <input name="password" type="password" /><br />
          <div className="form-check">
            <input className="form-check-input" type="radio" name="role" id="user" value="user" defaultChecked />
            <label className="form-check-label" >
              User
              </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="role" id="admin" value="admin" />
            <label className="form-check-label" >
              Admin
              </label>
          </div>
          <input type="submit" value="Signup" style={{"marginTop": "1rem"}}/>
        </form>
        <div style={{ "borderLeft": "3px solid blue", "paddingLeft": "10px" }}></div>
        <form onSubmit={signinHandler} style={{ "display": "flex", "flexDirection": "column", "marginLeft": "5rem" }}>

          <label >Email</label>
          <input name="email" type="email" /><br />

          <label >Password</label>
          <input name="password" type="password" /><br />
          <input type="submit" value="Signin" />
        </form>
      </div>
    </div>

  );

}

export default RegistationForm;
