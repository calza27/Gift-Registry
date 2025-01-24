import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { getToken, getUserId } from "@/hooks/cookies";
import GiftImage from "@/components/GiftImage";
import { getGiftById } from "@/hooks/gift";
import { getListById } from "@/hooks/list";
import priceDollars from "@/utils/price";
import PageLayout from "@/components/layouts/PageLayout"
import Button from "@/components/Button";
import { useRouter } from "next/router";
import getUrlForGift from "@/utils/url";
import Link from "next/link";

const Gift = () => {
    const searchParams = useSearchParams()
    const router = useRouter();
    const list_id = searchParams.get('list_id')
    const gift_id = searchParams.get('gift_id')
    const [gift, setGift] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [ userId, setUserId ] = useState(getUserId())

    useEffect(() => {
        if (!list_id || !gift_id) return;
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

    useEffect(() => {
        const checkCanEdit = async() => {
            try {
                setCanEdit(false)
                let token = getToken()
                const listReponse = await getListById(token, list_id)
                if (!listReponse.ok) {
                    throw new Error('Failed to fetch list');
                }
                const listData = await listReponse.json();
                if (listData.user_id === userId) {
                    setCanEdit(true);
                }
            } catch (err) {
                setCanEdit(false);
            }
        }
        checkCanEdit();
    }, [list_id, userId]);

    const editGift = async () => {
        router.push('/list/gift/edit?list_id=' + list_id + '&gift_id=' + gift_id);
    }

    if (loading) return (
        <PageLayout title="Loading...">
        </PageLayout>
    );
    if (error) return (
        <PageLayout title="Gift Errors">
            <div>Error: {error}</div>
        </PageLayout>
    );
    if (!gift) return (
        <PageLayout title="View Gift">
            <div>Gift not found</div>
        </PageLayout>
    );
    return (
        <PageLayout title="View Gift">
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "1rem",
                    marginBottom: "2rem",
                    borderBottom: "1px solid #D2D2D2",
                }}>
                    { gift.image_file_name && <div style={{flexGrow: "0.2"}}>
                        <GiftImage entity={gift} alt={gift.title} />
                    </div> }
                    <div style={{flexGrow: "10" }}>
                        <h1>{gift.title}</h1>
                    </div>
                    { canEdit && <div style={{flexGrow: "1", textAlign: "right" }}> 
                        <Button onClick={editGift}>Edit Gift</Button>
                    </div> }
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    { gift.url && <div style={{
                        marginBottom: "2rem",
                    }}>
                        <div><b>Website</b></div>
                        <div>
                            <Link
                                passHref
                                href={getUrlForGift(gift)}
                                target="_blank"
                                style={{
                                    display: "block",
                                    backgroundColor: "#fff",
                                    borderRadius: "5px",
                                    border: "1px solid #D2D2D2",
                                    color: "#C74152",
                                    cursor: "pointer",
                                    padding: "8px 20px",
                                    boxShadow: "0 2px 4px #D2D2D2",
                                    margin: "10px 0px 0px 0px",
                                    width: "fit-content",
                                }}
                            >Website</Link>
                        </div>
                    </div> }
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "2rem",
                    }}>
                        <div style={{
                            flexGrow: "1",
                        }}>
                            <div><b>Available From</b></div>
                            <div style={{
                                padding: "0.5rem",
                            }}>{gift.place_of_purchase}</div>
                        </div>
                        <div style={{
                            flexGrow: "1",
                        }}>
                            <div><b>Price</b></div>
                            <div style={{
                                padding: "0.5rem",
                            }}>{priceDollars(gift.price)}</div>
                        </div>
                    </div>
                    <div style={{
                        marginBottom: "2rem",
                    }}>
                        <div><b>Details</b></div>
                        <div style={{
                            color: "#515151",
                            fontSize: "1rem",
                            width: "50%",
                            padding: "0.5rem",
                        }}>{gift.description}</div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Gift;