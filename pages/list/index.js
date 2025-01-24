'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { getToken, getUserId } from "@/hooks/cookies";
import GiftListObject from "@/components/GiftListObject";
import { getListById } from "@/hooks/list";
import { getGifts } from "@/hooks/gift";
import { useRouter } from "next/router";
import PageLayout from "@/components/layouts/PageLayout"
import Image from 'next/image';

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

    const canCopy = () => {
        return navigator.clipboard && navigator.clipboard.writeText;
    }

    if (loading) return (
        <PageLayout title="Loading...">
        </PageLayout>
    );
    if (error) return (
        <PageLayout title="List Errors">
            <div>Error: {error}</div>
        </PageLayout>
    );
    if (!list) return (
        <PageLayout title="View List">
            <div>List not found</div>
        </PageLayout>
    );
    return (
        <PageLayout title="View List">
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <div>
                    <h1>{list.list_name}</h1>
                    <p>{list.description}</p>
                </div>
                { list.user_id == userId && <div>
                    <button onClick={() => router.push('/list/gift/new?list_id=' + list.id)}>Add Gift</button>
                    <button onClick={() => router.push('/list/edit?list_id=' + list.id)}>Edit List</button>
                </div> }
                <div>
                    <div style={{textAlign: "right"}}>
                        <div style={{textAlign: "left"}}>
                            Share This List!
                            <br/>
                            {shareLink()} { canCopy() && <a style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText(shareLink())}>
                                <Image src="/copy.svg" alt="Copy" width={20} height={20}/>
                            </a> }
                        </div>
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
            </div>
        </PageLayout>
    );
};

export default List;