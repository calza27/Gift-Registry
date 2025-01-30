'use client';

import PageLayout from "@/components/layouts/PageLayout"
import ListForm from "@/components/ListForm"
import { getToken } from "@/hooks/cookies";
import { getListById } from "@/hooks/list";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { deleteListById } from "@/hooks/list";
import Button from "@/components/Button";

const EditList = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const router = useRouter();
    const redirect = () => {
        router.push('/list?list_id=' + list_id)
    }
    const [loading, setLoading] = useState(true);
    const [list, setList ] = useState(null);
    const [error, setError ] = useState(null);

    const removeList = async () => {
        try {
          const reponse = await deleteListById(getToken(), list.id)
          if (!reponse.ok) {
            throw new Error('Failed to delete list');
          }
          router.push('/profile')
        } catch (err) {
          alert(err);
        }
    }

    useEffect(() => {
        if (!list_id) return;
        const fetchList = async () => {
            try {
                setLoading(true);
                setError(null);
                let token = getToken()
                const listResponse = await getListById(token, list_id)
                if (!listResponse.ok) {
                    throw new Error('Failed to fetch list');
                }
                const listData = await listResponse.json();
                setList(listData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [list_id]);

    return (
        <PageLayout title="Edit List" requireAuth={true}>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { !loading && !list && <div>List not found</div> }
            { !loading && list && <div className="flex column contentWidth">
                <div style={{textAlign: "right"}}>
                    <Button onClick={removeList}>Remove List</Button>
                </div>
                <ListForm listData={list} successAction={redirect}/>
            </div>}
        </PageLayout>
    );
};

export default EditList;