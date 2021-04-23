export function formatACCDateTime(date) {
  const res = date.split("_");

  const d = formatDate(res[0]);

  const t = res[1]
    .slice(0, -2)
    .match(/.{1,2}/g)
    .join(":");

  const ISODate = new Date(`${d}T${t}`);
  return ISODate;
}

function formatDate(date) {
  //Add a 20 to the year and format as an actual date
  const sDate = `20${date.match(/.{1,2}/g).join("-")}`;

  //Every 2 characters, add a /
  return sDate;
}
