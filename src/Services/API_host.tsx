import React from 'react';

const API_host = () => {

    let hostname = window.location.host;

    if(hostname === 'www.theme.com.hk'){

        return 'http://api.theme.com.hk/nft/';

    } else if (hostname === 'www.nft_place.com'){

        return 'http://www.api_mongodb.com/nft/';

    } else {
        
        return 'http://localhost:3000/nft/';

    }

};

export default API_host;