function Complete() {
  return (
    <div className="confirmation-box">
      <div className="image">
        <img src="/inbox.svg" alt="Confirmation" />
      </div>
      <p className="text-dark fs-14 fw-600 mb-0">
        Congratz, you successfully created your account.
      </p>
      <p className="text-dark mt-5 mb-0 fs-14 fw-500">
        We just sent you a confirmation email
      </p>
      <p className="text-dark mt-0 fs-14 fw-500">Please check your E-mail</p>
      <br />
      <p className="text-dark fs-12 mb-0 fw-500">Didn't Receive it ?</p>
      <p className="text-dark fs-12 mt-5 fw-500">
        Check your spam folder or{" "}
        <a href="!#" className="text-underlined text-secondary">
          Resend Email
        </a>
      </p>
    </div>
  );
}

export default Complete;
