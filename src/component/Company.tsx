import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

function Company(props: any) {
  const [formValue, setFormValue] = useState({
    companyName: "",
    lang: "en",
    address: "",
    businessEmail: "",
    country: "Egypt",
    city: "",
    dialCode: "20",
    phone: "",
  });
  const [cities, setCities] = useState([]);

  const handleCountryChange = async (e?: any) => {
    if (e)
      await setFormValue({
        ...formValue,
        country: e.target.value,
      });
  };

  useEffect(() => {
    const filteredCity = props?.cities?.filter(
      (city: any) => city.country === formValue.country
    );
    if (filteredCity?.length) {
      setCities(filteredCity[0].cities);
    } else setCities([]);
  }, [formValue.country, props.cities]);

  useEffect(() => {
    handleCountryChange();
  }, []);

  return (
    <Fragment>
      <h4 className="title">Verify Your Company</h4>
      <form className="theme_step_form">
        <p className="subtitle">
          Entering this information correctly will facilitate the company
          verification process
        </p>
        <div className="form-group-wrapper">
          <div className="form-group input-group">
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
              />
            </div>
            <div className="append">
              <select name="language" id="language">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group-wrapper">
          <div className="form-group">
            <label className="form-label" htmlFor="company_address">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="company_address"
              placeholder="Enter your comapny address"
              autoComplete="off_address"
            />
          </div>
          {/* <span className="error">Please Enter your full name.</span> */}
        </div>
        <div className="form-group-wrapper">
          <div className="form-group">
            <label className="form-label" htmlFor="company_email">
              Business Email
            </label>
            <input
              type="text"
              className="form-control"
              id="company_email"
              placeholder="Enter your business email"
              autoComplete="off_email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group-wrapper">
              <div className="form-group">
                <label className="form-label" htmlFor="company_country">
                  Country
                </label>
                <select
                  className="form-control"
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
            </div>
          </div>
          <div className="col">
            <div className="form-group-wrapper">
              <div className="form-group">
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <select className="form-control" id="city">
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <div className="form-group-wrapper">
              <div className="form-group input-group">
                <div className="prepend">
                  <span>+20</span>
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
                  />
                </div>
              </div>
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
        <button
          className="btn btn-primary xl"
          onClick={() => {
            props.next(3);
          }}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
}

export default Company;
