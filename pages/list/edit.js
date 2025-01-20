'use client';

import PageLayout from "@/components/layouts/PageLayout"
import ListForm from "@/components/ListForm"
import { getToken } from "@/hooks/cookies";
import { getListById } from "@/hooks/list";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

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
            { !loading && list && <ListForm listData={list} successAction={redirect}/> }
        </PageLayout>
    );
};

export default EditList;