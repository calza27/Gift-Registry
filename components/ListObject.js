import { useState, useEffect } from 'react';
import { getImageUrl } from "../hooks/image";
import { getToken } from "../hooks/cookies";
import Image from 'next/image'
import Link from "next/link"

export default function ListObject({ giftList, key }) {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (giftList.image_file_name) {
        getImageUrl(getToken(), giftList.image_file_name).then(response => {
          response.text().then(url => {
            setImageUrl(url)
          })
        })
      }
    }
    return () => { ignore = true; }
  }, [giftList]);

  return (
    <Link href={`/list?list_id=${giftList.id}`} key={key} passHref>
      <div>
        {imageUrl === "" || <Image
          src={imageUrl}
          width={100}
          height={100}
          alt={giftList.name}
      />}
        <h3>{giftList.name}</h3>
        <p>{giftList.created_at}</p>
      </div>
    </Link>
  )
}