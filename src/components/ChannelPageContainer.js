import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ChannelDetails from "./ChannelDetails";
import ChannelVideos from "./ChannelVideos";
import { useSelector } from "react-redux";

const ChannelPageContainer = () => {
  const [channelDetails, setChannelDetails] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  //   const [channelInfo, setChannelInfo] = useState();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("id");

  const GOOGLE_API_KEY = "AIzaSyBJxKtp5wPqY-8BBkpkgTUPWOGTf6D_x60";
  const CHANNEL_DETAILS_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${GOOGLE_API_KEY}`;
  const VIDEOS_BY_CHANNEL_API = `https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`;

  const getChannelDetails = useCallback(async () => {
    const data = await fetch(CHANNEL_DETAILS_API);
    const jsonData = await data.json();
    // console.log(jsonData.items);
    setChannelDetails(jsonData.items);
  }, [CHANNEL_DETAILS_API]);

  const getChannelVideos = useCallback(async () => {
    const data = await fetch(VIDEOS_BY_CHANNEL_API);
    const jsonData = await data.json();
    console.log(jsonData);
    setChannelVideos(jsonData.items);
  }, [VIDEOS_BY_CHANNEL_API]);

  useEffect(() => {
    getChannelDetails();
    getChannelVideos();
  }, [getChannelDetails, getChannelVideos]);

  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  if (channelVideos && channelDetails) {
    if (isMenuOpen) {
      return (
        <div className=" absolute top-20 left-36 sm:top-20 sm:p-2 md:left-10 sm:left-0 flex flex-col justify-center items-center  ">
          <div className=" sm:pb-4 sm:w-[92svw] border-b-2 w-[85svw] pb-5 ">
            <ChannelDetails item={channelDetails} />
          </div>
          <div className="  flex flex-wrap gap-1 sm:flex-col w-full justify-center mt-4  ">
            {channelVideos.map((video) => (
              <Link to={"/watch?v=" + video.id.videoId} key={video.id}>
                <ChannelVideos video={video} key={video.id.videoId} />
              </Link>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className=" absolute top-20 left-48 sm:top-20 md:left-44 sm:left-0 sm:p-2 flex flex-col justify-center items-center ">
          <div className=" pb-5 sm:pb-4 border-b-2 sm:w-[92svw] w-[85svw]  ">
            <ChannelDetails item={channelDetails} />
          </div>
          <div className=" flex flex-wrap gap-1 sm:flex-col w-full justify-center mt-4 ">
            {channelVideos.map((video) => (
              <Link to={"/watch?v=" + video.id.videoId} key={video.id}>
                <ChannelVideos video={video} key={video.id.videoId} />
              </Link>
            ))}
          </div>
        </div>
      );
    }
  } else {
  }
};

export default ChannelPageContainer;
