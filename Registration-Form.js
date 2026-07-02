import React, { useState, useEffect, useMemo } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    dateOfBirth: "",
    tnc: false,
  });

  const [fieldsError, setFieldsError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    genderError: "",
    countryError: "",
    dateOfBirthError: "",
    tncError: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname: </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                firstName: e.target.value,
              };
            })
          }
          id="firstname"
          placeholder="Enter your first name"
        />
        <br />
        {fieldsError.firstNameError && (<span>{fieldsError.firstNameError}</span>)}
        <br />
        <label htmlFor="lastname">Lastname: </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                lastName: e.target.value,
              };
            })
          }
          id="lastname"
          placeholder="Enter your last name"
        />
        <br />
        {fieldsError.lastNameError && (<span>{fieldsError.lastNameError}</span>)}
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                email: e.target.value,
              };
            })
          }
          id="email"
          placeholder="Enter your email"
        />
        <br />
        {fieldsError.passwordError && (<span>{fieldsError.passwordError}</span>)}
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                password: e.target.value,
              };
            })
          }
          id="password"
          placeholder="Enter your password"
        />
        <br />
        {fieldsError.confirmPasswordError && (<span>{fieldsError.confirmPasswordError}</span>)}
        <br />
        <label htmlFor="confirmpassword">Confirm your password: </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                confirmPassword: e.target.value,
              };
            })
          }
          id="confirmpassword"
          placeholder="Confirm your password"
        />
        <br />
        {fieldsError.genderError && (<span>{fieldsError.genderError}</span>)}
        <br />
        <label htmlFor="gender">Gender: </label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                gender: e.target.value,
              };
            })
          }
          checked={formData.gender === "male"}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                gender: e.target.value,
              };
            })
          }
          checked={formData.gender === "female"}
        />
        Female
        <br />
        {fieldsError.countryError && (<span>{fieldsError.countryError}</span>)}
        <br />
        <label htmlFor="country">Country: </label>
        <select 
          id="country" 
          value={formData.country}
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                country: e.target.value,
              };
            })
          }
        >
          <option>India</option>
          <option>America</option>
          <option>Japan</option>
          <option>UK</option>
        </select>
        <br />
        {fieldsError.dateOfBirthError && (<span>{fieldsError.dateOfBirthError}</span>)}
        <br />
        <label htmlFor="dateofbirth">Date of birth: </label>
        <input 
          type="date" 
          id="dateofbirth" 
          value={formData.date} 
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                dateOfBirth: e.target.value,
              };
            })
          }
        />
        <br />
        {fieldsError.tncError && (<span>{fieldsError.tncError}</span>)}
        <br />
        <label htmlFor="tnc">Terms & Conditions: </label>
        <input 
          type="checkbox" 
          id="tnc" 
          checked={formData.tnc} 
          onChange={(e) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                tnc: e.target.checked,
              };
            })
          }
        />
        <br />
        <br />
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
}

export default App;
