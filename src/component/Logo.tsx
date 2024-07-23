import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

function Logo(props: any) {
  const [fileInfo, setFileInfo] = useState({
    file: props.data.file ? props.data.file : null,
    sizeValid: true,
  });
  const [src, setSrc] = useState(props.data.src ? props.data.src : "");

  const handleLogoChange = (e: any) => {
    const file = e?.target?.files[0];
    if (file) {
      setFileInfo({
        file,
        sizeValid: file.size / 1024 < 500,
      });
      setSrc(URL.createObjectURL(file));
    }
  };

  const submitForm = () => {
    if (fileInfo.sizeValid) {
      props.submit({
        file: fileInfo.file,
        src: src,
      });
      props.next(4);
    } else return;
  };

  return (
    <Fragment>
      <h4 className="title">Upload Company Logo</h4>
      {!fileInfo.sizeValid && (
        <div className="alert-danger">Selected file is more than 500 kb.</div>
      )}
      <form className="theme_step_form">
        <div className="image-uploader">
          <div className="group">
            <label className="float-btn" htmlFor="logo_input">
              <i className="flaticon-plus icon-fix"></i>
            </label>
            <img src={src ? src : "/placeholder.jpg"} alt="Company Logo" />
            <input
              type="file"
              className="invisible-input"
              id="logo_input"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
          <p className="subtitle alternate">
            Only images with size lower than 500 KB are allowed.
          </p>
        </div>
      </form>
      <div className="call_to_action justify-end mt-20">
        <button
          className="btn btn-muted md"
          onClick={() => {
            props.next(2);
          }}
        >
          Back
        </button>
        <button className="btn btn-primary xl" onClick={submitForm}>
          Next
        </button>
      </div>
    </Fragment>
  );
}

export default Logo;
