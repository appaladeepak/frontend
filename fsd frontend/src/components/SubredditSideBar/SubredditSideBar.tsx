// Imports
import React, { MouseEventHandler } from 'react';
// Type Imports
import { Post, Subreddit } from '../../types/types';
// SVG Imports
import { ReactComponent as Pen } from "../../resources/images/pen.svg";
// Component Imports
import Imprint from '../Imprint/Imprint';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
// CSS Imports
import './SubredditSideBar.scss';

export interface SubredditSideBarProps {
    communityTheme: boolean,
    submitPage: boolean,
    currentSub: Subreddit | undefined,
    standardTheme: any,
    loginStatus: boolean,
    randomIntToString: string,
    userName: string,
    communityOptions: boolean,
    currentPost: Post | undefined,
    switchCommunityOptions: MouseEventHandler,
    handleNavigate: MouseEventHandler,
    navToProfile: MouseEventHandler,
    navToSubmit: MouseEventHandler,
    switchCommunityTheme: MouseEventHandler,
    expandRule: MouseEventHandler,
}

export default function SubredditSideBar (props: SubredditSideBarProps) {
  const {
    communityTheme,
    currentSub,
    currentPost,
    standardTheme,
    submitPage,
    loginStatus,
    randomIntToString,
    userName,
    navToProfile,
    handleNavigate,
    navToSubmit,
    switchCommunityTheme,
    expandRule,
    switchCommunityOptions,
    communityOptions
  } = props;

  return (
    <div className="sidebar">
      <div className="aboutCommunity">
          <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor, height: currentPost === undefined ? "" : "9px" }}>
            {currentPost === undefined ? <h3>About Community</h3> : null}
            {currentPost === undefined ? <img alt="more" className="more" src={require("../../resources/images/more_white.PNG")} /> : null}
          </div>

          {currentPost !== undefined && 
          <div className="postHead" id={currentPost.subreddit} onClick={handleNavigate}>
            <img alt="icon" className="head-img" src={require(`../../resources/images/Communities/${currentPost.subreddit}/icon.png`)} />
            <p className="head-p">r/{currentPost.subreddit}</p>
          </div>
          }
          <p className="about">{currentSub?.about}</p>
          <div className="createdAt">
            <img alt="cake" className="cake" src={require("../../resources/images/cakeblack.png")} />
            <p>Created {currentSub?.creationDate}</p>
          </div>
    
          <div className="memberContainer">
            <div className="memberCount">
              <p>{currentSub?.members}</p>
              <h5>Members</h5>
            </div>
            <div className="onlineCount">
              <div className="number">
                  <div className="dot"></div>
                  <p>{currentSub?.online}</p>
              </div>
              <h5>currently online</h5>
            </div>
            <div className="size">
              <p>{currentSub?.bySize}</p>
              <h5>Ranked by Size</h5>
            </div>
          </div>
    
          {submitPage === false && <button className="createPost" style={{ backgroundColor: communityTheme ? currentSub?.buttonColor : standardTheme.buttonColor }} onClick={navToSubmit}>
            Create Post
          </button>}
    
          <div className="userFlair" style={{ display: loginStatus ? "block" : "none" }}>
            <div className="userFlairDesc">
              <h5>USER FLAIR PREVIEW</h5>
              <Pen  
                style={{ fill: communityTheme ? currentSub?.buttonColor : "#0079d3", 
                height: "19px", 
                marginTop: "22px",
                cursor: "pointer" }}
              />
            </div>
    
            <div className="user" onClick={navToProfile}>
              <img alt="avatar" className="avatar" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
              <p className="userName">{userName}</p>
            </div>
          </div>
    
          <div className="communityOptions">
            <button className="communityToggle" onClick={switchCommunityOptions}>
              COMMUNITY OPTIONS
              <img alt="expand" className="expand" src={require("../../resources/images/expandblack.png")} style={{ transform: communityOptions ? "rotate(180deg)" : "" }} />
            </button>
    
            <div className="theme" style={{ display: communityOptions ? "flex" : "none" }}>
              <div className="leftTheme">
                <img alt="eye" className="eye" src={require("../../resources/images/eye.png")} />
                <p>Community theme</p>
              </div>
              <button className="switch" onClick={switchCommunityTheme} style={{ backgroundColor: communityTheme ?  `${currentSub?.buttonColor}` : "#edeff1" }}>
                <div className="dot" style={{ left: communityTheme ? "52%" : "3%" }}></div>
              </button>
            </div>
          </div>
    </div>



    <div className="rulesContainer">
        <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor }}>
            <h3>r/{currentSub?.title} Rules</h3>
        </div>

        {currentSub?.rules.map((rule, i) => {
          return (
            <div className={i !== 0 ? i !== currentSub.rules.length - 1 ? "ruleContainer" : "lastRuleContainer" : "firstRuleContainer"} >
              <div className="ruleHead" id={`${i}`} onClick={expandRule}>
                <div className="titleDiv">
                  <h3 className="rule-num">{rule?.number + `. `}</h3>
                  <h3 className="rule-title">{rule?.title}</h3>
                </div>
                <img alt="expand" className="expand" src={require("../../resources/images/expandblack.png")} style={{ transform: rule?.expanded ? "rotate(180deg)" : "" }}/>
              </div>
              <div className="ruleFooter" style={{ display: currentSub.rules[i]?.expanded ? "block" : "none" }}>
                {rule?.desc}
              </div>
            </div>
          )
        })}
    </div>



    {submitPage === false && <div className="flairsContainer">
        <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor }}>
            <h3>Search by flair</h3>
        </div>

        <div className="flairList">
          {currentSub?.flairs.map((flair, i) => {
            return (
              <button className="flair" style={{ backgroundColor: `${flair.color}` }}>
                {flair.title}
              </button>
            )
          })}
        </div>
    </div>}



    {submitPage === false && <Imprint />}
    {submitPage === false && <BackToTopButton />}
  </div>
  );
}
