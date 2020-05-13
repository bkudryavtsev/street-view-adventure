export const radians = d => d * Math.PI / 180;

export const distance = (pos1, pos2) => {
    // The math module contains a function named 
    // radians which converts from degrees to radians. 
    let lon1r = radians(pos1.lng); 
    let lon2r = radians(pos2.lng); 
    let lat1r = radians(pos1.lat); 
    let lat2r = radians(pos2.lat); 

    // Haversine formula  
    let dlon = lon2r - lon1r;
    let dlat = lat2r - lat1r;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1r) * Math.cos(lat2r) * 
      Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
     
    // Radius of earth in kilometers. Use 3956 for miles 
    let r = 6371;
       
    // calculate the result 
    return(c * r);
}

// https://gis.stackexchange.com/a/131584
export const nearby = latLng => {
  let r = 100 / 111300, // 100m
    y0 = latLng.lat, 
    x0 = latLng.lng,
    u = Math.random(), 
    v = Math.random(), 
    w = r * Math.sqrt(u), 
    t = 2 * Math.PI * v, 
    x = w * Math.cos(t),
    y1 = w * Math.sin(t), 
    x1 = x / Math.cos(y0);

  const newY = y0 + y1;
  const newX = x0 + x1;
  
  return { lat: newY, lng: newX };
}

export const randArrIdx = arr => {
  return Math.floor(Math.random() * arr.length);
};
