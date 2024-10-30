import { useEffect, useState } from "react";
import Navbar from "../../components/maincomponents/navbar";
import axios from "axios";
import '../../styles/home.css'
import { Link } from "react-router-dom";
const Home = ({ user, isloggedin }) => {
  const apiurl = import.meta.env.VITE_API_URL;
  const [jobs, setjobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const jobfetch = async () => {
      try {
        const response = await axios.get(`${apiurl}/getalljob`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setjobs(response.data.job);
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    jobfetch();
  }, []); // Added dependency array to prevent infinite re-fetching
  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract the date part before 'T'
  };
  return (
    <div>
      <Navbar
        user={user}
        isloggedin={isloggedin}
        setSearchQuery={setSearchQuery}
      />
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="card filter-card">
                <div className="card-body">
                  <h5 className="filter-title">All Filters</h5>

                  <div className="filter-section">
                    <h6 className="filter-section-title">
                      Work mode
                      <i className="bi bi-chevron-up"></i>
                    </h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="workOffice"
                      />
                      <label className="form-check-label" htmlFor="workOffice">
                        Full-Time
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remote"
                      />
                      <label className="form-check-label" htmlFor="remote">
                        Part-Time
                      </label>
                    </div>
                    
                  </div>

                  <div className="filter-section">
                    <h6 className="filter-section-title">
                      Experience
                      <i className="bi bi-chevron-up"></i>
                    </h6>
                    <input
                      type="range"
                      className="form-range range-slider"
                      min="0"
                      max="100"
                      id="experienceRange"
                    />
                    <div className="range-labels">
                      <span className="range-label">0 Yrs</span>
                      <span className="range-label">Any</span>
                    </div>
                  </div>

                  <div className="filter-section">
                    <h6 className="filter-section-title">
                      Department
                      <i className="bi bi-chevron-up"></i>
                    </h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="engineering"
                      />
                      <label className="form-check-label" htmlFor="engineering">
                        Engineering - Soft... (41573)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="uxDesign"
                      />
                      <label className="form-check-label" htmlFor="uxDesign">
                        UX, Design & Archi... (1735)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="itInfo"
                      />
                      <label className="form-check-label" htmlFor="itInfo">
                        IT & Information Se... (561)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="dataScience"
                      />
                      <label className="form-check-label" htmlFor="dataScience">
                        Data Science & An... (383)
                      </label>
                    </div>
                    <a href="#" className="view-more">
                      View More
                    </a>
                  </div>
                  <div className="filter-section">
            <h6 className="filter-section-title">
              Location
              <i className="bi bi-chevron-up"></i>
            </h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="surat" />
              <label className="form-check-label" htmlFor="surat">
                Surat (615)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="navsari" />
              <label className="form-check-label" htmlFor="navsari">
                Navsari (3)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="bengaluru" />
              <label className="form-check-label" htmlFor="bengaluru">
                Bengaluru (12677)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="delhi" />
              <label className="form-check-label" htmlFor="delhi">
                Delhi / NCR (6743)
              </label>
            </div>
            <a href="#" className="view-more">View More</a>
          </div>

          <div className="filter-section">
            <h6 className="filter-section-title">
              Salary
              <i className="bi bi-chevron-up"></i>
            </h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="salary0-3" />
              <label className="form-check-label" htmlFor="salary0-3">
                0-3 Lakhs (4464)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="salary3-6" />
              <label className="form-check-label" htmlFor="salary3-6">
                3-6 Lakhs (28547)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="salary6-10" />
              <label className="form-check-label" htmlFor="salary6-10">
                6-10 Lakhs (35785)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="salary10-15" />
              <label className="form-check-label" htmlFor="salary10-15">
                10-15 Lakhs (17288)
              </label>
            </div>
            <a href="#" className="view-more">View More</a>
          </div>

          <div className="filter-section">
            <h6 className="filter-section-title">
              Company type
              <i className="bi bi-chevron-up"></i>
            </h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="foreignMNC" />
              <label className="form-check-label" htmlFor="foreignMNC">
                Foreign MNC (16234)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="corporate" />
              <label className="form-check-label" htmlFor="corporate">
                Corporate (5382)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="indianMNC" />
              <label className="form-check-label" htmlFor="indianMNC">
                Indian MNC (1253)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="startup" />
              <label className="form-check-label" htmlFor="startup">
                Startup (752)
              </label>
            </div>
            <a href="#" className="view-more">View More</a>
          </div>
        
                </div>
              </div>
            </div>
            <div className="col-8">
          
<div className="jobs-content-box">
  {filteredJobs &&
    filteredJobs.map((job, index) => (
      <Link
        key={index}
        to={`/jobs/${job._id}`} // Use a unique job identifier
        className="text-decoration-none text-dark"
      >
        <div className="job-box">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">{job.position}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {job.company || "Uxflow Infotech"}
              </h6>
              <div className="d-flex flex-wrap align-items-center mb-2">
                <div className="me-3 mb-2">
                  <i className="bi bi-clock me-1"></i>
                  <small>{job.experienceLevel} Years</small>
                </div>
                <div className="me-3 mb-2">
                  <i className="bi bi-currency-dollar me-1"></i>
                  <small>{job.salary || "Not disclosed"}</small>
                </div>
                <div className="mb-2">
                  <i className="bi bi-geo-alt me-1"></i>
                  <small>
                    {job.city}-{job.state}
                  </small>
                </div>
              </div>
              <p className="card-text">
                {job.description || "Job description not available"}
              </p>
              <div className="d-flex flex-wrap">
                {job.skillsRequired &&
                  job.skillsRequired.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="badge bg-secondary me-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  {formatDate(job.postedDate)}
                </small>
                <button className="btn btn-outline-primary btn-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
</div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
