import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    dateOfBirth: '',
    tnc: false,
  });

  const [fieldsError, setFieldsError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    genderError: '',
    countryError: '',
    dateOfBirthError: '',
    tncError: '',
  });

  const resetFieldsError = () => {
    setFieldsError({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      genderError: '',
      countryError: '',
      dateOfBirthError: '',
      tncError: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // To prevent browser refresh when user clicks on submit button
    resetFieldsError();

    const errors = {
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      genderError: '',
      countryError: '',
      dateOfBirthError: '',
      tncError: '',
    };

    if (formData.firstName === '') {
      errors.firstNameError = 'First name is required';
    }
    if (formData.lastName === '') {
      errors.lastNameError = 'Last name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email === '') {
      errors.emailError = 'Please enter your email';
    } else if (!emailRegex.test(formData.email)) {
      errors.emailError = 'Please enter a valid email';
    }
    if (formData.password === '') {
      errors.passwordError = 'Please enter your password';
    } else if (formData.password.length < 8) {
      errors.passwordError = 'Password must be at least 8 characters long';
    }
    if (formData.confirmPassword === '') {
      errors.confirmPasswordError = 'Please enter your confirmed password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPasswordError = 'Passwords do not match';
    }
    if (formData.gender === '') {
      errors.genderError = 'Please select your gender';
    }
    if (formData.country === '') {
      errors.countryError = 'Please select your country';
    }
    if (formData.dateOfBirth === '') {
      errors.dateOfBirthError = 'Please select your date of birth';
    }
    if (formData.tnc === false) {
      errors.tncError = 'Please accept the terms and conditions';
    }

    const hasErrors = Object.values(errors).some(Boolean);
    setFieldsError(errors);
    if (hasErrors) {
      return;
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      dateOfBirth: '',
      tnc: false,
    });
    resetFieldsError();
  };

  const handleChange = (type, value) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [type]: value,
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname: </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          id="firstname"
          placeholder="Enter your first name"
        />
        <br />
        {fieldsError.firstNameError && (
          <span>{fieldsError.firstNameError}</span>
        )}
        <br />
        <label htmlFor="lastname">Lastname: </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          id="lastname"
          placeholder="Enter your last name"
        />
        <br />
        {fieldsError.lastNameError && <span>{fieldsError.lastNameError}</span>}
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          id="email"
          placeholder="Enter your email"
        />
        <br />
        {fieldsError.emailError && <span>{fieldsError.emailError}</span>}
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          id="password"
          placeholder="Enter your password"
        />
        <br />
        {fieldsError.passwordError && <span>{fieldsError.passwordError}</span>}
        <br />
        <label htmlFor="confirmpassword">Confirm your password: </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          id="confirmpassword"
          placeholder="Confirm your password"
        />
        <br />
        {fieldsError.confirmPasswordError && (
          <span>{fieldsError.confirmPasswordError}</span>
        )}
        <br />
        <label htmlFor="gender">Gender: </label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={(e) => handleChange('gender', e.target.value)}
          checked={formData.gender === 'male'}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={(e) => handleChange('gender', e.target.value)}
          checked={formData.gender === 'female'}
        />
        Female
        <br />
        {fieldsError.genderError && <span>{fieldsError.genderError}</span>}
        <br />
        <label htmlFor="country">Country: </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
        >
          <option value="">Select a country</option>
          <option value="India">India</option>
          <option value="America">America</option>
          <option value="Japan">Japan</option>
          <option value="UK">UK</option>
        </select>
        <br />
        {fieldsError.countryError && <span>{fieldsError.countryError}</span>}
        <br />
        <label htmlFor="dateofbirth">Date of birth: </label>
        <input
          type="date"
          id="dateofbirth"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        />
        <br />
        {fieldsError.dateOfBirthError && (
          <span>{fieldsError.dateOfBirthError}</span>
        )}
        <br />
        <label htmlFor="tnc">Terms & Conditions: </label>
        <input
          type="checkbox"
          id="tnc"
          checked={formData.tnc}
          onChange={(e) => handleChange('tnc', e.target.checked)}
        />
        <br />
        {fieldsError.tncError && <span>{fieldsError.tncError}</span>}
        <br />
        <button type="submit">Sumbit</button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
