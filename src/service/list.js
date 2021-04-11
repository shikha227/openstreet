export function getList(coordinates='11.3743115256,48.1394041654,11.3757277319,48.139933971') {
	var osmtogeojson = require('osmtogeojson');
  console.log(coordinates)
  return fetch('https://www.openstreetmap.org/api/0.6/map?bbox='+coordinates)
     .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => osmtogeojson(data).features);
}
export function setItem(item='11.3743115256,48.1394041654,11.3757277319,48.139933971') {
 return fetch('http://localhost:3333/list', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ item })
 })
   .then(data => data.json())
}