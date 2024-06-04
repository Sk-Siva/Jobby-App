import {Link} from 'react-router-dom'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-con">
      <li>
        <div className="similar-job">
          <div className="job-card2">
            <div className="job-head">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="similar job company logo"
              />
              <div>
                <h1 className="title">{title}</h1>
                <div className="rating-con">
                  <FaStar className="star" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <hr />
            <p>Description</p>
            <p>{jobDescription}</p>
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
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobsCard
