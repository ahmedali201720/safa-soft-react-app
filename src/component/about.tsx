import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

function About(props: any) {
  const [passwordVisible, setPassowrdVisible] = useState(false);

  return (
    <Fragment>
      <h4 className="title">Tell us more about you</h4>
      <form className="theme_step_form">
        <div className="form-group-wrapper">
          <div className="form-group">
            <label className="form-label" htmlFor="full_name">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              placeholder="Enter your full name"
              autoComplete="off_name"
            />
          </div>
          {/* <span className="error">Please Enter your full name.</span> */}
        </div>
        <div className="form-group-wrapper">
          <div className="form-group">
            <label className="form-label" htmlFor="business_email">
              Business Email
            </label>
            <input
              type="text"
              className="form-control"
              id="business_email"
              placeholder="Enter your business email"
              autoComplete="off_email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group-wrapper">
              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country
                </label>
                <select className="form-control" id="country">
                  <option value="">Choose your country</option>
                  {props?.countries?.map((ctry: any, index: number) => {
                    return (
                      <option value={ctry.country} key={ctry.country + index}>
                        {ctry.country}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group-wrapper">
              <div className="form-group input-group">
                <div className="prepend">
                  <span>+20</span>
                </div>
                <div className="wrapper">
                  <label className="form-label" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    placeholder="Enter your phone number"
                    autoComplete="off_phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group-wrapper">
          <div className="form-group password">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Choose a password"
              autoComplete="off"
            />
            <i
              className={`icon ${
                passwordVisible ? "flaticon-hide" : "flaticon-view"
              }`}
              onClick={() => {
                setPassowrdVisible((prev) => !prev);
              }}
            ></i>
          </div>
        </div>
        <div className="form-group-wrapper">
          <div className="form-group password">
            <label className="form-label" htmlFor="confirm_password">
              Repeat Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="confirm_password"
              placeholder="Repeat your password"
              autoComplete="off"
            />
            <i
              className={`icon ${
                passwordVisible ? "flaticon-hide" : "flaticon-view"
              }`}
              onClick={() => {
                setPassowrdVisible((prev) => !prev);
              }}
            ></i>
          </div>
        </div>
      </form>
      <div className="call_to_action mt-20">
        <a className="text-dark fs-14" href="!#">
          <i className="flaticon-left-arrow icon-fix me-1"></i>
          Back to login
        </a>
        <div className="wrap">
          <button
            className="btn btn-primary xl"
            onClick={() => {
              props.next(2);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
