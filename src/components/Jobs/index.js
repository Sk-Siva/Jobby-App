import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Filters from '../Filters'
import JobCard from '../JobCard'

import './index.css'

const statusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  noJobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    status: statusConstants.loading,
    employmentType: [],
    minimumPackage: '',
    searchText: '',
  }

  componentDidMount() {
    this.getProductsList()
  }

  getProductsList = async () => {
    this.setState({status: statusConstants.loading})
    const {employmentType, minimumPackage, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeString = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchText}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      if (data.jobs.length === 0) {
        this.setState({status: statusConstants.noJobs})
      } else {
        const updatedJobList = data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))
        this.setState({
          jobsList: updatedJobList,
          status: statusConstants.success,
        })
      }
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  getJobsListView = () => {
    const {jobsList} = this.state
    const isJobs = jobsList.length > 0
    return isJobs ? (
      <div>
        <div className="search-con">
          <input
            className="search-input"
            type="search"
            placeholder="search"
            onChange={this.updateSearchText}
          />
          <button
            className="search"
            type="button"
            data-testid="searchButton"
            onClick={this.getProductsList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-list-con">
          {jobsList.map(each => (
            <JobCard key={each.id} jobDetails={each} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="not-found-con">
        <img
          className="notfound-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no job"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any job. Try other filters.</p>
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.setState({status: statusConstants.loading}, this.getProductsList)
  }

  getFailureView = () => (
    <div className="not-found-con">
      <img
        className="notfound-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="login-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  updateEmploymentType = employmentType => {
    this.setState({employmentType}, this.getProductsList)
  }

  updateMinimumPackage = minimumPackage => {
    this.setState({minimumPackage}, this.getProductsList)
  }

  updateSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  render() {
    const {status} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-con">
          <div>
            <Filters
              updateEmploymentType={this.updateEmploymentType}
              updateMinimumPackage={this.updateMinimumPackage}
            />
          </div>
          <div>
            {status === statusConstants.loading && this.getLoaderView()}
            {status === statusConstants.success && this.getJobsListView()}
            {status === statusConstants.failure && this.getFailureView()}
            {status === statusConstants.noJobs && (
              <div className="not-found-con">
                <img
                  className="notfound-img"
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no job"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any job. Try other filters.</p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
