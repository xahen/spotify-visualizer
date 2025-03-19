'use client';

import { useEffect } from 'react';

export const JsonReader = () => {
    useEffect(() => {
        fetch('/data/Spotify Extended Streaming History/Streaming_History_Audio_2012-2017_0.json')
            .then((res) => res.json())
            .then((jsonRes) => console.log(jsonRes))
            .catch((error) => console.error('Error reading JSON:', error));
    }, []);

    return <h1>JSON Data Loaded</h1>;
};
