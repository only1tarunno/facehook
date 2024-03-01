import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";

const ProfilePage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${auth?.user?.id}`);

        if (res.status === 200) {
          dispatch({ type: actions.profile.DATA_FECTHED, data: res.data });
        }
      } catch (err) {
        dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: err });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) <div>fecth Data</div>;

  return <div>{state?.user?.firstName}</div>;
};

export default ProfilePage;
