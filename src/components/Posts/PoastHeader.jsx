/* eslint-disable react/prop-types */
import threedot from "../../assets/icons/3dots.svg";
import edit from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import time from "../../assets/icons/time.svg";
import { getDateDifferenceFromNow } from "../../utils";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const PoastHeader = ({ post }) => {
  const { avatarURL } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();

  const isMe = post?.author?.id === auth?.user?.id;

  const handleToggle = () => {
    setShowAction(!showAction);
  };

  const handleDelete = async (p) => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${p.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error,
      });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      {/* <!-- author info --> */}
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={time} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {getDateDifferenceFromNow(post?.createAt)} ago
            </span>
          </div>
        </div>
      </div>
      {/* <!-- author info ends --> */}

      {/* <!-- action dot --> */}
      <div className="relative">
        {isMe && (
          <button onClick={handleToggle}>
            <img src={threedot} alt="3dots of Action" />
          </button>
        )}

        {/* <!-- Action Menus Popup --> */}
        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={edit} alt="Edit" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(post)}
              className="action-menu-item hover:text-red-500"
            >
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <!-- action dot ends --> */}
    </header>
  );
};

export default PoastHeader;
