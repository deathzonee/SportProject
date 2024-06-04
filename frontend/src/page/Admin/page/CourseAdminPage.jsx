import { useEffect, useState } from "react";
import axios from "axios";
import CardCourseAdmin from "../Card/CardCourseAdmin";
import { endpoint } from "../../../utils/endpoint";
import { toast } from "react-toastify";
import AddCard from "../components/AddCard";
import Modal from "react-modal";
import CreateCourseAdmin from "../../../modals/CreateCourseAdmin";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "500px",
    borderRadius: "16px",
    backgroundColor: "#191C21",
    padding: "40px",
    border: "none",
    scrollbarWidth: "none",
  },

  overlay: {
    backgroundColor: "rgba(33,40,48,0.8)",
    zIndex: "1000",
  },
};

const CourseAdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const getCourse = async () => {
    try {
      const response = await axios.get(`${endpoint}/get-course`);
      setCourses(response?.data?.data);
    } catch (error) {
      console.log("🚀 ~ getCourse ~ error:", error);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);

  const deleteCourse = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa không?")) {
      try {
        await axios.delete(`${endpoint}/delete-course/${id}`);
        toast.success(`Lớp học đã được xóa thành công`);
        setCourses(courses.filter((course) => course._id !== id));
      } catch (error) {
        console.log("🚀 ~ handleDelete ~ error:", error);
        toast.warning("Xóa thất bại");
      }
    }
  };
  return (
    <div className="bg-darkColors1">
      <div className="px-8 py-6 bg-darkColors2 min-h-screen  rounded-2xl">
        <AddCard onClick={() => setIsOpen(true)}></AddCard>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <CreateCourseAdmin getCourse={getCourse}></CreateCourseAdmin>
        </Modal>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
          {courses &&
            courses.map((item) => {
              return (
                <CardCourseAdmin
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  totalStudent={item.totalStudents}
                  availableSeats={item.availableSeats}
                  _id={item._id}
                  deleteCourse={deleteCourse}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CourseAdminPage;
