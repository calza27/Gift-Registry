import { getToken, getUser } from "@/hooks/cookies";
import ListObject from "@/components/ListObject";
import UserDetails from "@/components/UserDetails";
import { useState, useEffect } from "react";
import { getLists } from "@/hooks/list";
import PageLayout from "@/components/layouts/PageLayout"
import { useRouter } from "next/router";
import Button from "@/components/Button";

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
    <PageLayout title="Profile" requireAuth={true} activeNavigationPage={"profile"}>
      <div className="flex column center">
        {/* <UserDetails /> */}
        <div className="flex row">
          <div style={{flexGrow: "10" }}>
            <h1>My Lists</h1>
          </div>
          <div style={{flexGrow: "1" }}> 
            <Button onClick={() => router.push('/list/new')}>New List</Button>
          </div>
        </div>
        <div className="contentWidth flex column middle">
          { loading && <div>Loading... </div>}
          { error && <div>Error: {error}</div>}
          { lists && lists.length > 0 ?
            <div className="flex column fullWidth">
              {lists.map((list, index) => {
                return <ListObject giftList={list} key={index} />
              })}
              <div className="flex row center">
                <div style={{
                  flexGrow: "0.2",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}><Button onClick={() => router.push('/list/new')}>Add New List</Button></div>
              </div>
            </div> : <div>
                <p>No lists created yet!</p>
                <Button onClick={() => router.push('/list/new')}>Add A List</Button>
            </div>
          }
        </div>
      </div>
    </PageLayout>
  )
}