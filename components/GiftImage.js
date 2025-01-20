import { useEffect, useState } from 'react';
import { getToken } from "@/hooks/cookies";
import { getImageUrl } from "@/hooks/image";
import Image from 'next/image'

const GiftImage = ({ entity, alt }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!entity.image_file_name) return;
        const fetchImageUrl = async () => {
            try {
                setLoading(true);
                setError(null);
                let token = getToken()
                const response = await getImageUrl(token, entity.image_file_name)
                if (!response.ok) {
                    throw new Error('Failed to fetch image url for ' + entity.image_file_name);
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
    }, [entity]);

    if (error) return (
    <Image
        src="/brk.png"
        width={0}
        height={0}
        style={{ width: '100px', height: 'auto' }}
        alt={alt}
    />
    )
    if (loading) return <div></div>;
    if (!imageUrl) return;
    return (
    <Image
        src={imageUrl}
        width={0}
        height={0}
        style={{ width: '100px', height: 'auto' }}
        alt={alt}
    />
    )
};

export default GiftImage;