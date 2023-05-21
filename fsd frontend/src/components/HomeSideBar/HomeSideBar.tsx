// Imports
import React, { useState, MouseEventHandler } from 'react';
// Component Imports
import Imprint from '../Imprint/Imprint';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
// Type Imports
import { Subreddits } from '../../types/types';
// CSS Imports
import './HomeSideBar.scss';

export interface HomeSideBarProps {
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    loginStatus: boolean,
    loginModalState: string
    setLoginModalState: any,
    handleSubMembership: React.MouseEventHandler,
    enablePremium: MouseEventHandler,
    handleNavigate: MouseEventHandler<HTMLElement>,
    navToSubmit: MouseEventHandler,
}

export default function HomeSideBar (props: HomeSideBarProps) {
  const {
    subreddits,
    topSubreddits,
    loginStatus,
    setLoginModalState,
    loginModalState,
    handleSubMembership,
    enablePremium,
    handleNavigate,
    navToSubmit,
  } = props;

  // Local state
  const [viewAll, setViewAll] = useState(false);

  // Set visibility on subreddit list
  const handleView = (e: React.MouseEvent) => {
    setViewAll(!viewAll);
  }

  return (
    <div className="homesidebar" style={{ maxHeight: loginModalState === "closed" ? "" : "92.75vh" }}>
        
        <div className="topCommunities">
            <div className="topBannerContainer">
                <img alt="banner" className="topBanner" src={require("../../resources/images/bannerTopCommunities3.png")} />
                <h3>Today's Top Growing Communities</h3>
            </div>

            <div className="subredditList">
              {subreddits.map((subreddit, i) => {
                if (viewAll && i > 9) {
                    return;
                } else if (viewAll === false && i > 4) {
                    return;
                }
                return <div className="subInList" onClick={handleNavigate} id={subreddit.title} style={{ 
                    paddingLeft: i === 9 ? "15px" : "23px", 
                    borderBottom: viewAll ? i === 9 ? "none" : "thin solid #edeff1" : i === 4 ? "none" : "thin solid #edeff1",
                    paddingRight: subreddit.joined ? "11px" : "4px"
                }}>
                    <h3 className="num">{i + 1}</h3>
                    <img alt="top" className="top" src={require("../../resources/images/top.png")} />

                    <img alt="logo" className="logo" src={require(`../../resources/images/Communities/${subreddit.title}/icon.png`)} />
                    <h3 className="title">{"r/" + subreddit.title}</h3>

                    <button className={subreddit.joined ? "leave" : "join"} onClick={handleSubMembership} id={subreddit.title} style={{
                        padding: subreddit.joined ? loginStatus ? "2px 10px 4px 9px" : "2px 16px 4px 15px" : "2px 16px 4px 15px",
                        backgroundColor: subreddit.joined ? loginStatus ? "white" : "#0079d3" : "#0079d3",
                        color: subreddit.joined ? loginStatus ? "#0079d3" : "white" : "white",
                        border: subreddit.joined ? loginStatus ? "1px solid #0079d3" : "none" : "none"
                    }}>{subreddit.joined ? loginStatus ? "Leave" : "Join" : "Join"}</button>
                </div>
              })}

              <button className="viewAll" onClick={handleView}>{viewAll ? "View less" : "View All"}</button>
              <div className="suggestions">
                <button className="crypto suggestion" onClick={handleNavigate}>Crypto</button>
                <button className="books suggestion" onClick={handleNavigate}>Books</button>
                <button className="sports suggestion" onClick={handleNavigate}>Sports</button>
                <button className="gaming suggestion" onClick={handleNavigate}>Gaming</button>
              </div>
            </div>
        </div>

        <div className="premiumContainer">
          <div className="premium-top">
            <img alt="premium" className="premiumIcon" src={require("../../resources/images/premium2.png")} />
            <div className="slogan">
              <h4 className="headline">Reddit Premium</h4>
              <h4 className="content">The best Reddit experience, with monthly Coins</h4>
            </div>
          </div>

          <button className="premium-button" onClick={enablePremium}>Try Now</button>
        </div>

        <div className="homeContainer">
          <img alt="banner" className="home-banner" src={require("../../resources/images/homebanner.png")} />
          <img alt="avatar" className="home-avatar" src={require("../../resources/images/homeavatar.png")} />
          <h3  className="home-headline">Home</h3>
          <h3 className="home-content">Your personal Reddit frontpage. Come here to check in with your favorite communities.</h3>

          <button className="home-create create-post" onClick={navToSubmit}>Create Post</button>
          <button className="home-create create-community">Create Community</button>
        </div>

        <Imprint />
        <BackToTopButton />
    </div>
  );
}

