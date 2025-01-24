import { useState, useEffect } from 'react';
import { getImageUrl } from "@/hooks/image";
import { getToken } from "@/hooks/cookies";
import GiftImage from "./GiftImage";
import Link from "next/link"

export default function ListObject({ giftList, key }) {
  const [ imageUrl, setImageUrl ] = useState("")
  useEffect(() => {
    if(!giftList.image_file_name) return;
    const fetchImageUrl = async () => {
      try {
        const response = await getImageUrl(getToken(), giftList.image_file_name)
        if (!response.ok) {
          throw new Error('Failed to fetch image url for ' + giftList.image_file_name);
        }
        const data = await response.text();
        setImageUrl(data);
      } catch (err) {
        setImageUrl("/brk.png");
      }
    }
    fetchImageUrl();
  }, [giftList]);

  return (
    <Link href={`/list?list_id=${giftList.id}`} key={key} passHref>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0.5rem",
        borderBottom: "1px solid #D2D2D2",
        margin: "0.5rem",
      }}>
        <div style={{
          flexGrow: "0.2",
        }}>
          <GiftImage entity={giftList} alt={giftList.name} />
        </div>
        <div style={{
          flexGrow: "10",
          marginLeft: "1rem",
        }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{color: "black", fontWeight: "bold"}}>{giftList.list_name}</div>
            </div>
        </div>
      </div>
    </Link>
  )
}