import { getToken, getUserId } from "@/hooks/cookies";
import { useState, useEffect } from "react";
import { getUserDetails } from "@/hooks/user";

export default function UserDetails({}) {
  const [ token, setToken ] = useState(getToken())
  const [ userId, setUserId ] = useState(getUserId())
  const [ userDetails, setUserDetails ] = useState([])
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
      const fetchUserDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const listResponse = await getUserDetails(token, userId)
            if (!listResponse.ok) {
              throw new Error('Failed to fetch user details');
            }
            const userData = await listResponse.json();
            setUserDetails(userData);
        } catch (err) {
            if (err.message) setError(err.message);
            else setError(JSON.stringify(err));
        } finally {
            setLoading(false);
        }
      };

      fetchUserDetails();
  }, [token, userId]);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
        <span>
            User: {JSON.stringify(userDetails)}
        </span>
    </div>
  )
}