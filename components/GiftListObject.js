import priceDollars from "@/utils/price";
import GiftImage from "./GiftImage";
import Link from "next/link";
import getUrlForGift from "@/utils/url";
import Button from "./Button";

export default function GiftListObject({ gift, key }) {

  const websiteButtonClicked = () => {
    window.open(getUrlForGift(gift), "_blank")
  }

  return (
    <div className="flex row center middle borderedBox borderBottom">
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
        paddingRight: "0.5rem",
      }}>
        <Link href={`/list/gift?list_id=${gift.list_id}&gift_id=${gift.id}`} key={key} passHref>
          <div className="flex column">
            <div style={{color: "#908A8A", opacity: "0.75", fontSize: "0.875rem"}}>{gift.place_of_purchase}</div>
            <div style={{color: "black", fontWeight: "bold"}}>{gift.title}</div>
          </div>
        </Link>
      </div>
      <div style={{flexGrow: gift.url ? "1": "2"}}>
        <p>{priceDollars(gift.price)}</p>
      </div>
      { gift.url && <div style={{flexGrow: "1"}}>
        <Button onClick={websiteButtonClicked}>Website</Button>
      </div> }
    </div>
  )
}