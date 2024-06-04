import sport1 from "../../../assets/sport1.png";
const Gallery = () => {
  return (
    <div className="md:w-[80%] md:mx-auto mx-6  my-28">
      <h1 className="text-5xl font-bold text-center mb-16">Hình ảnh nổi bật</h1>

      <div className="md:grid grid-cols-2 items-center justify-center gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={`${sport1}`}
            alt=""
            className="md:h-[720px] w-full mx-auto rounded-xl object-cover"
          ></img>
        </div>

        <div className="gap-4 grid grid-cols-2 items-start">
          <img
            src={`${sport1}`}
            className="md:h-[350px] rounded-xl object-cover"
          ></img>
          <img
            src={`${sport1}`}
            className="md:h-[350px] rounded-xl object-cover"
          ></img>
          <img
            src={`${sport1}`}
            className="md:h-[350px] rounded-xl object-cover"
          ></img>
          <img
            src={`${sport1}`}
            className="md:h-[350px] rounded-xl object-cover"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
