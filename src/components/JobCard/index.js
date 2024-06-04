import {Link} from 'react-router-dom'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-con">
      <li>
        <div className="job-card">
          <div className="job-head">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
