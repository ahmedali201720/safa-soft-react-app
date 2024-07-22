function Nav() {
  return (
    <div className="stepper_nav">
      <ul className="stepper_nav_list">
        <li className="stepper_nav_item active">
          <span>
            <i className="flaticon-user icon-fix"></i>
          </span>
        </li>
        <li className="stepper_nav_item">
          <span>
            <i className="flaticon-building icon-fix"></i>
          </span>
        </li>
        <li className="stepper_nav_item">
          <span>
            <i className="flaticon-image icon-fix"></i>
          </span>
        </li>
        <li className="stepper_nav_item">
          <span>
            <i className="flaticon-security icon-fix"></i>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
