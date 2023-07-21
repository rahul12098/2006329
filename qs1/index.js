const express = require("express");
const axios = require("axios");
const app = express();
const port = 8008;


function mergeAndSortArrays(arrays) {
  const mergedArray = [].concat(...arrays);
  return Array.from(new Set(mergedArray)).sort((a, b) => a - b);
}


app.get("/numbers", async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res
      .status(400)
      .json({ error: 'Invalid query parameters. "url" parameter is missing.' });
  }

  const urlsArray = Array.isArray(urls) ? urls : [urls];

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data.numbers || [];
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
      return [];
    }
  }

 
  const requests = urlsArray.map((url) =>
    axios.get(url, { timeout: 500 }).catch((err) => err)
  );
  const responses = await Promise.allSettled(requests);

  
  const validResponses = responses
    .filter(
      (response) =>
        response.status === "fulfilled" &&
        response.value &&
        response.value.data &&
        response.value.data.numbers
    )
    .map((response) => response.value.data.numbers);

  
  const mergedUniqueNumbers = mergeAndSortArrays(validResponses);

  res.json({ numbers: mergedUniqueNumbers });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});