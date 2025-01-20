import { getToken, getUser } from "@/hooks/cookies";
import ListObject from "@/components/ListObject";
import UserDetails from "@/components/UserDetails";
import { useState, useEffect } from "react";
import { getLists } from "@/hooks/list";
import PageLayout from "@/components/layouts/PageLayout"
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [ token, setToken ] = useState(getToken())
  const [ lists, setLists ] = useState([])
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
      const fetchLists = async () => {
        try {
            setLoading(true);
            setError(null);
            const listResponse = await getLists(token)
            if (!listResponse.ok) {
              throw new Error('Failed to fetch lists');
            }
            const listData = await listResponse.json();
            setLists(listData);
        } catch (err) {
            if (err.message) setError(err.message);
            else setError(JSON.stringify(err));
        } finally {
            setLoading(false);
        }
      };
      fetchLists();
  }, [token]);

  return (
    <PageLayout title="Profile page" requireAuth={true}>
      {/* <UserDetails /> */}
      <div>
          <button onClick={() => router.push('/list/new')}>New List</button>
      </div>
      <div>
        { loading && <div>Loading... </div>}
        { error && <div>Error: {error}</div>}
        { !loading && !error && <span>Gift Lists</span>}
        { lists && lists.length > 0 ?
            <ul>
                {lists.map((list, index) => {
                  return <ListObject giftList={list} key={index} />
                })}
            </ul> : <p>No lists created yet</p>
        }
      </div>
    </PageLayout>
  )
}