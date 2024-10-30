import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/companycomponents/sidebar";
import "../../../styles/dashboard.css";
import "../../../styles/jobs.css";
import axios from "axios";
import Header from "../../../components/companycomponents/header";

const apiurl = import.meta.env.VITE_API_URL;

const Addjobs = () => {
  const [profile, setProfile] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [vacancy, setVacancy] = useState("");
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [postedDate, setPostedDate] = useState(getTodayDate());
  const [closeDate, setCloseDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Inactive");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiurl}/company/getprofile`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setProfile(response.data.companyprofile);
          setCompanyName(response.data.companyprofile.companyName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  const [skillsRequired, setSkillsRequired] = useState([""]);

  // Handle adding a new skill input field
  const addSkillField = () => {
    setSkillsRequired([...skillsRequired, ""]);
  };

  // Handle removing a skill input field
  const removeSkillField = (index) => {
    const newSkills = skillsRequired.filter((_, i) => i !== index);
    setSkillsRequired(newSkills);
  };

  // Handle updating a specific skill
  const handleSkillChange = (index, event) => {
    const newSkills = [...skillsRequired];
    newSkills[index] = event.target.value;
    setSkillsRequired(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      companyName,
      position,
      jobType,
      experience,
      lastDateToApply,
      salaryFrom,
      salaryTo,
      city,
      state,
      vacancy,
      postedDate,
      closeDate,
      description,
      status,
      skillsRequired,
    };

    try {
      const response = await axios.post(`${apiurl}/company/addjob`, jobData, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("Job added successfully:", response.data);
        navigate('/showjobs')
      } else {
        console.log("Error adding job:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar profile={profile} />
      <div className="flex-grow-1">
        <Header />
        <main className="p-4" style={{ backgroundColor: "#f5f5f5" }}>
          <h1 className="mb-4 fs-24 big-font-color ">Add Job</h1>
          <div className="add-job-post-form">
            <form onSubmit={handleSubmit}>
              <div className="form-submiteed d-flex justify-content-between">
                <div className="col-5">
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Company Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control p-2"
                      value={companyName}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Job Type<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control p-2"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option value="">Select Job Type</option>{" "}
                      {/* Default placeholder option */}
                      <option value="Full-time">Full Time</option>
                      <option value="Part-time">Part Time</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Experience<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control p-2"
                      placeholder="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Last Date To Apply<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control p-2"
                      value={lastDateToApply}
                      onChange={(e) => setLastDateToApply(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Salary From<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control p-2"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      City<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Job Position<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Job Position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      No. of Vacancies<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control p-2"
                      placeholder="No. of Vacancies"
                      value={vacancy}
                      onChange={(e) => setVacancy(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Posted Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control p-2"
                      value={postedDate}
                      onChange={(e) => setPostedDate(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Close Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control p-2"
                      value={closeDate}
                      onChange={(e) => setCloseDate(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      Salary To<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control p-2"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="form-label fs-14 big-font-color">
                      State<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Enter State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-desc">
                <div className="mt-3">
                  <label className="form-label fs-14 big-font-color">
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control p-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label className="form-label fs-14 big-font-color">
                    Skills Required<span className="text-danger">*</span>
                  </label>
                  {skillsRequired.map((skillObj, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder={`Skill ${index + 1}`}
                        value={skillObj.skill}
                        onChange={(e) => handleSkillChange(index, e)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => removeSkillField(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-success mt-2"
                    onClick={addSkillField}
                  >
                    Add Another Skill
                  </button>
                </div>
                <div className="mt-3">
                  <label className="form-label fs-14 big-font-color">
                    Status<span className="text-danger">*</span>
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="Active"
                        checked={status === "Active"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label">Active</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={status === "Inactive"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label">Inactive</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Add Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Addjobs;
