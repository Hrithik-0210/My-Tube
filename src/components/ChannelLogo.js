import React, { useCallback, useEffect, useState } from "react";

const ChannelLogo = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState([]);
  //   const [channelLogo, setChannelLogo] = useState();
  const GOOGLE_API_KEY = "AIzaSyBJxKtp5wPqY-8BBkpkgTUPWOGTf6D_x60";
  const CHANNEL_DETAILS_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${GOOGLE_API_KEY}`;

  const getChannelDetails = useCallback(async () => {
    const data = await fetch(CHANNEL_DETAILS_API);
    const jsonData = await data.json();
    console.log(jsonData.items);
    setChannelDetails(jsonData.items);
  }, [CHANNEL_DETAILS_API]);

  useEffect(() => {
    getChannelDetails();
  }, [getChannelDetails]);

  if (channelDetails?.length === 0) {
  } else {
    const [{ snippet }] = channelDetails;
    const { thumbnails } = snippet;

    console.log(snippet.thumbnails);
    return (
      <img
        src={thumbnails.medium.url}
        alt=""
        className="w-9 h-9 m-2 rounded-full object-cover object-center"
      />
    );
  }
};

export default ChannelLogo;
