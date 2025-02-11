import { Fragment } from "react/jsx-runtime";

function Confirmation(props: any) {
  return (
    <Fragment>
      <h4 className="title">You're all set. Ready ?</h4>
      <div className="confirmation-box">
        <div className="image">
          <img src="/inbox.svg" alt="Confirmation" />
        </div>
        <p className="text-secondary fs-18 fw-600 mb-0">
          We will send a message for this e-mail.
        </p>
        <p className="text-dark fs-18 mt-5 mb-0">{props.email}</p>
      </div>
      <div className="call_to_action justify-end mt-20">
        <button
          disabled={props.loading}
          className="btn btn-muted md"
          onClick={() => {
            props.next(3);
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary xl"
          disabled={props.loading}
          onClick={props.submit}
        >
          {props.loading && (
            <span className="css-spinner sm icon-fix me-1"></span>
          )}
          Confirm
        </button>
      </div>
    </Fragment>
  );
}

export default Confirmation;
