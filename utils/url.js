export default function getUrlForGift(gift) {
    if (!gift) return '';
    if (!gift.url) return ''; 
    if (gift.url.startsWith("http://") || gift.url.startsWith("https://")) {
        return gift.url;
    }
    return "http://" + gift.url;
}