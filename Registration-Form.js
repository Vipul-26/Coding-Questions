import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname:</label>
        <input type="text" id="firstname" placeholder="Enter your first name" />
        <br />
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" placeholder="Enter your last name" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" />
        <br />
        <label htmlFor="confirmpassword">Confirm your password:</label>
        <input type="password" id="confirmpassword" placeholder="Confirm your password" />
        <br />
        <label htmlFor="gender">Gender:</label>
        <input type="radio" name="gender" value="male" />Male
        <input type="radio" name="gender" value="female" />Female
        <br />
        <label htmlFor="country">Country:</label>
        <select id="country">
          <option>India</option>
          <option>America</option>
          <option>Japan</option>
          <option>UK</option>
        </select>
        <br />
        <label htmlFor="dateofbirth">Date of birth:</label>
        <input type="date" id="dateofbirth" />
        <br />
        <label htmlFor="tnc">Terms & Conditions:</label>
        <input type="checkbox" id="tnc" />
        <br />
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
}

export default App;

