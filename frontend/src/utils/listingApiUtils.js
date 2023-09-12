// export const fetchAllListings = () => (
//   fetch('/api/listings')
//     .then(res => {
//       if(res.ok) {
//         return res.json()
//       } else {
//         // error handling
//       }
//     })
// )

export const fetchListings = params => {
  // const url = new URL('/api/listings');
  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  let baseUrl = '/api/listings';
  if (params) {
    if (Object.keys(params).length > 0) {
      baseUrl += '?';
      Object.entries(params).forEach(([k, v]) => {
        baseUrl += `${k}=${v}&`;
      });
    }
  }
  // debugger
  return fetch(baseUrl)
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        // error handling
      }
    }
  )
}



export const fetchOneListing = async listingId => {
  const res = await fetch(`/api/listings/${listingId}`)
  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    // error handling
  }
}