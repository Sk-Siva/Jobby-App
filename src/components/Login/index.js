import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 5})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isError, errorMsg} = this.state
    return (
      <div className="login-main-con">
        <div className="login-con">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="input-con">
              <label htmlFor="username">USERNAME</label> <br />
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="input-con">
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isError && <p className="error-text">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Home
