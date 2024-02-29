import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoadin(true);
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${auth?.user?.id}`);

        setUser(res?.data?.user);
        setPost(res?.data?.posts);
      } catch (err) {
        setError(err);
      } finally {
        setLoadin(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) <div>fecth Data</div>;

  return <div>{user?.firstName}</div>;
};

export default ProfilePage;
