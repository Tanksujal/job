import React, { useEffect, useState } from 'react';

const BasicDetailsForm = ({ user,onSubmit }) => {
  // Individual states for each field
  const [fullName, setFullName] = useState(user.fullName || '');
  const [workStatus, setWorkStatus] = useState(user.status || 'fresher');
  const [currentLocation, setCurrentLocation] = useState('');
  const [city, setCity] = useState('');
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '');
  const [email, setEmail] = useState(user.email || '');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setFullName(user.fullName || '');
    setWorkStatus(user.status || 'fresher');
    setCurrentLocation(user.currentLocation || 'india');
    setCity(user.city || '');
    setMobileNumber(user.mobileNumber || '');
    setEmail(user.email || '');
  }, [user]);
  const handlesubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true);
    const UpdateUser = {
        fullName: fullName,
        status: workStatus,
        currentLocation: currentLocation,
        city: city,
        mobileNumber:mobileNumber,
        email: email
    }
    await onSubmit(UpdateUser)
    setIsLoading(false);
    
  }
  return (
    <div className="container mt-2">
      <form onSubmit={handlesubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label big-font-color fs-14">
            Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label big-font-color fs-14">Work status</label>
          <p className="text-muted fs-14 small-light-color">
            We will personalise your Naukri experience based on this
          </p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="workStatus"
              id="fresher"
              value="fresher"
              checked={workStatus === 'fresher'}
              onChange={() => setWorkStatus('fresher')}
            />
            <label className="form-check-label fs-14 big-font-color" htmlFor="fresher">
              Fresher
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="workStatus"
              id="experienced"
              value="experienced"
              checked={workStatus === 'experienced'}
              onChange={() => setWorkStatus('experienced')}
            />
            <label className="form-check-label fs-14 big-font-color" htmlFor="experienced">
              Experienced
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label big-font-color fs-14">
            Current location<span className="text-danger">*</span>
          </label>
          <p className="text-muted fs-14 small-light-color">
            This helps us match you to relevant jobs
          </p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="currentLocation"
              id="india"
              value="india"
              checked={currentLocation === 'india'}
              onChange={() => setCurrentLocation('india')}
            />
            <label className="form-check-label fs-14 big-font-color" htmlFor="india">
              India
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="currentLocation"
              id="outsideIndia"
              value="outsideIndia"
              checked={currentLocation === 'outsideIndia'}
              onChange={() => setCurrentLocation('outsideIndia')}
            />
            <label className="form-check-label fs-14 big-font-color" htmlFor="outsideIndia">
              Outside India
            </label>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label big-font-color fs-14">
            Mobile number<span className="text-danger">*</span>
          </label>
          <p className="text-muted fs-14 small-light-color">
            Recruiters will contact you on this number
          </p>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <a href="#" className="text-primary fs-14">
            Change Mobile Number
          </a>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label big-font-color fs-14">
            Email address<span className="text-danger">*</span>
          </label>
          <p className="text-muted fs-14 big-font-color">
            We will send relevant jobs and updates to this email
          </p>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <a href="#" className="text-primary fs-14">
            Change Email Address
          </a>
        </div>
        <button type="submit" className="btn btn-primary">
        {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
