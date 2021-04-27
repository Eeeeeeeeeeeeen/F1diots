export function formatACCDateTime(date) {
  const res = date.split("_");

  const d = formatDate(res[0]);

  const t = res[1]
    .slice(0, -2)
    .match(/.{1,2}/g)
    .join(":");

  const ISODate = new Date(`${d}T${t}`);
  console.log(ISODate.toString());
  return ISODate;
}

function formatDate(date) {
  //Add a 20 to the year and format as an actual date
  const sDate = `20${date.match(/.{1,2}/g).join("-")}`;

  //Every 2 characters, add a /
  return sDate;
}

export const formatDateString = (id) => {
  const dt = formatACCDateTime(id);

  const year = dt.getFullYear().toString().substring(2);
  const month = dt.getMonth() + 1;
  const day = dt.getDate();

  const hour = dt.getHours().toString();
  const minutes = dt.getMinutes().toString();

  return `${day}/${month}/${year} ${hour.length > 1 ? hour : "0" + hour}:${
    minutes.length > 1 ? minutes : "0" + minutes
  }`;
};
