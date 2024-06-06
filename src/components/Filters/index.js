import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const statusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Filters extends Component {
  state = {
    profileDetails: {},
    status: statusConstants.loading,
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  getProfileContainer = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-con">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.setState({status: statusConstants.loading}, this.getProfileDetails)
  }

  getFailureView = () => (
    <div className="failure-view">
      <button type="button" className="login-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  getProfileDetailsView = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.success:
        return this.getProfileContainer()
      case statusConstants.loading:
        return this.getLoaderView()
      case statusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  handleEmploymentTypeChange = event => {
    const {selectedEmploymentTypes} = this.state
    const {updateEmploymentType} = this.props
    const {id, checked} = event.target
    const updatedEmploymentTypes = checked
      ? [...selectedEmploymentTypes, id]
      : selectedEmploymentTypes.filter(typeId => typeId !== id)
    this.setState({selectedEmploymentTypes: updatedEmploymentTypes}, () => {
      updateEmploymentType(updatedEmploymentTypes)
    })
  }

  handleSalaryRangeChange = event => {
    const {updateMinimumPackage} = this.props
    this.setState({selectedSalaryRange: event.target.id}, () => {
      updateMinimumPackage(this.state.selectedSalaryRange)
    })
  }

  render() {
    return (
      <div className="filter-con">
        {this.getProfileDetailsView()}
        <hr />
        <h1>Type of Employment</h1>
        <ul className="list-con">
          {employmentTypesList.map(each => (
            <li className="list" key={each.employmentTypeId}>
              <input
                type="checkbox"
                id={each.employmentTypeId}
                onChange={this.handleEmploymentTypeChange}
              />
              <label className="label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr />
        <h1>Salary Range</h1>
        <ul className="list-con">
          {salaryRangesList.map(each => (
            <li className="list" key={each.salaryRangeId}>
              <input
                type="radio"
                id={each.salaryRangeId}
                name="salary"
                onChange={this.handleSalaryRangeChange}
              />
              <label className="label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Filters
