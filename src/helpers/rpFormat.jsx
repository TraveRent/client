export default function rpFormat(num) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    .format(num)
    .split(",")[0];
}
