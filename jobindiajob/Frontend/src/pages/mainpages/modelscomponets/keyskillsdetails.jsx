import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { IoClose } from "react-icons/io5";
const Keyskillsdetails = ({ profile }) => {
  // Individual states for each field
  const [skills,setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL;

  const isInitialized = useRef(false);

  useEffect(()=>{
    if (!isInitialized.current && profile.skills) {
      setSkills(profile.skills); // Initialize skills from profile
      isInitialized.current = true; // Set the flag to true after initialization
    }
  },[profile])
    const handleadd = async() => {
      if (newSkill.trim() !== '') { 
        // Add the new skill to the list
        setSkills(prevSkills => [...prevSkills, newSkill.trim()]);
        console.log(skills);
        
        setNewSkill(''); // Clear input field after adding
      }
        console.log(skills);
        
    }
    const handleRemoveSkill = (index) =>(e)=> {
        e.preventDefault();
        setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index)); // Remove skill by index
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(skills);
        try {
            let Response = await axios.post(`${apiurl}/updateskills`,{skills},{withCredentials:true})
            if(Response.data.success){
                console.log("added");
            }
        } catch (error) {
            console.log(error);
            return false
        }
        
        setIsLoading(false);
      };

  return (
    <div className="container mt-2">
      <form>
        <div className="mb-2">
          <p className='fs-16 small-light-color'>
          Add skills that best define your expertise, for e.g, Direct Marketing, Oracle, Java, etc. (Minimum 1)
          </p>
          <label htmlFor="resumeHeadline" className="form-label big-font-color fs-14">
            Skills<span className="text-danger">*</span>
          </label>
          <input
            className="form-control fs-14 small-font-color"
            id="resumeHeadline"
           type='text'
           value={newSkill}
           onChange={(e) => setNewSkill(e.target.value)}
            name="resumeHeadline"
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleadd}>
          Add
        </button>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      <div className="mt-3">
        <h5>Added Skills:</h5>
        <ul className='p-0'>
          {skills && skills.map((skill, index) => (
            <li key={index} className='key-skill-div'>{skill}
               <a href="#"  onClick={handleRemoveSkill(index)}><IoClose className='big-font-color' /></a>
            </li> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Keyskillsdetails;
