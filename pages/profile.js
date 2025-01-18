import { getToken, getUser } from "../hooks/cookies";
import ListObject from "../components/ListObject";
import { useState, useEffect } from "react";
import { getLists } from "../hooks/list";

export default function Profile() {
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
      };
      fetchLists();
  }, [token]);

  return (
    <div>
      <h1>Profile page</h1>
      <br/>
      <div>
        <span>
          User: {JSON.stringify(getUser())}
        </span>
      </div>
      <div>
        { loading && <div>Loading... </div>}
        { error && <div>Error: {error}</div>}
        { !loading && !error && <span>Gift Lists</span>}
        { lists && lists.length > 0 ?
            <ul>
                {lists.map((list, index) => {
                  return (
                    <ListObject giftList={list} key={index} />
                  )
                })}
            </ul> : <p>No lists created yet</p>
        }
      </div>
    </div>
  )
}