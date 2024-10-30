import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/companycomponents/sidebar";
import {
  Bell,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Plus,
  ChevronDown,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/dashboard.css";
import axios from "axios";
import Header from "../../components/companycomponents/header";
const apiurl = import.meta.env.VITE_API_URL;

const Applications = () => {
  const [profile, setProfile] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiurl}/company/getprofile`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          setProfile(response.data.companyprofile);
          setCompanyName(response.data.companyprofile.companyName); // Using data from response
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${apiurl}/company/getapplicationjobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar profile={profile} />
      <div className="flex-grow-1">
        <Header />
        <main className="p-4">
          <div className="show-job-list-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Position</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">MobileNumber</th>
                  <th scope="col">Resume</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((val, index) => (
                    <tr key={val._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{val.job.position}</td>
                      <td>{val.user.fullName}</td>
                      <td>{val.user.email}</td>
                      <td>{val.user.mobileNumber}</td>
                      <td>
                        <a  href={`${apiurl}/resume/${val.resume}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          download>Download</a>
                      </td>
                      <td>{val.status}</td>
                      <td>
                        {/* Placeholder for action buttons */}
                        <button className="btn btn-primary">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No applications found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Applications;
