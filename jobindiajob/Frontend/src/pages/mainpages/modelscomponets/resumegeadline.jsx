import React, { useEffect, useState } from 'react';

const ResumeHeadline = ({ profile, onSubmit }) => {
  // Individual states for each field
  const [resumeheadline, setResumeHeadline] = useState(profile.resumeHeadline);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile.resumeHeadline !== undefined && profile.resumeHeadline !== resumeheadline) {
      setResumeHeadline(profile.resumeHeadline);
    }
  }, [profile.resumeHeadline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(resumeheadline);
    setIsLoading(false);
  };

  return (
    <div className="container mt-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <p className='fs-16 small-light-color'>
            It is the first thing recruiters notice in your profile. Write a concise headline introducing yourself to employers. (Minimum 5 words)
          </p>
          <label htmlFor="resumeHeadline" className="form-label big-font-color fs-14">
            Resume headline<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control fs-14 small-font-color"
            id="resumeHeadline"
            value={resumeheadline}
           onChange={(e) => setResumeHeadline(e.target.value)} // Correct setter function
            name="resumeHeadline"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ResumeHeadline;
