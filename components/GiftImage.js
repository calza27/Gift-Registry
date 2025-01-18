import { useEffect, useState } from 'react';
import { getToken } from "../hooks/cookies";
import { getImageUrl } from "../hooks/image";
import Image from 'next/image'

const GiftImage = ({ gift }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!gift.image_file_name) return;
        const fetchImageUrl = async () => {
            try {
                setLoading(true);
                setError(null);
                let token = getToken()
                const response = await getImageUrl(token, gift.image_file_name)
                if (!response.ok) {
                    throw new Error('Failed to fetch image url for ' + gift.image_file_name);
                }
                const data = await response.text();
                setImageUrl(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchImageUrl();
    }, [gift]);

    if (error) return (
    <Image
        src="/public/brk.png"
        width={100}
        height={100}
        alt={gift.title}
    />
    )
    if (loading) return <div></div>;
    if (!imageUrl) return;
    return (
    <Image
        src={imageUrl}
        width={100}
        height={100}
        alt={gift.title}
    />
    )
};

export default GiftImage;