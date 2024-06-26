import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { PiCheckCircleDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import ChannelLogo from "./ChannelLogo";

const VideoByCategoryCard = ({ item }) => {
  const { snippet } = item;
  const { channelTitle, publishedAt, thumbnails, title, channelId } = snippet;

  function publishTime(publishedAt) {
    const currentDate = new Date();
    const targetDate = new Date(publishedAt);
    const differenceMs = currentDate - targetDate;

    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    if (differenceDays >= 365) {
      const differenceYears = Math.floor(differenceDays / 365);
      if (differenceYears === 1) {
        return "1 year ago";
      } else {
        return `${differenceYears} years ago`;
      }
    } else if (differenceDays >= 30) {
      const differenceMonths = Math.floor(differenceDays / 30);
      if (differenceMonths === 1) {
        return "1 month ago";
      } else {
        return `${differenceMonths} months ago`;
      }
    } else if (differenceDays > 0) {
      if (differenceDays === 1) {
        return "1 day ago";
      } else {
        return `${differenceDays} days ago`;
      }
    } else {
      const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
      if (differenceHours === 1) {
        return "1 hour ago";
      } else if (differenceHours > 0) {
        return `${differenceHours} hours ago`;
      } else {
        const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
        if (differenceMinutes === 1) {
          return "1 minute ago";
        } else {
          return `${differenceMinutes} minutes ago`;
        }
      }
    }
  }
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  //   console.log(snippet);
  return (
    <div>
      {isMenuOpen ? (
        <div className="video-card-container group w-fit my-[0.40rem] px-2 py-3 rounded-2xl hover:bg-Video-card-color transition ease-linear delay-150  duration-200 dark:bg-black dark:text-white dark:hover:bg-gray-800">
          <div className="video-card w-72 h-64 sm:w-96 sm:h-72 sm:my-1  transition ease-linear ">
            <div className="thumbnail-continer rounded-2xl  sm:w-96 sm:h-52 ">
              <img
                src={thumbnails.medium.url}
                alt="thumbnail"
                className="rounded-xl group-hover:rounded-sm transition-all delay-100 sm:w-full sm:h-full"
              />
            </div>
            <div className="video-details flex py-2 font-medium">
              <ChannelLogo channelId={channelId} />

              <div className="channel-details flex flex-col overflow-hidden dark:bg-black dark:text-white">
                <div className="title text-[13.9px] my-1 line-clamp-2">
                  {title}
                </div>

                <div className="check-logo flex gap-1 items-center font-normal">
                  <div className="channelName text-[13px] text-gray-500 dark:text-stone-300">
                    {channelTitle}
                  </div>
                  <PiCheckCircleDuotone className=" w-[0.8rem] h-[0.8rem] text-gray-500 dark:text-stone-300" />
                </div>
                <div className="view-and-time flex items-center text-[13px] font-normal text-gray-500 dark:text-stone-300">
                  <div className="time-ago">{publishTime(publishedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-card-container group w-fit my-[0.40rem]  px-2 py-3 rounded-2xl hover:bg-Video-card-color transition ease-linear delay-150 duration-200 dark:bg-black dark:text-white dark:hover:bg-gray-800">
          <div className="video-card w-[16.5rem] sm:w-96 sm:h-72 sm:my-1 transition ease-linear  ">
            <div className="thumbnail-continer rounded-2xl sm:w-96 sm:h-52">
              <img
                src={thumbnails.medium.url}
                alt="thumbnail"
                className="rounded-xl group-hover:rounded-sm transition-all delay-100 w-full sm:w-full sm:h-full"
              />
            </div>
            <div className="video-details flex py-2 font-medium w-full">
              <ChannelLogo channelId={channelId} />

              <div className="channel-details flex flex-col overflow-hidden ">
                <div className="title text-[13.9px] my-1 line-clamp-2">
                  {title}
                </div>

                <div className="check-logo flex gap-1 items-center font-normal">
                  <div className="channelName text-[13px] text-gray-500 dark:text-stone-300">
                    {channelTitle}
                  </div>
                  <MdCheckCircle className=" w-[0.8rem] h-[0.8rem] text-gray-500 dark:text-stone-300" />
                </div>
                <div className="view-and-time flex items-center text-[13px] font-normal text-gray-500 dark:text-stone-300">
                  <div className="time-ago">{publishTime(publishedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoByCategoryCard;
