import useProfile from "../../hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useRef } from "react";
import { actions } from "../../actions";

const ProfileImg = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();

  const fileUploadRef = useRef();

  const handleimgUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImgDisplay);
    fileUploadRef.current.click();
  };

  const updateImgDisplay = async () => {
    try {
      const fromData = new FormData();
      for (const file of fileUploadRef.current.files) {
        fromData.append("avatar", file);
      }

      const res = await api.post(
        `/profile/${state?.user?.id}/avatar`,
        fromData
      );

      if (res?.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px] ">
      <img
        className="max-w-full rounded-full"
        src={`http://localhost:3000/${state?.user?.avatar}`}
        alt="sumit saha"
      />

      <form>
        <button
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleimgUpload}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <input type="file" ref={fileUploadRef} name="" id="file" hidden />
      </form>

      {/* <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
        <img src={editIcon} alt="Edit" />
      </button> */}
    </div>
  );
};

export default ProfileImg;
