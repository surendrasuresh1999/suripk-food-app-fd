import { BallTriangle } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#f58c2a"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
