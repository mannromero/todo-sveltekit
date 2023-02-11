export async function load({ fetch }) {
    const res = await fetch('/api');
    const jsonRes = await res.json();
   
   // console.log(jsonRes)
    return {
       datas: jsonRes
    };
  }