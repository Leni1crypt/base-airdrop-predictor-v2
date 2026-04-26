// Use built-in fetch
async function test() {
  const url = 'https://api.etherscan.io/v2/api?chainid=8453&module=account&action=txlist&address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&startblock=0&endblock=99999999&sort=asc&apikey=PC6U43SHSIPHI1KW8QXW8SZ41FE6IC763C';
  const res = await fetch(url);
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}
test();
