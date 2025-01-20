'use client';

import { getGiftById } from "@/hooks/gift";
import PageLayout from "@/components/layouts/PageLayout"
import GiftForm from "@/components/GiftForm"
import { getToken } from "@/hooks/cookies";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const EditGift = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const gift_id = searchParams.get('gift_id')
    const router = useRouter();
    const redirect = () => {
        router.push('/list/gift?list_id=' + list_id + '&gift_id=' + gift_id)
    }
    const [loading, setLoading] = useState(true);
    const [gift, setGift ] = useState(null);
    const [error, setError ] = useState(null);

    useEffect(() => {
        if (!list_id || !gift_id) return;
        const fetchGift = async () => {
            try {
                setLoading(true);
                setError(null);
                let token = getToken()
                const giftResponse = await getGiftById(token, list_id, gift_id);
                if (!giftResponse.ok) {
                    throw new Error('Failed to fetch gift');
                }
                const giftData = await giftResponse.json();
                setGift(giftData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();
    }, [list_id, gift_id]);
    
    return (
        <PageLayout title="Edit Gift" requireAuth={true}>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { !loading && !gift && <div>Gift not found</div> }
            { !loading && gift && <GiftForm listId={list_id} giftData={gift} successAction={redirect}/> }
        </PageLayout>
    );
};

export default EditGift;