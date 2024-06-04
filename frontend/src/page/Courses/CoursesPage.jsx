import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import { searchCourse } from "../../redux/apiRequest";
import Search from "../../components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import Card from "./components/Card";
const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    searchCourse(dispatch, searchDebounce, setLoading);
  }, [searchDebounce]);
  const listSearch = useSelector(
    (state) => state?.search?.resultSearch?.message
  );

  return (
    <div className="mt-[100px] w-[90%] mx-auto">
      <Search
        setSearch={(e) => {
          setSearch(e.target.value);
          setLoading(true);
        }}
        className="w-full"
      ></Search>

      {loading ? (
        <div>Loading...</div>
      ) : search.trim().length > 0 ? (
        listSearch.length > 0 &&
        listSearch.map((resultSearch) => {
          return (
            <>
              <div className="flex items-center justify-between gap-4">
                <Card
                  key={resultSearch._id}
                  image={resultSearch.image}
                  name={resultSearch.name}
                  price={resultSearch.price}
                  schedule={resultSearch.schedule}
                  totalEnrolled={resultSearch.totalStudents}
                  availableSeats={resultSearch.availableSeats}
                  _id={resultSearch._id}
                />
              </div>
            </>
          );
        })
      ) : (
        <CourseList></CourseList>
      )}
    </div>
  );
};

export default CoursesPage;
