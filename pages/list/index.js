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
import Button from "@/components/Button";
import GiftImage from "@/components/GiftImage";
import { deleteListById } from "@/hooks/list";

const List = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const router = useRouter();
    const [list, setList] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(getUserId());
    const [hoverEl, setHoverEl] = useState(null);

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
        return window.location.origin + "/list/?list_id=" + list.sharing_id;
    }

    const mouseHoverCopy = (event) => {
        if (hoverEl && document.body.contains(hoverEl)) {
            document.body.removeChild(hoverEl);
        }
        var newElement = document.createElement("div");
        newElement.innerHTML = "Copy Link";
        newElement.style.position = "absolute";
        newElement.style.top = event.clientY + 10 + "px";
        newElement.style.left = event.clientX + 10 + "px";
        newElement.style.backgroundColor = "black"; 
        newElement.style.color = "white";
        newElement.style.padding = "5px";
        newElement.style.borderRadius = "5px";
        document.body.appendChild(newElement);
        setHoverEl(newElement);
        setTimeout(() => {
            if (hoverEl) {
                document.body.removeChild(hoverEl);
                setHoverEl(null);
            }
        }, 2000);
    }

    const mouseOutCopy = () => {
        if (hoverEl && document.body.contains(hoverEl)) {
            if (document.body.hasChildNodes(hoverEl)) {
                document.body.removeChild(hoverEl);
            }
            setHoverEl(null);
        }
    }

    const copyClicked = () => {
        copyText();
        if (hoverEl) {
            hoverEl.innerHTML = "Copied!";
            setTimeout(() => {
                mouseOutCopy();
            }, 1000);
        }
    }

    const copyText = () => {
        const textArea = document.createElement("textarea");
        textArea.value = shareLink();
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } finally {
            textArea.remove();
        }
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
            <div className="flex column center">
                <div className="flex row middle">
                    { list.image_file_name && <div>
                        <GiftImage entity={list} alt={list.list_name} />
                    </div> }
                    <div style={{paddingLeft: "10px"}}>
                        <h1>{list.list_name}</h1>
                        <p>{list.description}</p>
                    </div>
                </div>
                <div className="flex column fullWidth middle">
                    <div className="borderedBox borderBottom flex row fullWidth">
                        <div className="flex end">
                            Share This Code!&nbsp;&nbsp;
                            <span><span id="share_id">{list.sharing_id}</span> <a style={{cursor: "pointer"}} onClick={copyClicked} onMouseOver={mouseHoverCopy} onMouseOut={mouseOutCopy}>
                                <Image src="/copy.svg" alt="Copy" width={20} height={20}/>
                            </a></span>
                        </div>
                        { list.user_id == userId && <div className="flex column right"> 
                            <Button onClick={() => router.push('/list/gift/new?list_id=' + list.id)}>Add Gift</Button>
                            <Button onClick={() => router.push('/list/edit?list_id=' + list.id)}>Edit List</Button>
                        </div> }
                    </div>
                    <div className="contentWidth flex column middle">
                        { gifts && gifts.length > 0 ?
                            <div className="flex column fullWidth">
                                {gifts.map((gift, index) => {
                                    if (!gift.purchased) {
                                        return (
                                            <GiftListObject gift={gift} key={index} canEdit={list.user_id == userId}/>
                                        )
                                    }
                                })}
                                {gifts.map((gift, index) => {
                                    if (gift.purchased) {
                                        return (
                                            <GiftListObject gift={gift} key={index} canEdit={list.user_id == userId}/>
                                        )
                                    }
                                })}
                                { list.user_id == userId &&<div className="flex row center middle">
                                    <div><Button onClick={() => router.push('/list/gift/new?list_id=' + list.id)}>Add Gift</Button></div>
                                </div>}
                            </div> : <div>
                                <p>No gifts in this list yet!</p>
                                { list.user_id == userId && <Button onClick={() => router.push('/list/gift/new?list_id=' + list.id)}>Add A Gift</Button> }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default List;
