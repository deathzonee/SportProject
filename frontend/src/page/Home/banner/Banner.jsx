import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import sport1 from "../../../assets/sport1.png";
const Banner = ({ title, desc }) => {
  return (
    <div
      style={{
        backgroundImage: `url('${sport1}')`,
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
      className="bg-cover"
    >
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <h1 className="md:text-7xl text-4xl font-bold">{title}</h1>
            <div className="md:w-1/2">
              <p>{desc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Tham gia ngay
              </button>
              <Link
                to="/courses"
                className="px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase"
              >
                Xem CLB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};
export default Banner;
