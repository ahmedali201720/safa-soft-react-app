function Nav(props: any) {
  return (
    <div className="stepper_nav">
      <ul className="stepper_nav_list">
        <li
          className={`stepper_nav_item ${props.step === 1 ? "active" : ""} ${
            props.step > 1 ? "done" : ""
          }`}
        >
          <span>
            <i className="flaticon-user icon-fix"></i>
          </span>
        </li>
        <li
          className={`stepper_nav_item ${props.step === 2 ? "active" : ""} ${
            props.step > 2 ? "done" : ""
          }`}
        >
          <span>
            <i className="flaticon-building icon-fix"></i>
          </span>
        </li>
        <li
          className={`stepper_nav_item ${props.step === 3 ? "active" : ""} ${
            props.step > 3 ? "done" : ""
          }`}
        >
          <span>
            <i className="flaticon-image icon-fix"></i>
          </span>
        </li>
        <li className={`stepper_nav_item ${props.step === 4 ? "active" : ""}`}>
          <span>
            <i className="flaticon-security icon-fix"></i>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
