import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-main-con">
      <Header />
      <div className="home-con">
        <h1>
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p>
          Millions of people are searching for jobs,salary
          <br /> information,company reviews.Find the job that fits your
          <br /> abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="login-btn" onClick={onFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
