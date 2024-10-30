import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/maincomponents/navbar";
import "../../styles/profile.css";
import { MdEdit } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoBagHandle } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import BasicDetailsForm from "./modelscomponets/basicdetais";
import { MdDelete } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md"; 
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import Resumeheadline from "./modelscomponets/resumegeadline";
import Keyskillsdetails from "./modelscomponets/keyskillsdetails";
const Profileuser = ({ user, isloggedin }) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [workStatus, setWorkStatus] = useState(user.status || "fresher");
  const [currentLocation, setCurrentLocation] = useState("india"); // Default to 'india' or based on user data
  const [city, setCity] = useState(""); // If city is part of user data, initialize here
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [prolastupdate, setprolastupdate] = useState(user.updatedAt || "");
  const [userId,setuserId] = useState(user._id||'')
  const [profile,setprofile] = useState([])
  const [resume,setresume] = useState("")
  const [keyskills,setkeyskills] = useState([])
  const [resumeheadline,setresumeheadline] = useState("")
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  useEffect(() => {
    setFullName(user.fullName || "");
    setuserId(user._id||'')
    setWorkStatus(user.status || "fresher");
    setCurrentLocation(user.currentLocation || "india");
    setCity(user.city || "");
    setMobileNumber(user.mobileNumber || "");
    setEmail(user.email || "");
    setprolastupdate(formatDate(user.updatedAt || ""));
    console.log(prolastupdate);
    
  }, [user]);
  useEffect(()=>{
    const fetschuserprofile = async() => {
      try {
        const Response = await axios.get(`${apiurl}/getuserprofile?id=${userId}`,{withCredentials:true})
        if(Response.data.success){
          setprofile(Response.data.profile)
          setresume(profile.resume)
          setresumeheadline(profile.resumeHeadline)
          setkeyskills(profile.skills)
        }
      } catch (error) {
        console.log(error);
        return false
      }
    }
    fetschuserprofile()
  })
  const handleUpdate = async (updateuser) => {
    try {
      let Response = await axios.post(
        `${apiurl}/updateprofile`,
        { updateuser },
        { withCredentials: true }
      );
      if (Response.data.success) {
        if (modalRef.current) {
          const modal = Modal.getInstance(modalRef.current); // Get the instance of the modal
          modal.hide(); // Hide the modal
        }
        const backdrop = document.querySelector(".modal-backdrop");
        console.log(backdrop);

        if (backdrop) {
          backdrop.remove(); // Remove the backdrop element
        }
        console.log(backdrop);
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
     try {
      let Response = await axios.post(`${apiurl}/userreumeupdate`,{file},{withCredentials:true,headers: {
        'Content-Type': 'multipart/form-data', 
      },})
      if(Response.data.success){
        alert("Resume uploaded successfully");
      }
     } catch (error) {
      console.log(error);
      return false
     }
    }
  };
  const handledeleteresume = async() => {
    try {
      let Response = await axios.get(`${apiurl}/deleteresume`,{withCredentials:true})
      if(Response.data.success){
        alert("Resume deleted successfully");
      }
    } catch (error) {
      console.log(error);
      return false
    }
  }
  const handleUpdateresumeheadline = async(Updateresumeheadline) => {
    try {
      let Response = await axios.post(`${apiurl}/updateresumeheadline`,{Updateresumeheadline},{withCredentials:true})
      if(Response.data.success){
        alert("Resume headline updated successfully");
      }
    } catch (error) {
      console.log(error);
      return false
    }
  }
  return (
    <div>
      <Navbar user={user} isloggedin={isloggedin} />
      <div className="container">
        <div className="row">
          <div className="profile-name-box d-flex mt-5 align-items-center">
            <div className="col-2">
              <div className="profile-name-img d-flex justify-content-center">
                <img src="../../../public/user.png" className="w-50" alt="" />
              </div>
            </div>
            <div className="col-6">
              <div className="profile-name d-flex align-items-center">
                <h2 className="pe-3 fs-24 big-font-color fw-600">{fullName}</h2>
                <Link data-bs-toggle="modal" data-bs-target="#profile-headline">
                  <MdEdit className="small-light-color" />
                </Link>
              </div>
              <div className="profile-last-time">
                <p className="small-light-color fs-14">
                  Profile last updated -{" "}
                  <span className="small-font-color">{prolastupdate}</span>{" "}
                </p>
              </div>
              <div className="profile-info-top d-flex">
                <div
                  className="col-6 mt-2"
                  style={{ borderRight: "1px solid #e7e7f1" }}
                >
                  <div className="profilr-info-top-content-part d-flex align-items-center mt-3">
                    <IoLocationSharp className="fs-14 small-light-color me-2" />
                    <p className="fs-14 small-font-color m-0">Surat,INDIA</p>
                  </div>
                  <div className="profilr-info-top-content-part d-flex align-items-center mt-3">
                    <IoBagHandle className="fs-14 small-light-color me-2" />
                    <p className="fs-14 small-font-color m-0">{workStatus}</p>
                  </div>
                  <div className="profilr-info-top-content-part d-flex align-items-center mt-3">
                    <FaCalendar className="fs-14 small-light-color me-2" />
                    <p className="fs-14 small-font-color m-0">
                      Add availability to join
                    </p>
                  </div>
                </div>
                <div className="col-6 ps-4">
                  <div className="profilr-info-top-content-part d-flex align-items-center mt-3">
                    <MdLocalPhone className="fs-14 small-light-color me-2" />
                    {mobileNumber ? (
                      <p className="fs-14 small-font-color m-0">
                        {mobileNumber}
                      </p>
                    ) : (
                      <p
                        className="fs-14 blue-color m-0 "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ cursor: "pointer" }}
                      >
                        Add Mobile number
                      </p>
                    )}
                  </div>
                  <div className="profilr-info-top-content-part d-flex align-items-center mt-3">
                    <MdOutlineMail className="fs-14 small-light-color me-2" />
                    {email ? (
                      <p className="fs-14 small-font-color m-0">{email}</p>
                    ) : (
                      <p
                        className="fs-14 blue-color m-0 "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ cursor: "pointer" }}
                      >
                        Add Email Address
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-info-box d-flex  p-0 mt-3">
            <div className="col-3 me-3">
              <div className="profile-left-content">
                <div className="profile-left-header">
                  <span className="fs-18 big-font-color fw-600">
                    Quick links
                  </span>
                </div>
                <div className="profile-left-li">
                  <ul className="p-0 mt-3">
                    <li
                      className="d-flex justify-content-between align-items-center p-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">Resume</span>
                      <div>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />

                        {/* Upload link */}
                        <Link className="fs-14" onClick={handleUploadClick}>
                          Upload
                        </Link>
                      </div>
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">
                        Resume headline
                      </span>
                     {
                      resumeheadline ? (
                        ""
                      ):( <Link className="fs-14" data-bs-toggle="modal" data-bs-target="#resume-headline">Add</Link>)
                     }
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">Key Skills</span>
                      {
                        keyskills ? ("") : (
                          <Link className="fs-14"data-bs-toggle="modal" data-bs-target="#key-skills-headline">Add</Link>
                        )
                      }
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">Education</span>
                      <Link className="fs-14">Add</Link>
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">Experience</span>
                      <Link className="fs-14">Add</Link>
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">Projects</span>
                      <Link className="fs-14">Add</Link>
                    </li>
                    <li
                      className="d-flex justify-content-between align-items-center p-2 mt-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fs-14 big-font-color">
                        Profile Summary
                      </span>
                      <Link className="fs-14">Add</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="profile-right-content">
                {
                  resume ? 
                  (
                    <div className="profile-resume-box">
                  <div className="profile-resume-header">
                    <span className="big-font-color fs-16 fw-600">Resume</span>
                  </div>
                  <div className="profile-resume-content mt-3 d-flex justify-content-between">
                  <div className="profile-resume-content-1 d-flex flex-column">
                    <span className="big-font-color fs-14 fw-400">{resume}</span>
                    <span className="small-light-color fs-14 fw-400 mt-1">Uploaded on <span>Oct 03,2024</span></span>
                  </div>
                  <div className="profile-resume-content-2 d-flex">
                      <a href={`${apiurl}/resume/${resume}`} download="" target="_blank" className="profile-resume-download-btn">
                            <MdOutlineFileDownload />
                      </a>
                      <a className="profile-resume-download-btn" onClick={handledeleteresume}>
                          <MdDelete />
                      </a>
                  </div>                 
                  </div>
                </div>
                  ) : ("")
                }
                <div className="profile-resume-headline-box mt-3">
                  <div className="profile-resume-headline-header d-flex align-items-center">
                    <span className="fs-16 big-font-color fw-600 me-3">Resume headline</span>
                    <Link data-bs-toggle="modal" data-bs-target="#resume-headline"><MdEdit className="small-light-color" /></Link>
                  </div>
                  <div className="profile-resume-headline-content mt-2">
                    <span className="fs-14 small-font-color">{resumeheadline}</span>
                  </div>
                </div>
                <div className="profile-key-skills-box mt-3">
                    <div className="profile-key-skills-header d-flex justify-content-between">
                      <span className="fs-16 big-font-color fw-600 me-3">Key Skills</span>
                      <span className="fs-16 blue-font-color fw-600 me-3"style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#key-skills-headline">Add key skills</span>
                    </div>
                    <div className="profile-key-skills-header-content">
                      <p className="fs-14 small-font-color m-0 mt-2">Recruiters look for candidates with specific key skills</p>
                    </div>
                    <div className="profile-skills-show d-flex mt-3">
                      {
                        keyskills && keyskills.map((val)=>{
                          return(
                            <div className="skills d-flex me-2">{val}</div>
                          )
                        })
                      }
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="profile-headline"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "770px", margin: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Basic Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <BasicDetailsForm user={user} onSubmit={handleUpdate} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="resume-headline"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "770px", margin: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Resume Headline
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <Resumeheadline profile={profile} onSubmit={handleUpdateresumeheadline} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="key-skills-headline"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "770px", margin: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Resume Headline
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <Keyskillsdetails profile={profile} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profileuser;
