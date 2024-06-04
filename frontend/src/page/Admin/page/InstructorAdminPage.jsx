import CardInstructorAdmin from "../Card/CardInstructorAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../../utils/endpoint";
import { toast } from "react-toastify";
import AddCard from "../components/AddCard";
import Modal from "react-modal";
import CreateAdminInstructor from "../../../modals/CreateAdminInstructor";
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
    backgroundColor: "#191C21",
    border: "none",
    padding: "40px",
    borderRadius: "16px",
    scrollbarWidth: "none",
  },

  overlay: {
    backgroundColor: "rgba(33,40,48,0.8)",
    zIndex: "1000",
  },
};
const InstructorAdminPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const getInstructor = async () => {
    try {
      const response = await axios.get(`${endpoint}/get-instructor`);
      setInstructors(response?.data?.message);
    } catch (error) {
      console.log("🚀 ~ getCourse ~ error:", error);
    }
  };
  useEffect(() => {
    getInstructor();
  }, []);
  const deleteInstructor = async (id) => {
    if (window.confirm("Bạn có chắc chắc xóa?")) {
      try {
        await axios.delete(`${endpoint}/delete-instructor/${id}`);
        toast.success(`Đã xóa thành công`);
        setInstructors(
          instructors.filter((instructor) => instructor._id !== id)
        );
      } catch (error) {
        console.log("🚀 ~ handleDelete ~ error:", error);
        toast.warning("Xóa thất bại");
      }
    }
  };
  return (
    <div className="bg-darkColors1">
      <div className="bg-darkColors2 h-screen rounded-2xl text-white">
        <AddCard onClick={() => setIsOpen(true)}></AddCard>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <CreateAdminInstructor
            getInstructor={getInstructor}
          ></CreateAdminInstructor>
        </Modal>
        {instructors &&
          instructors.map((instructor) => {
            return (
              <CardInstructorAdmin
                key={instructor._id}
                image={instructor.image}
                name={instructor.name}
                totalStudent={instructor.totalStudent}
                _id={instructor._id}
                deleteInstructor={deleteInstructor}
              ></CardInstructorAdmin>
            );
          })}
      </div>
    </div>
  );
};

export default InstructorAdminPage;
