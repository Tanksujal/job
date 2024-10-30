import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import  Sidebar  from "../../components/companycomponents/sidebar";
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
const apiurl = import.meta.env.VITE_API_URL




const StatCard = ({ title, value, change, color }) => (
  <div className="card">
    <div className="card-body">
      <h3 className="card-title text-muted small">{title}</h3>
      <div className="d-flex justify-content-between align-items-end">
        <span className="h3 mb-0">{value}</span>
        <span className={`small ${color}`}>{change}</span>
      </div>
      <div className="progress mt-2">
        <div
          className={`progress-bar bg-${color.split("-")[1]}`}
          style={{ width: "66%" }}
        ></div>
      </div>
    </div>
  </div>
);

const VacancyStats = () => (
  <div className="card mt-4">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="card-title">Vacancy Stats</h3>
        <div className="btn-group">
          <button className="btn btn-sm btn-outline-secondary">Daily</button>
          <button className="btn btn-sm btn-outline-secondary">Weekly</button>
          <button className="btn btn-sm btn-primary">Monthly</button>
        </div>
      </div>
      <div className="placeholder-glow">
        <div className="placeholder col-12" style={{ height: "200px" }}></div>
      </div>
    </div>
  </div>
);

const ProfileCard = () => (
  <div className="card">
    <div className="card-body">
      <div className="d-flex mb-3">
        <img
          src="/api/placeholder/64/64"
          alt="Franklin Jr"
          className="rounded-circle me-3"
          width="64"
          height="64"
        />
        <div>
          <h3 className="card-title">Franklin Jr</h3>
          <p className="text-muted mb-0">UI / UX Designer</p>
          <p className="text-muted small">Medan, Sumatera Utara - ID</p>
        </div>
      </div>
      <button className="btn btn-primary w-100">Update Profile</button>
      <h4 className="mt-4 mb-3">Skills</h4>
      {["Figma", "Adobe XD", "Photoshop"].map((skill, index) => (
        <div
          key={skill}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <span>{skill}</span>
          <span>{[90, 68, 85][index]}%</span>
        </div>
      ))}
      <div className="placeholder-glow mt-3">
        <div className="placeholder col-12" style={{ height: "120px" }}></div>
      </div>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="card mt-4">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="card-title">Recent Activity</h3>
        <select className="form-select form-select-sm w-auto">
          <option>Newest</option>
        </select>
      </div>
      {[
        {
          company: "Bubles Studios",
          message: "have 5 available positions for you",
          time: "8min ago",
        },
        {
          company: "Elextra Studios",
          message: "has invited you to interview meeting tomorrow",
          time: "8min ago",
        },
      ].map((activity, index) => (
        <div key={index} className="d-flex mb-3">
          <div
            className={`rounded-circle me-3 bg-${
              index === 0 ? "primary" : "warning"
            }`}
            style={{ width: "40px", height: "40px" }}
          ></div>
          <div>
            <p className="mb-0">
              <strong>{activity.company}</strong> {activity.message}
            </p>
            <p className="text-muted small">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
const [profile,setprofile] = useState([])
const [companyname,setcompanyname] = useState("")
    useEffect(()=>{
        const fetchprofile = async() => {
            try {
                const Response = await axios.get(`${apiurl}/company/getprofile`,{withCredentials:true})
                if(Response.data.success){
                    console.log(Response.data);
                    setprofile(Response.data.companyprofile)
                    setcompanyname(profile.companyName)
                }
            } catch (error) {
                console.log(error);
                return false
            }
        }
        fetchprofile()
    },[])
    return(
  <div className="d-flex">
    <Sidebar profile={profile}/>
    <div className="flex-grow-1">
      <Header />
      <main className="p-4">
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <StatCard
              title="Interview Schedules"
              value="342"
              change="+0.5%"
              color="text-success"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Application Sent"
              value="984"
              change="+1.2%"
              color="text-primary"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Profile Viewed"
              value="1,567k"
              change="-2.0%"
              color="text-danger"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Unread Messages"
              value="437"
              change="+1.8%"
              color="text-info"
            />
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-8">
            <VacancyStats />
          </div>
          <div className="col-lg-4">
            <ProfileCard />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  </div>
    )
}
export default Dashboard;
