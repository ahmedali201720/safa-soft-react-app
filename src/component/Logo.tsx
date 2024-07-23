import { Fragment } from "react/jsx-runtime";

function Logo(props: any) {
  return (
    <Fragment>
      <h4 className="title">Upload Company Logo</h4>
      <form className="theme_step_form">
        <div className="image-uploader">
          <div className="group">
            <label className="float-btn" htmlFor="logo_input">
              <i className="flaticon-plus icon-fix"></i>
            </label>
            <img src="/placeholder.jpg" alt="Company Logo" />
            <input type="file" className="invisible-input" id="logo_input" />
          </div>
          <p className="subtitle alternate">
            Entering this information correctly will facilitate the company
            verification process
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
        <button
          className="btn btn-primary xl"
          onClick={() => {
            props.next(4);
          }}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
}

export default Logo;
