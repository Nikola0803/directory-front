import React, { useState } from "react";
import "./SelectUser.scss";
function SelectUser({ selectUser, setSelectUser }) {
  return (
    <div className="select-user">
      <h3>Get Started</h3>
      <p>Please select first:</p>
      {/* <label htmlFor="selectuser">I am a</label> */}
      <select
        id="selectuser"
        value={selectUser}
        onChange={(e) => setSelectUser(e.target.value)}
        defaultValue={0}
      >
        <option value="0" key={0}>
          I am a
        </option>
        <option key={1} value={"Care Provider"}>
          Care Provider
        </option>
        <option key={2} value={"Estate Agent / Landlord"}>
          Estate Agent / Landlord
        </option>
      </select>
    </div>
  );
}

export default SelectUser;
