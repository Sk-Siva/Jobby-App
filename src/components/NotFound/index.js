import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-con">
      <img
        className="notfound-img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we're sorry, the page you requested could not be found</p>
      <button type="button" className="login-btn">
        Retry
      </button>
    </div>
  </>
)

export default NotFound
