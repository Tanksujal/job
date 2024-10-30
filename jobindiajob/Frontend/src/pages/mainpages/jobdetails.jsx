import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../components/maincomponents/navbar";
import axios from "axios";
import '../../styles/home.css';

const JobDetails = ({ user, isloggedin }) => {
  const apiurl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Get the job ID from the route parameters
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.post(`${apiurl}/getonejob`, { id }, {
          withCredentials: true,
        });
        if (response.data.success) {
          setJob(response.data.job);
          console.log(job);
        }
      } catch (error) {
        console.log("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id]);
  useEffect(() => {
    const fetchapplicationDetails = async () => {
      try {
        const response = await axios.post(`${apiurl}/hasapplicationdetails`, { id }, {
          withCredentials: true,
        });
        if (response.data.success) {
            console.log(response.data);
            
            setHasApplied(response.data.hasApplied);
        }
      } catch (error) {
        console.log("Error fetching job details:", error);
      }
    };
    fetchapplicationDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleApplyClick = async(job) => {
    if (!isloggedin) {
      navigate("/loginuser"); // Redirect to login page if user is not logged in
    } else {
        if(!user.email){
            alert('update your email in profile...')
        }else if(!user.mobileNumber){
            alert('update your Phone Number in Profile...')
        }else{
            try {
                const res = await axios.post(`${apiurl}/application/applyjob`,{job},{withCredentials:true})
                if(res.data.success){
                    alert(res.data.message)
                    setHasApplied(true);
                }
            } catch (error) {
                console.log(error);
                return false
            }
            console.log("Apply ...");
        }
    }
  };

  return (
    <div>
      <Navbar user={user} isloggedin={isloggedin} />
      <section className="mt-5">
        <div className="container">
          {job ? (
            <div className="job-details">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="job-title">{job.position}</h2>
                  <h5 className="company-name text-muted">{job.company || "Uxflow Infotech"}</h5>

                  <div className="job-meta d-flex flex-wrap align-items-center mb-3">
                    <span className="me-3">
                      <i className="bi bi-geo-alt me-1"></i>
                      {job.city}, {job.state}
                    </span>
                    <span className="me-3">
                      <i className="bi bi-clock me-1"></i>
                      {job.experienceLevel} Years Experience
                    </span>
                    <span className="me-3">
                      <i className="bi bi-currency-dollar me-1"></i>
                      {job.salary || "Not disclosed"}
                    </span>
                    <span className="me-3">
                      <i className="bi bi-calendar me-1"></i>
                      Posted on: {formatDate(job.postedDate)}
                    </span>
                  </div>

                  <h4 className="section-title">Job Description</h4>
                  <p>{job.description || "No description provided"}</p>

                  <h4 className="section-title">Skills Required</h4>
                  <div className="skills d-flex flex-wrap">
                    {job.skillsRequired?.map((skill, index) => (
                      <span key={index} className="badge bg-secondary me-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h4 className="section-title">Responsibilities</h4>
                  <p>{job.responsibilities || "Not specified"}</p>

                  <div className="actions mt-4 d-flex justify-content-between align-items-center">
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={() => handleApplyClick(job._id)} 
                      disabled={hasApplied} // Disable button if already applied
                    >
                      {hasApplied ? "Already Applied" : "Apply Now"}
                    </button>
                    <button className="btn btn-outline-secondary">Save Job</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading job details...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
