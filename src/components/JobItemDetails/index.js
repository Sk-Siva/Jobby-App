import {Component} from 'react'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const statusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetail: {},
    similarJobsList: [],
    skillsList: [],
    lifeAtCompanyDetails: {},
    status: statusConstants.loading,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobItemData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const updatedSkillsList = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetail: updatedJobItemData,
        skillsList: updatedSkillsList,
        similarJobsList: updatedSimilarJobs,
        lifeAtCompanyDetails: updatedLifeAtCompany,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onRetry = () => {
    this.setState({status: statusConstants.loading}, this.getJobItemDetails)
  }

  getProfileDetails = () => {
    const {jobDetail, skillsList, lifeAtCompanyDetails, similarJobsList} =
      this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetail
    const {description, imageUrl} = lifeAtCompanyDetails

    return (
      <div className="jobItem-main-con">
        <div className="job-card2">
          <div className="job-head">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-con">
                <FaStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-con">
            <div className="location-con">
              <div className="location">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="location">
                <FaSuitcase />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="package-con">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skills-list-con">
            {skillsList.map(each => (
              <li key={each.name}>
                <div className="skills">
                  <img
                    className="skills-img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p>{each.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>

        <ul className="similar-job-list">
          {similarJobsList.map(each => (
            <SimilarJobsCard key={each.id} similarJobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  getJobItemViews = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.success:
        return this.getProfileDetails()
      case statusConstants.loading:
        return this.getLoaderView()
      case statusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  getLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  render() {
    return (
      <>
        <Header />
        <div className="jobitem-main-con">{this.getJobItemViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
