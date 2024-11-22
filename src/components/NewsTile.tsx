// src/components/NewsTile.js
import * as React from 'react';
import { format } from 'date-fns'; // Import date-fns for date formatting

const NewsTile = ({ title, content, urlToImage, publishedAt, source, url }) => {
  // Format the date in a more readable way
  const formattedDate = format(new Date(publishedAt), 'MMM d, yyyy'); // Example: "Nov 18, 2024"

//   const axios = require('axios');

// // Replace with your ClaimBuster API key
// const CLAIMBUSTER_API_KEY = '5c302e91a043440a8bb8338347772d77';
// const CLAIMBUSTER_API_URL = 'http://idir.uta.edu/claimbuster/api/v2/score/text';

// async function checkFactualClaims(articleText) {
//   try {
//     // Make a request to ClaimBuster API
//     const response = await axios.post(
//       CLAIMBUSTER_API_URL,
//       {
//         input: articleText,
//       },
//       {
//         headers: {
//           'x-api-key': CLAIMBUSTER_API_KEY,
//         },
//       }
//     );

//     // Process the response
//     const claims = response.data.claims;
//     console.log('Factual Claims:', claims);

//     // Example: Check if there are any claims with high worthiness
//     const importantClaims = claims.filter((claim) => claim.score > 0.7);
//     console.log('Important Claims to Fact-Check:', importantClaims);
//   } catch (error) {
//     console.error('Error checking factual claims:', error);
//   }
// }

//   // Example usage
//   const sampleArticleText = 'The COVID-19 vaccine can alter your DNA and has been linked to severe health issues.';
//   checkFactualClaims(sampleArticleText);

  return (
    <div className="flex items-start bg-white rounded-md shadow-sm overflow-hidden border border-borderColor hover:shadow-md transition-shadow duration-200">
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-20 h-20 object-cover rounded-l-md m-2" // Add margin to separate from the border
        />
      )}
      <div className="p-3 flex-1">
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
          {content}
        </h3>
        <div className="relative text-xs text-gray-500 mb-1">
          <span className="font-medium">{source.name}</span>
          <span className="mx-1">•</span>
          <span>{formattedDate}</span>        
        </div>
        <a
          href={url}
          className="text-blue-500 text-xs font-semibold flex items-center mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More (External)
        </a>
      </div>
    </div>
  );
};

export default NewsTile;
