import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/companycomponents/sidebar";
import "../../../styles/dashboard.css";
import axios from "axios";
import Header from "../../../components/companycomponents/header";

const apiurl = import.meta.env.VITE_API_URL;

const Showjobs = () => {
  const [profile, setprofile] = useState([]);
  const [companyname, setcompanyname] = useState("");
  const [job, setjob] = useState([]); // Initialize job state as an array

  // Fetch company profile
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`${apiurl}/company/getprofile`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          setprofile(response.data.companyprofile);
          setcompanyname(response.data.companyprofile.companyName); // Access directly from response
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofile();
  }, []); // Empty dependency array to run only once

  // Fetch jobs
  useEffect(() => {
    const fetchjobs = async () => {
      try {
        const response = await axios.get(`${apiurl}/company/getcompanyjob`, {
          withCredentials: true,
        });
        
        if (response.data.success) {
          console.log("Full Response: ", response.data);
          const jobsData = response.data.job;

          // Handle if the response is a single job object or an array
          if (Array.isArray(jobsData)) {
            setjob(jobsData); // Set the job state if it's an array
          } else {
            setjob([jobsData]); // Wrap single object in an array
          }

          console.log("Jobs Data: ", jobsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchjobs();
  }, []); // Run only once

  // Log jobs when the state updates
  useEffect(() => {
    console.log("Updated jobs state: ", job);
  }, [job]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract the date part before 'T'
  };
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
                  <th scope="col">Type</th>
                  <th scope="col">Posted Date</th>
                  <th scope="col">Last date to apply</th>
                  <th scope="col">Close Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {job.length > 0 ? (
                  job.map((val, i) => (
                    <tr key={val._id}> {/* Ensure each row has a unique key */}
                      <th scope="row">{i + 1}</th>
                      <td>{val.position}</td>
                      <td>{val.employmentType}</td>
                      <td>{formatDate(val.postedDate)}</td>
                      <td>{formatDate(val.lastDate)}</td>
                      <td>{formatDate(val.closedDate)}</td>
                      <td>{val.status}</td>
                      <td>
                        <Link to={`/editjobs/${val._id}`} state={{val}}>Edit</Link> {/* Example action */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No jobs found</td>
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

export default Showjobs;
