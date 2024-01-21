import React, { Component } from "react";
import zxcvbn from "zxcvbn";
import "./PasswordStrengthMeter.css";
class PasswordStrengthMeter extends Component {
  // Define the createPasswordLabel function as a static method or outside the class

  createPasswordLabel(result) {
    switch (result.score) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  }

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);

    return (
      <div className="password-strength-meter d-flex align-items-center">
        <progress
          className={`password-strength-meter-progress ${
            `strength-` + this.createPasswordLabel(testedResult)
          }`}
          value={testedResult.score}
          max="4"
        />
        <br />
        <label className="password-strength-meter-label mx-4">
          {" "}
          {password && (
            <>
              {this.createPasswordLabel(testedResult)}{" "}
              {/* Call the function directly */}
            </>
          )}
        </label>
      </div>
    );
  }
}

export default PasswordStrengthMeter;
