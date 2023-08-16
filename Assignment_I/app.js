const http = require('http');
const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://catfact.ninja/breeds';
const outputFile = 'catBreeds.txt';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


const getAllPages = async function(req, res){
  const firstPageData = await fetchData(baseUrl);
  if (!firstPageData) return;

  const totalPages = firstPageData.last_page;
  //2) Console log the number of pages of data that are available on this URL
  console.log('Total pages of data available:', totalPages);

  const allBreeds = {};

  for (let page = 1; page <= totalPages; page++) {
    const pageData = await fetchData(`${baseUrl}?page=${page}`);
    if (pageData && pageData.data) {
      pageData.data.forEach(breed => {
        const country = breed.country;
        if (!allBreeds[country]) {
          allBreeds[country] = [];
        }
        // 3) Get data from ALL the pages 
        allBreeds[country].push({
          breed: breed.breed,
          origin: breed.origin,
          coat: breed.coat,
          pattern: breed.pattern
        });
      });
    }
  }
   fs.writeFileSync(outputFile, JSON.stringify(allBreeds, null, 2));
   console.log('Data written to', outputFile);
//    4) Using the data from ALL the pages 
//    4a) Return cat breeds grouped by Country 
   res.end(JSON.stringify(allBreeds, null, 2));
}
const server = http.createServer(getAllPages);
server.listen(5001, ()=>{
  console.log(`Server is running on port 5001`);
})


