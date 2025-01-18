export default function priceDollars(price) {
    return `$${(price/100).toFixed(2)}`
}