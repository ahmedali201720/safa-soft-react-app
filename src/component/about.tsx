import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  mailValidator,
  numericValidator,
  passwordEqual,
  passwordValidator,
  requiredValidator,
} from "../helper/validator";

function About(props: any) {
  const [passwordVisible, setPassowrdVisible] = useState(false);
  const [formValue, setFormValue] = useState({
    fullName: props.data.fullName,
    password: props.data.password,
    businessEmail: props.data.businessEmail,
    country: props.data.country ? props.data.country : "Egypt",
    repeatPassword: props.data.repeatPassword,
    dialCode: props.data.dialCode ? props.data.dialCode : "20",
    phone: props.data.phone,
  });
  const [formState, setFormState] = useState({
    fullName: {
      valid: true,
      touched: false,
    },
    businessEmail: {
      valid: true,
      touched: false,
    },
    country: {
      valid: true,
      touched: false,
    },
    phone: {
      valid: true,
      touched: false,
    },
    password: {
      valid: true,
      touched: false,
    },
    repeatPassword: {
      valid: true,
      touched: false,
    },
  });

  const handleCountryChange = (e?: any) => {
    if (e)
      setFormValue({
        ...formValue,
        country: e?.target?.value,
      });
  };

  useEffect(() => {
    const code = props?.codes?.filter(
      (code: any) => code.country === formValue.country
    );
    if (code?.length)
      setFormValue((fv) => ({
        ...fv,
        dialCode: code[0].calling_code,
      }));
  }, [formValue.country, props.codes]);

  const handleSubmit = () => {
    // Mark All As Touched
    if (
      !formState.fullName.valid ||
      !formState.businessEmail.valid ||
      !formState.country.valid ||
      !formState.phone.valid ||
      !formState.password.valid ||
      !formState.repeatPassword.valid
    ) {
      setFormState({
        fullName: {
          valid: formState.fullName.valid,
          touched: true,
        },
        businessEmail: {
          valid: formState.businessEmail.valid,
          touched: true,
        },
        country: {
          valid: formState.country.valid,
          touched: true,
        },
        phone: {
          valid: formState.phone.valid,
          touched: true,
        },
        password: {
          valid: formState.password.valid,
          touched: true,
        },
        repeatPassword: {
          valid: formState.repeatPassword.valid,
          touched: true,
        },
      });
      return;
    }
    props.submit({ ...formValue });
    props.next(2);
  };

  useEffect(() => {
    // full name
    if (!requiredValidator(formValue.fullName))
      setFormState((s) => ({
        ...s,
        fullName: { valid: false, touched: s.fullName.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        fullName: { valid: true, touched: s.fullName.touched },
      }));
    // Email Address Validator
    if (
      !requiredValidator(formValue.businessEmail) ||
      !mailValidator(formValue.businessEmail)
    )
      setFormState((s) => ({
        ...s,
        businessEmail: { valid: false, touched: s.businessEmail.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        businessEmail: { valid: true, touched: s.businessEmail.touched },
      }));
    // Country Validator
    if (!requiredValidator(formValue.country))
      setFormState((s) => ({
        ...s,
        country: { valid: false, touched: s.country.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        country: { valid: true, touched: s.country.touched },
      }));
    // Phone Validator
    if (
      !requiredValidator(formValue.phone) ||
      !numericValidator(formValue.phone)
    )
      setFormState((s) => ({
        ...s,
        phone: { valid: false, touched: s.phone.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        phone: { valid: true, touched: s.phone.touched },
      }));
    // Password Validator
    if (!passwordValidator(formValue.password))
      setFormState((s) => ({
        ...s,
        password: { valid: false, touched: s.password.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        password: { valid: true, touched: s.password.touched },
      }));
    // Repeat Password Validator
    if (!passwordEqual(formValue.password, formValue.repeatPassword))
      setFormState((s) => ({
        ...s,
        repeatPassword: { valid: false, touched: s.repeatPassword.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        repeatPassword: { valid: true, touched: s.repeatPassword.touched },
      }));
  }, [formValue]);

  return (
    <Fragment>
      <h4 className="title">Tell us more about you</h4>
      <form className="theme_step_form">
        <div className="form-group-wrapper">
          <div
            className={`form-group ${
              !formState.fullName.valid &&
              formState.fullName.touched &&
              "invalid"
            }`}
          >
            <label className="form-label" htmlFor="full_name">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              placeholder="Enter your full name"
              autoComplete="off_name"
              value={formValue.fullName}
              onChange={(e) =>
                setFormValue({ ...formValue, fullName: e.target.value })
              }
              onBlur={() => {
                setFormState({
                  ...formState,
                  fullName: { valid: formState.fullName.valid, touched: true },
                });
              }}
            />
          </div>
          {!formState.fullName.valid && formState.fullName.touched && (
            <span className="error">Please Enter your full name.</span>
          )}
        </div>
        <div className="form-group-wrapper">
          <div
            className={`form-group ${
              !formState.businessEmail.valid &&
              formState.businessEmail.touched &&
              "invalid"
            }`}
          >
            <label className="form-label" htmlFor="business_email">
              Business Email
            </label>
            <input
              type="text"
              className="form-control"
              id="business_email"
              placeholder="Enter your business email"
              autoComplete="off_email"
              value={formValue.businessEmail}
              onChange={(e) =>
                setFormValue({ ...formValue, businessEmail: e.target.value })
              }
              onBlur={() => {
                setFormState({
                  ...formState,
                  businessEmail: {
                    valid: formState.businessEmail.valid,
                    touched: true,
                  },
                });
              }}
            />
          </div>
          {!formState.businessEmail.valid &&
            formState.businessEmail.touched && (
              <span className="error">Please a valid email address.</span>
            )}
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group-wrapper">
              <div
                className={`form-group ${
                  !formState.country.valid && "invalid"
                }`}
              >
                <label className="form-label" htmlFor="country">
                  Country
                </label>
                <select
                  className={`form-control ${
                    formValue.country ? "selected" : ""
                  }`}
                  id="country"
                  value={formValue.country}
                  onChange={handleCountryChange}
                >
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
              {!formState.country.valid && (
                <span className="error">You must select the country</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group-wrapper">
              <div
                className={`form-group input-group ${
                  !formState.phone.valid && formState.phone.touched && "invalid"
                }`}
              >
                <div className="prepend">
                  <span>+{formValue.dialCode}</span>
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
                    value={formValue.phone}
                    onChange={(e) =>
                      setFormValue({ ...formValue, phone: e.target.value })
                    }
                    onBlur={() => {
                      setFormState({
                        ...formState,
                        phone: {
                          valid: formState.phone.valid,
                          touched: true,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              {!formState.phone.valid && formState.phone.touched && (
                <span className="error">Enter a valid phone number</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group-wrapper">
          <div
            className={`form-group password ${
              !formState.password.valid &&
              formState.password.touched &&
              "invalid"
            }`}
          >
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Choose a password"
              autoComplete="off"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
              onBlur={() => {
                setFormState({
                  ...formState,
                  password: {
                    valid: formState.password.valid,
                    touched: true,
                  },
                });
              }}
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
          {!formState.password.valid && formState.password.touched && (
            <span className="error">
              Please Enter your password (4 chars minimum).
            </span>
          )}
        </div>
        <div className="form-group-wrapper">
          <div
            className={`form-group password ${
              !formState.repeatPassword.valid && "invalid"
            }`}
          >
            <label className="form-label" htmlFor="confirm_password">
              Repeat Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="confirm_password"
              placeholder="Repeat your password"
              autoComplete="off"
              value={formValue.repeatPassword}
              onChange={(e) =>
                setFormValue({ ...formValue, repeatPassword: e.target.value })
              }
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
          {!formState.repeatPassword.valid && (
            <span className="error">Retype the same password.</span>
          )}
        </div>
      </form>
      <div className="call_to_action mt-20">
        <a className="text-dark fs-14" href="!#">
          <i className="flaticon-left-arrow icon-fix me-1"></i>
          Back to login
        </a>
        <div className="wrap">
          <button className="btn btn-primary xl" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
