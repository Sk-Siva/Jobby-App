import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <ul className='nav-list-con'>
      <div className='header-con'>
        <Link to='/'>
          <li>
            <img
              className='logo'
              src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
              alt='website logo'
            />
          </li>
        </Link>
        <nav>
          <ul className='nav-list-con'>
            <Link to='/' className='link'>
              <li className='nav-item'>Home</li>
            </Link>
            <Link to='/jobs' className='link'>
              <li className='nav-item'>Jobs</li>
            </Link>
          </ul>
        </nav>

        <li>
          <button type='button' className='login-btn' onClick={onLogout}>
            Logout
          </button>
        </li>
      </div>
    </ul>
  )
}

export default withRouter(Header)
