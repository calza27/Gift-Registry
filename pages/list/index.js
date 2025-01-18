'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { getToken } from "../../hooks/cookies";
import GiftListObject from "../../components/GiftListObject";
import { getListById } from "../../hooks/list";
import { getGifts } from "../../hooks/gift";

const List = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const [list, setList] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!list) return <div>List not found</div>;
    return (
        <div>
            <h1>{list.name}</h1>
            <div>
                Gifts
                { gifts && gifts.length > 0 ?
                    <ul>
                        {gifts.map((gift, index) => {
                        return (
                            <GiftListObject gift={gift} key={index} />
                        )
                        })}
                    </ul> : <p>No gifts</p>
                }
            </div>
        </div>
    );
};

export default List;