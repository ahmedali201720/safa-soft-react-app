import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import About from "../component/about";
import Company from "../component/Company";
import Logo from "../component/Logo";
import Confirmation from "../component/Confirmation";
import { useNavigate } from "react-router-dom";

function Home(props: any) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [codes, setCodes] = useState([]);
  const [aboutData, setAboutData] = useState({
    fullName: "",
    password: "",
    businessEmail: "",
    country: "",
    repeatPassword: "",
    dialCode: "",
    phone: "",
  });
  const [companyData, setCompanyData] = useState({
    companyName: "",
    lang: "",
    address: "",
    businessEmail: "",
    country: "",
    city: "",
    dialCode: "",
    phone: "",
    extraPhone: "",
  });
  const [logoData, setLogoData] = useState<any>({
    file: null,
    src: "",
  });
  const [loading, setLoading] = useState(false);

  const aboutStepSubmit = (val: any) => {
    setAboutData({ ...val });
  };

  const companyStepSubmit = (val: any) => {
    setCompanyData({ ...val });
  };

  const logoStepSubmit = (val: any) => {
    setLogoData({ ...val });
  };

  const getCountries = () => {
    fetch("/api/country-by-name.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCountries(data);
      });
  };

  const getDialCodes = () => {
    fetch("/api/country-by-calling-code.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCodes(data);
      });
  };

  const getCites = () => {
    fetch("/api/country-by-cities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCities(data);
      });
  };

  const changeStep = (step: number) => {
    setStep(step);
  };

  const register = () => {
    const data = new FormData();
    // Set About Step Data
    data.append("user_full_name", aboutData.fullName);
    data.append("user_email", aboutData.businessEmail);
    data.append("user_nationality", aboutData.country);
    data.append("user_phone", aboutData.dialCode + aboutData.phone);
    data.append("user_password", aboutData.password);
    data.append("user_password_confirmation", aboutData.repeatPassword);
    // Step Company Data
    data.append("company_name", companyData.companyName);
    data.append("lang", companyData.lang);
    data.append("company_address", companyData.address);
    data.append("company_business_email", companyData.businessEmail);
    data.append("company_country_id", companyData.country);
    data.append("company_city_id", companyData.city);
    data.append("company_phone", companyData.dialCode + companyData.phone);
    data.append(
      "company_extra_data[phone]",
      companyData.dialCode + companyData.extraPhone
    );
    // Step Logo Data
    data.append("company_avatar", logoData.file);
    // Extra Fields
    data.append("user_position", "the position");
    data.append("user_is_admin", "1");
    // Set Loading
    setLoading(true);
    fetch("https://id.safav2.io.safavisa.com/register", {
      method: "post",
      body: data,
    })
      .then(() => {
        navigate("/complete");
      })
      .catch(() => {
        navigate("/complete");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCountries();
    getDialCodes();
    getCites();
  }, []);

  return (
    <main id="main" className="theme_container">
      <div className="stepper_container">
        <Nav step={step}></Nav>
        <div className="theme_step_container">
          {step === 1 && (
            <About
              countries={countries}
              cities={cities}
              codes={codes}
              next={changeStep}
              data={aboutData}
              submit={aboutStepSubmit}
            ></About>
          )}
          {step === 2 && (
            <Company
              countries={countries}
              cities={cities}
              codes={codes}
              next={changeStep}
              data={companyData}
              submit={companyStepSubmit}
            ></Company>
          )}
          {step === 3 && (
            <Logo
              next={changeStep}
              data={logoData}
              submit={logoStepSubmit}
            ></Logo>
          )}
          {step === 4 && (
            <Confirmation
              next={changeStep}
              email={aboutData.businessEmail}
              loading={loading}
              submit={register}
            ></Confirmation>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
