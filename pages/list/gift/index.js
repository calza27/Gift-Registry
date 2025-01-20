import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { getToken } from "@/hooks/cookies";
import GiftImage from "@/components/GiftImage";
import { getGiftById } from "@/hooks/gift";
import priceDollars from "@/utils/price";
import PageLayout from "@/components/layouts/PageLayout"
import Link from "next/link"

const Gift = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const gift_id = searchParams.get('gift_id')
    const [gift, setGift] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!list_id) return;
        const fetchGift = async () => {
            try {
                setLoading(true);
                setError(null);
                let token = getToken()
                const giftReponse = await getGiftById(token, list_id, gift_id)
                if (!giftReponse.ok) {
                    throw new Error('Failed to fetch gift');
                }
                const giftData = await giftReponse.json();
                setGift(giftData);
            } catch (err) {
                if (err.message) setError(err.message);
                else setError(JSON.stringify(err));
            } finally {
                setLoading(false);
            }
        };
        fetchGift();
    }, [list_id, gift_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;
    return (
        <PageLayout title={gift.title}>
            <div>
                <Link href={`/list?list_id=${list_id}`}>Back to list</Link>
                <div>
                    <GiftImage entity={gift} alt={gift.title} />
                </div>
                <div>
                    <p>{gift.description}</p>
                    <p>Available From: {gift.place_of_purchase}</p>
                    <p>{priceDollars(gift.price)}</p>
                </div>
            </div>
        </PageLayout>
    );
};

export default Gift;