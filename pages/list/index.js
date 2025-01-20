'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { getToken, getUserId } from "@/hooks/cookies";
import GiftListObject from "@/components/GiftListObject";
import { getListById } from "@/hooks/list";
import { getGifts } from "@/hooks/gift";
import { useRouter } from "next/router";
import PageLayout from "@/components/layouts/PageLayout"

const List = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const router = useRouter();
    const [list, setList] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(getUserId());

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

                const giftReponse = await getGifts(token, listData.id)
                if (!giftReponse.ok) {
                    throw new Error('Failed to fetch gifts');
                }
                const giftData = await giftReponse.json();
                setGifts(giftData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [list_id]);

    const shareLink = () => {
        return window.location.origin + "/list?list_id=" + list.sharing_id;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!list) return <div>List not found</div>;
    return (
        <PageLayout title={list.list_name}>
            <div>
                {userId == list.user_id && <div><button onClick={() => router.push('/list/gift/new?list_id=' + list.id)}>Add Gift</button></div>}
                <div>
                    Share Link: {shareLink()} <a style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText(shareLink())}>Copy</a>
                </div>
                <div>
                    Gifts
                    { gifts && gifts.length > 0 ?
                        <ul>
                            {gifts.map((gift, index) => {
                            return (
                                <GiftListObject gift={gift} key={index} canEdit={list.user_id == userId}/>
                            )
                            })}
                        </ul> : <p>No gifts</p>
                    }
                </div>
            </div>
        </PageLayout>
    );
};

export default List;