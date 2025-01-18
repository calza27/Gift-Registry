import { useState, useEffect } from 'react';
import { getImageUrl } from "../hooks/image";
import { getToken } from "../hooks/cookies";
import priceDollars from "../utils/price";
import GiftImage from "./GiftImage";
import Link from 'next/link';

export default function GiftListObject({ gift, key }) {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (gift.image_file_name) {
        getImageUrl(getToken(), gift.image_file_name).then(response => {
          response.text().then(url => {
            setImageUrl(url)
          })
        })
      }
    }
    return () => { ignore = true; }
  }, [gift]);

  return (
    <Link href={`/list/gift?list_id=${gift.list_id}&gift_id=${gift.id}`} key={key} passHref>
      <div>
        <GiftImage gift={gift} />
        <h3>{gift.name}</h3>
        <p>{gift.place_of_purchase}</p>
        <p>{priceDollars(gift.price)}</p>
        <p>{gift.created_at}</p>
      </div>
    </Link>
  )
}