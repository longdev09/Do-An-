import ScaleLoader from "react-spinners/ScaleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Loading({ height }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Đảm bảo căn giữa theo cả chiều dọc
        height: `${height}px`,
        padding: "150px 50px",
      }}
    >
      <ScaleLoader
        cssOverride={override}
        color={"#009dff"}
        loading={true}
        size={15}
      />
    </div>
  );
}
