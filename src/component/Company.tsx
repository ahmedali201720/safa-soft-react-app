import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  mailValidator,
  numericValidator,
  requiredValidator,
} from "../helper/validator";

function Company(props: any) {
  const [formValue, setFormValue] = useState({
    companyName: props.data.companyName ? props.data.companyName : "",
    lang: props.data.lang ? props.data.lang : "en",
    address: props.data.address ? props.data.address : "",
    businessEmail: props.data.businessEmail ? props.data.businessEmail : "",
    country: props.data.country ? props.data.country : "Egypt",
    city: props.data.city ? props.data.city : "",
    dialCode: props.data.dialCode ? props.data.dialCode : "20",
    phone: props.data.phone ? props.data.phone : "",
  });
  const [formState, setFormState] = useState({
    companyName: {
      valid: true,
      touched: false,
    },
    lang: {
      valid: true,
      touched: false,
    },
    address: {
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
    city: {
      valid: true,
      touched: false,
    },
    dialCode: {
      valid: true,
      touched: false,
    },
    phone: {
      valid: true,
      touched: false,
    },
  });
  const [cities, setCities] = useState([]);

  const handleCountryChange = async (e?: any) => {
    if (e)
      await setFormValue({
        ...formValue,
        country: e.target.value,
        city: "",
      });
  };

  const handleCityChange = (e: any) => {
    setFormValue((v) => ({
      ...formValue,
      city: e.target.value,
    }));
  };

  useEffect(() => {
    const filteredCity = props?.cities?.filter(
      (city: any) => city.country === formValue.country
    );
    if (filteredCity?.length) {
      setCities(filteredCity[0].cities);
    } else setCities([]);
    const code = props?.codes?.filter(
      (code: any) => code.country === formValue.country
    );
    if (code?.length)
      setFormValue((fv) => ({
        ...fv,
        dialCode: code[0].calling_code,
      }));
  }, [formValue.country, props.cities, props.codes]);

  const handleSubmit = () => {
    // Mark All As Touched
    if (
      !formState.companyName.valid ||
      !formState.businessEmail.valid ||
      !formState.address.valid ||
      !formState.phone.valid ||
      !formState.country.valid ||
      !formState.city.valid
    ) {
      setFormState({
        companyName: {
          valid: formState.companyName.valid,
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
        city: {
          valid: formState.city.valid,
          touched: true,
        },
        address: {
          valid: formState.address.valid,
          touched: true,
        },
        dialCode: {
          valid: formState.dialCode.valid,
          touched: true,
        },
        lang: {
          valid: formState.lang.valid,
          touched: true,
        },
      });
      return;
    }
    props.submit({ ...formValue });
    props.next(3);
  };

  useEffect(() => {
    // company name
    if (!requiredValidator(formValue.companyName))
      setFormState((s) => ({
        ...s,
        companyName: { valid: false, touched: s.companyName.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        companyName: { valid: true, touched: s.companyName.touched },
      }));
    // Address
    if (!requiredValidator(formValue.address))
      setFormState((s) => ({
        ...s,
        address: { valid: false, touched: s.address.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        address: { valid: true, touched: s.address.touched },
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
    // City Validator
    if (!requiredValidator(formValue.city))
      setFormState((s) => ({
        ...s,
        city: { valid: false, touched: s.city.touched },
      }));
    else
      setFormState((s) => ({
        ...s,
        city: { valid: true, touched: s.city.touched },
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
  }, [formValue]);

  return (
    <Fragment>
      <h4 className="title">Verify Your Company</h4>
      <form className="theme_step_form">
        <p className="subtitle">
          Entering this information correctly will facilitate the company
          verification process
        </p>
        <div className="form-group-wrapper">
          <div
            className={`form-group input-group ${
              !formState.companyName.valid &&
              formState.companyName.touched &&
              "invalid"
            }`}
          >
            <div className="wrapper">
              <label className="form-label" htmlFor="company_name">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company_name"
                placeholder="Enter your company name"
                autoComplete="off_phone"
                value={formValue.companyName}
                onChange={(e) =>
                  setFormValue({ ...formValue, companyName: e.target.value })
                }
                onBlur={() => {
                  setFormState({
                    ...formState,
                    companyName: {
                      valid: formState.companyName.valid,
                      touched: true,
                    },
                  });
                }}
              />
            </div>
            <div className="append">
              <select
                name="language"
                id="language"
                value={formValue.lang}
                onChange={(e) =>
                  setFormValue({ ...formValue, lang: e.target.value })
                }
                onBlur={() => {
                  setFormState({
                    ...formState,
                    lang: {
                      valid: formState.lang.valid,
                      touched: true,
                    },
                  });
                }}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
          {!formState.companyName.valid && formState.companyName.touched && (
            <span className="error">Company name is required.</span>
          )}
        </div>
        <div className="form-group-wrapper">
          <div
            className={`form-group ${
              !formState.address.valid && formState.address.touched && "invalid"
            }`}
          >
            <label className="form-label" htmlFor="company_address">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="company_address"
              placeholder="Enter your comapny address"
              autoComplete="off_address"
              value={formValue.address}
              onChange={(e) =>
                setFormValue({ ...formValue, address: e.target.value })
              }
              onBlur={() => {
                setFormState({
                  ...formState,
                  address: {
                    valid: formState.address.valid,
                    touched: true,
                  },
                });
              }}
            />
          </div>
          {!formState.address.valid && formState.address.touched && (
            <span className="error">Company address is required.</span>
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
            <label className="form-label" htmlFor="company_email">
              Business Email
            </label>
            <input
              type="text"
              className="form-control"
              id="company_email"
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
              <span className="error">Enter valid company email address.</span>
            )}
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group-wrapper">
              <div
                className={`form-group ${
                  !formState.country.valid &&
                  formState.country.touched &&
                  "invalid"
                }`}
              >
                <label className="form-label" htmlFor="company_country">
                  Country
                </label>
                <select
                  className={`form-control ${
                    formValue.country ? "selected" : ""
                  }`}
                  id="company_country"
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
                <span className="error">Country is required.</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group-wrapper">
              <div
                className={`form-group ${
                  !formState.city.valid && formState.city.touched && "invalid"
                }`}
              >
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <select
                  className={`form-control ${formValue.city ? "selected" : ""}`}
                  id="city"
                  value={formValue.city}
                  onChange={handleCityChange}
                  onBlur={() => {
                    setFormState({
                      ...formState,
                      city: {
                        valid: formState.city.valid,
                        touched: true,
                      },
                    });
                  }}
                >
                  <option value="">Choose your city</option>
                  {cities?.map((city: any, index: number) => {
                    return (
                      <option value={city} key={city + index}>
                        {city}
                      </option>
                    );
                  })}
                </select>
              </div>
              {!formState.city.valid && formState.city.touched && (
                <span className="error">City is required.</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
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
                  <label className="form-label" htmlFor="company_phone_number">
                    Company Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company_phone_number"
                    placeholder="Enter your phone number"
                    autoComplete="off_phone_number"
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
                <span className="error">Company name is required.</span>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="call_to_action justify-end mt-20">
        <button
          className="btn btn-muted md"
          onClick={() => {
            props.next(1);
          }}
        >
          Back
        </button>
        <button className="btn btn-primary xl" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </Fragment>
  );
}

export default Company;
