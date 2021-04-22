export function formatACCDateTime(date) {
  const res = date.split("_");

  //Every 2 characters, add a /
  const d = formatDate(res[0]);

  const t = res[1]
    .slice(0, -2)
    .match(/.{1,2}/g)
    .join(":");

  return `${d} ${t}`;
}

function formatDate(date) {
  const sDate = date.match(/.{1,2}/g);
  const reversedDate = sDate[2] + sDate[1] + sDate[0];

  //Every 2 characters, add a /
  return reversedDate.match(/.{1,2}/g).join("/");
}
