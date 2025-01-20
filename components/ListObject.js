import { useState, useEffect } from 'react';
import { getImageUrl } from "@/hooks/image";
import { deleteListById } from "@/hooks/list";
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

  const removeList = async () => {
    try {
      const reponse = await deleteListById(getToken(), giftList.id)
      if (!reponse.ok) {
        throw new Error('Failed to delete list');
      }
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Link href={`/list?list_id=${giftList.id}`} key={key} passHref>
        <div>
          <GiftImage entity={giftList} alt={giftList.name} />
          <h3>{giftList.list_name}</h3>
          <p>{giftList.created_at}</p>
        </div>
      </Link>
      <div>
        <Link href={`/list/edit?list_id=${giftList.id}`} passHref>Edit</Link>&nbsp;&nbsp;&nbsp;
        <a onClick={removeList}>Remove</a>
      </div>
    </div>
  )
}