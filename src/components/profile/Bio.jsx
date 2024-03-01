import useProfile from "../../hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import check from "../../assets/icons/addPhoto.svg";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const Bio = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();

  const [bio, setBio] = useState(state?.user?.bio || "");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setBio(state?.user?.bio);
  }, [state?.user?.bio]);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const res = await api.patch(`/profile/${state?.user?.id}`, { bio });
      if (res?.status === 200) {
        dispatch({ type: actions.profile.USER_DATA_EDITED, data: res.data });
      }
      setEditMode(false);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {editMode ? (
          <textarea
            className="p-2 lg:text-lg rounded-md text-gray-600 leading-[188%]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            cols={55}
          />
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        )}
      </div>

      {editMode ? (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={check} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
};

export default Bio;
