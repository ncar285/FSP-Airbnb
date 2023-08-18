export const fetchAllListings = () => (
  fetch('/api/listings')
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        // error handling
      }
    })
)

export const fetchOneListing = async listingId => {
  const res = await fetch(`/api/listings/${listingId}`)
  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    // error handling
  }
}