import priceDollars from "@/utils/price";
import GiftImage from "./GiftImage";
import Link from 'next/link';
import { getToken } from "@/hooks/cookies";
import { deleteGiftById } from "@/hooks/gift";

export default function GiftListObject({ gift, canEdit, key }) {
  const removeGift = async () => {
    try {
      const reponse = await deleteGiftById(getToken(), gift.list_id, gift.id)
      if (!reponse.ok) {
        throw new Error('Failed to delete gift');
      }
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Link href={`/list/gift?list_id=${gift.list_id}&gift_id=${gift.id}`} key={key} passHref>
        <div>
          <GiftImage entity={gift}alt={gift.title} />
          <h3>{gift.title}</h3>
          <p>{gift.place_of_purchase}</p>
          <p>{priceDollars(gift.price)}</p>
          <p>{gift.created_at}</p>
        </div>
      </Link>
      { canEdit && <div>
        <Link href={`/list/gift/edit?list_id=${gift.list_id}&gift_id=${gift.id}`} passHref>Edit</Link>&nbsp;&nbsp;&nbsp;
        <a onClick={removeGift}>Remove</a>
      </div>}
    </div>
  )
}