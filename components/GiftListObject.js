import priceDollars from "@/utils/price";
import GiftImage from "./GiftImage";
import Link from "next/link";

export default function GiftListObject({ gift, key }) {

  const giftUrl = () => {
    if (!gift.url) {
      return null;
    }
    if (gift.url.startsWith("http://") || gift.url.startsWith("https://")) {
      return gift.url;
    }
    return "http://" + gift.url;
  }

  return (
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
        <Link href={`/list/gift?list_id=${gift.list_id}&gift_id=${gift.id}`} key={key} passHref>
          <GiftImage entity={gift} alt={gift.title} />
        </Link>
      </div>
      <div style={{
        flexGrow: "10",
        marginLeft: "1rem",
      }}>
        <Link href={`/list/gift?list_id=${gift.list_id}&gift_id=${gift.id}`} key={key} passHref>
          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{color: "#908A8A", opacity: "0.75", fontSize: "0.875rem"}}>{gift.place_of_purchase}</div>
            <div style={{color: "black", fontWeight: "bold"}}>{gift.title}</div>
          </div>
        </Link>
      </div>
      <div style={{flexGrow: gift.url ? "1": "2"}}>
        <p>{priceDollars(gift.price)}</p>
      </div>
      { gift.url && <div style={{flexGrow: "1"}}>
        <Link
          passHref
          href={giftUrl()}
          target="_blank"
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            border: "1px solid #D2D2D2",
            color: "#C74152",
            cursor: "pointer",
            padding: "8px 20px",
            boxShadow: "0 2px 4px #D2D2D2",
            margin: "10px 0px 0px 10px",
            flexGrow: "1",
          }}
        >Website</Link>
      </div> }
    </div>
  )
}