import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AccountItem({ data }) {
  const cx = classNames.bind(styles);

  return (
    <Link to={"/"} className={cx("info-wrapper")}>
      <img
        className={cx("info-avatar")}
        src="https://images.viblo.asia/avatar-retina/18dfe025-47e5-4b68-8f4e-4a96bf48f85c.JPG"
        alt="hoa"
      />
      <div className={cx("info-user")}>
        <h4 className={cx("name")}>
          <span>Huy</span>
          {/* {data.tick && (
            <FontAwesomeIcon
              className={cx("icon")}
              icon={faCheckCircle}
            ></FontAwesomeIcon>
          )} */}
        </h4>
        <p className={cx("user-name")}>quochuy</p>
      </div>
    </Link>
  );
}

export default AccountItem;
