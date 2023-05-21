// Imports
import React, { MouseEventHandler, useState } from 'react';
// Component Imports
import SubredditSideBar from '../../components/SubredditSideBar/SubredditSideBar';
// Type Imports
import { Post, Subreddit, Subreddits } from '../../types/types';
// CSS Imports
import './SubmitPage.scss';

export interface SubmitPageProps {
  randomIntToString: string,
  userName: string,
  subreddits: Subreddits,
  loginStatus: boolean,
  setLoginModalState: any,
  communityTheme: boolean,
  submitPostType: string | undefined,
  submitPage: boolean,
  setSubmitPostType: any,
  onImgUpload: any,
  communityOptions: boolean,
  submitDropdownState: boolean
  loginModalState: string,
  currentSub: Subreddit | undefined,
  posts: Post[],
  currentPost: Post | undefined,
  standardTheme: any,
  imageUploaded: boolean,
  submitLoading: boolean,
  setIndex: any,
  customPost: Post,
  editPostTitle: any,
  editPostSrc: any,
  expandRule: MouseEventHandler,
  openPost: MouseEventHandler,
  handleNavigate: MouseEventHandler,
  navToSubmit: MouseEventHandler,
  switchCommunityTheme: MouseEventHandler,
  selectSubmitSubreddit: MouseEventHandler,
  switchCommunityOptions: MouseEventHandler,
  selectSubmitDropdown: MouseEventHandler,
  submitCustomPost: MouseEventHandler,
  navToProfile: MouseEventHandler,
  removeUploadedImg: MouseEventHandler,
}

export default function SubmitPage (props: SubmitPageProps) {
  const {
    randomIntToString,
    userName,
    subreddits,
    customPost,
    imageUploaded,
    submitPostType,
    submitPage,
    loginStatus,
    communityTheme,
    setLoginModalState,
    submitLoading,
    setSubmitPostType,
    editPostTitle,
    editPostSrc,
    communityOptions,
    submitDropdownState,
    onImgUpload,
    loginModalState,
    currentSub,
    posts,
    standardTheme,
    currentPost,
    setIndex,
    navToProfile,
    openPost,
    submitCustomPost,
    removeUploadedImg,
    selectSubmitSubreddit,
    selectSubmitDropdown,
    switchCommunityOptions,
    switchCommunityTheme,
    expandRule,
    handleNavigate,
    navToSubmit,
  } = props;

  // Local state
  const [typeHover, setTypeHover] = useState({
    text: false,
    image: false,
    link: false
  });
  const [draftAmount, setDraftAmount] = useState(0);
  const [focussed, setFocussed] = useState(false);
  const [OC, setOC] = useState(false);
  const [spoiler, setSpoiler] = useState(false);
  const [NSFW, setNSFW] = useState(false);

  // Hover event handler for post type div onMouseEnter events
  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === "text") {
      setTypeHover({
        text: true,
        image: false,
        link: false
      });
    } else if (target.id === "image") {
      setTypeHover({
        text: false,
        image: true,
        link: false
      });
    } else if (target.id === "link") {
      setTypeHover({
        text: false,
        image: false,
        link: true
      });
    }
  }

  // Hover event handler for post type div onMouseLeave events
  const resetHover = (e: React.MouseEvent) => {
    setTypeHover({
      text: false,
      image: false,
      link: false
    });
  }

  return (
    <div className="submit-page">
      <div className="left">
        <div className="head">
          <h3 className="head-text">Create a post</h3>
          <button className="drafts" style={{ color: currentSub !== undefined ? communityTheme ? currentSub.buttonColor : standardTheme.buttonColor : standardTheme.buttonColor }}>
            DRAFTS
            <div className="draft-num">{draftAmount}</div>
          </button>
        </div>

        <div className="divider"></div>

        <button className="community-selector closeSelector" id="community-selector" style={{ borderBottomLeftRadius: submitDropdownState ? "0px" : "4px", borderBottomRightRadius: submitDropdownState ? "0px" : "4px" }}>
          <div className="top closeSelector" onClick={selectSubmitDropdown}>
              <div className="start closeSelector">
                  <img alt="icon" className="community-icon closeSelector" src={require(`../../resources/images/Communities/${currentSub !== undefined ? `${currentSub.title}/icon` : "placeholder"}.png`)} />
                  <h4 className="community-title closeSelector">{currentSub !== undefined ? "r/" + currentSub.title : "Choose a community"}</h4>
              </div>
              <img alt="expand" className="expand closeSelector" src={require("../../resources/images/expand.png")} />
          </div>
          
          <div className="dropdown closeSelector" style={{ display: submitDropdownState ? "flex" : "none" }}>
            <h4 className="closeSelector">YOUR PROFILE</h4>
            <div className="profile closeSelector" onClick={navToProfile}>
              <img alt="avatar" src={require(`../../resources/images/avatar${loginStatus ? userName === "Nikola Tesla" ? "tesla" : randomIntToString : randomIntToString}.PNG`)} className="closeSelector" />
              <h3 className="closeSelector">u/{userName}</h3>
            </div>
            <h4 className="closeSelector">YOUR COMMUNITIES</h4>
            {currentSub !== undefined && <div className="sub-container closeSelector" id="none" onClick={selectSubmitSubreddit}>
                <img alt="icon" className="sub-icon closeSelector" src={require(`../../resources/images/Communities/placeholder.png`)} />
                <div className="sub-info closeSelector">
                  <h3 className="sub-title closeSelector">Remove Subreddit</h3>
                  <h4 className="sub-members closeSelector">Click here to reset</h4>
                </div>
              </div>}
            {subreddits.map((sub, i) => {
              return <div className="sub-container closeSelector" id={sub.title} onClick={selectSubmitSubreddit}>
                <img alt="icon" className="sub-icon closeSelector" src={require(`../../resources/images/Communities/${sub.title}/icon.png`)} id={sub.title === "leagueoflegends" ? "league" : ""}/>
                <div className="sub-info closeSelector">
                  <h3 className="sub-title closeSelector">r/{sub.title}</h3>
                  <h4 className="sub-members closeSelector">{sub.members} members</h4>
                </div>
              </div>
            })}
          </div>
        </button>

        <div className="post-options" >
          <div className="post-types">
            <div className="post-type post hoverable" style={{ backgroundColor: submitPostType === "text" ? "#f2f8fd" : typeHover.text ? "#f2f8fd" : "white", borderBottom: submitPostType === "text" ? "2px solid #0079d3" : "" }} id="text" onClick={(e) => setSubmitPostType("text")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img alt="text" className="text" src={require(`../../resources/images/${submitPostType === "text" ? "typetext_selected" : "typetext"}.png`)} />
              <h2 style={{ color: submitPostType === "text" ? "#0079d3" : "#878a8c" }}>Post</h2>
            </div>

            <div className="post-type img hoverable" style={{ backgroundColor: submitPostType === "image" ? "#f2f8fd" : typeHover.image ? "#f2f8fd" : "white", borderBottom: submitPostType === "image" ? "2px solid #0079d3" : "" }} id="image" onClick={(e) => setSubmitPostType("image")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img alt="image" className="image" src={require(`../../resources/images/${submitPostType === "image" ? "typeimage_selected" : "typeimage"}.png`)} />
              <h2 style={{ color: submitPostType === "image" ? "#0079d3" : "#878a8c" }}>Images & Video</h2>
            </div>

            <div className="post-type links hoverable" style={{ backgroundColor: submitPostType === "link" ? "#f2f8fd" : typeHover.link ? "#f2f8fd" : "white", borderBottom: submitPostType === "link" ? "2px solid #0079d3" : "" }} id="link" onClick={(e) => setSubmitPostType("link")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img alt="link" className="link" src={require(`../../resources/images/${submitPostType === "link" ? "typelink_selected" : "typelink"}.png`)} />
              <h2 style={{ color: submitPostType === "link" ? "#0079d3" : "#878a8c" }}>Link</h2>
            </div>

            <div className="post-type polls not-allowed">
              <img alt="poll" className="poll" src={require(`../../resources/images/typepoll.png`)} />
              <h2 className="greyed-out">Poll</h2>
            </div>

            <div className="post-type talks not-allowed">
              <img alt="talk" className="talk" src={require(`../../resources/images/typetalk.png`)} />
              <h2 className="greyed-out">Talk</h2>
            </div>
          </div>

          <div className="title-container">
              <input type="text" placeholder="Title" className="title" onChange={(e) => editPostTitle(e)} value={customPost.title} />
              <div className="counter">{customPost.title.length}/300</div>
          </div>

          {submitPostType !== "image" && <div className="src-container" onClick={(e) => setFocussed(true)} onBlur={(e) => setFocussed(false)} style={{ border: focussed ? "1px solid #1c1c1c" : "1px solid transparent" }}>
              <div className="button-bar-top">
                <div className="start">
                    <button className="text-settings" aria-label="Bold">
                      <img alt="bold" className="setting-icon" src={require("../../resources/images/bold.png")} />
                    </button>
                    <button className="text-settings" aria-label="Italic">
                      <img alt="italic" className="setting-icon" src={require("../../resources/images/italic.png")} />
                    </button>
                    <button className="text-settings" aria-label="Link">
                      <img alt="clip" className="setting-icon" src={require("../../resources/images/clip.png")} />
                    </button>
                    <button className="text-settings" aria-label="Striked">
                      <img alt="strikethrough" className="setting-icon" src={require("../../resources/images/strikethrough.png")} />
                    </button>
                    <button className="text-settings" aria-label="Inline Code">
                      <img alt="inline" className="setting-icon" src={require("../../resources/images/inline.png")} />
                    </button>
                    <button className="text-settings" aria-label="Superscript">
                      <img alt="superscript" className="setting-icon" src={require("../../resources/images/superscript.png")} />
                    </button>
                    <button className="text-settings spoiler" aria-label="Spoiler">
                      <img alt="spoiler" className="setting-icon" src={require("../../resources/images/spoiler.png")} />
                    </button>
              
                    <div className="line"></div>
        
                    <button className="text-settings" aria-label="Heading">
                      <img alt="heading" className="setting-icon" src={require("../../resources/images/heading.png")} />
                    </button>
                    <button className="text-settings" aria-label="Bulleted">
                      <img alt="bulleted" className="setting-icon" src={require("../../resources/images/bulleted.png")} />
                    </button>
                    <button className="text-settings" aria-label="Numbered"> 
                      <img alt="numbered" className="setting-icon" src={require("../../resources/images/numbered.png")} />
                    </button>
                    <button className="text-settings" aria-label="Quote Block">
                      <img alt="quote" className="setting-icon" src={require("../../resources/images/quote.png")} />
                    </button>
                    <button className="text-settings" aria-label="More">
                      <img alt="dots" className="setting-icon" src={require("../../resources/images/dots.png")} />
                    </button>
                </div>
    
                <div className="end">
                        <button className="markdown btn" id="markdown">
                          <p style={{ color: communityTheme ? currentSub?.buttonColor : standardTheme.buttonColor }}>Markdown Mode</p>
                        </button>
                </div>
              </div>

              <textarea placeholder={submitPostType === "link" ? "URL" : "Text (optional)"} className="src-field" onChange={editPostSrc} value={customPost.src} />
          </div>}

          {imageUploaded === false && submitPostType === "image" && <div className="img-submit">
            <h3>Drag and drop images or</h3>
            <input type="file" accept='image/*' id="upload" onChange={onImgUpload} className="img-submit-btn" style={{ display: "none" }}></input>
            <label htmlFor="upload">Upload</label>
          </div>}

          {submitPostType === "image" && <img id="blah" src={imageUploaded ? `${customPost.src}` : "#"} alt="Your Image" style={{ visibility: imageUploaded ? "visible" : "hidden" }}/>}
          {submitPostType === "image" && imageUploaded && <button className="delete" type="button" onClick={removeUploadedImg}>
              <img alt="remove" className="remove" src={require("../../resources/images/remove.png")} />
            </button>}

          <div className="flair-container">
            <button type="button" className="flair-btn" style={{ backgroundColor: OC ? "#4ac150" : "white", border: OC ? "1px solid #4ac150" : "1px solid #878a8c", gap: OC ? "9px" : "7px" }} onClick={(e) => setOC(!OC)}> 
              <img alt="check" className={OC ? "check-icon" : "flair-icon"} src={OC ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: OC ? "white" : "#878a8c" }}>OC</h3>
            </button>

            <button type="button" className="flair-btn" style={{ backgroundColor: spoiler ? "black" : "white", border: spoiler ? "1px solid black" : "1px solid #878a8c", gap: spoiler ? "9px" : "7px" }} onClick={(e) => setSpoiler(!spoiler)}>
              <img alt="icon" className={spoiler ? "check-icon" : "flair-icon"} src={spoiler ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: spoiler ? "white" : "#878a8c" }}>Spoiler</h3>
            </button>

            <button type="button" className="flair-btn" style={{ backgroundColor: NSFW ? "rgb(255, 88, 91)" : "white", border: NSFW ? "1px solid rgb(255, 88, 91)" : "1px solid #878a8c", gap: NSFW ? "9px" : "7px" }} onClick={(e) => setNSFW(!NSFW)}>
              <img alt="nsfw" className={NSFW ? "check-icon" : "flair-icon"} src={NSFW ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: NSFW ? "white" : "#878a8c" }}>NSFW</h3>
            </button>

            <button type="button" className="flair-btn greyed-out">
              <img alt="flair" className="flair-icon" src={require("../../resources/images/flair.PNG")} />
              <h3 className="grey">Flair</h3>
              <img alt="expand" className="expand" src={require("../../resources/images/expandgrey.png")} />
            </button>
          </div>

          <div className="divider"></div>

          <div className="submit-container">
            <button type="button" className="submit-btn save-draft" style={{ border: customPost.title.length >= 1 ? currentSub !== undefined ? draftAmount > 0 ? "1px solid #b2b2b2" : `1px solid ${currentSub.buttonColor}` : draftAmount > 0 ? "1px solid #b2b2b2" : `1px solid ${standardTheme.buttonColor}` : "1px solid #b2b2b2", cursor: draftAmount > 0 ? "not-allowed" : "pointer" }} onClick={draftAmount <= 0 ? (e) => {setDraftAmount(draftAmount + 1)} : (e) => null}>
              <h3 className="active" style={{ color: customPost.title.length >= 1 ? draftAmount > 0 ? "#b2b2b2" : currentSub !== undefined ? currentSub.buttonColor : draftAmount > 0 ? "#b2b2b2" : standardTheme.buttonColor : "#b2b2b2" }}>{draftAmount > 0 ? "Saved!" : "Save Draft"}</h3>
            </button>

            <button type="button" className="submit-btn" style={{ backgroundColor: currentSub !== undefined ? customPost.title.length >= 1 ? currentSub.buttonColor : "#848484" : "#848484", border: currentSub !== undefined ? customPost.title.length >= 1 ? currentSub.buttonColor : "#848484" : "#848484", cursor: currentSub !== undefined ? draftAmount > 0 ? "pointer" : customPost.title.length >= 1 ? "pointer" : "not-allowed" : "not-allowed" }} onClick={customPost.title.length >= 1 ? currentSub !== undefined ? submitCustomPost : (e) => null : (e) => null}>
              {submitLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
              <h3 className="active" style={{ color: currentSub !== undefined ? customPost.title.length >= 1 ? "white" : "#b2b2b2" : "#b2b2b2" }}>Post</h3>
            </button>
          </div>

          <div className="footer-container">
            <div className="notification-container">
              <input type="checkbox" className="notification" />
              <h4>Send me post reply notifications</h4>
            </div>

            <div className="connection-container">
              <h4>Connect accounts to share your post</h4>
              <img alt="info" className="info" src={require("../../resources/images/infos_grey.png")} />
            </div>
          </div>
        </div>
      </div>

      <div className="right">
      {currentSub !== undefined && 
        <SubredditSideBar 
          communityTheme={communityTheme}
          currentSub={currentSub}
          currentPost={currentPost}
          standardTheme={standardTheme}
          loginStatus={loginStatus}
          randomIntToString={randomIntToString}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          userName={userName}
          switchCommunityTheme={switchCommunityTheme}
          expandRule={expandRule}
          switchCommunityOptions={switchCommunityOptions}
          communityOptions={communityOptions}
          submitPage={submitPage}
          navToProfile={navToProfile}
        />}

        <div className="rediquette-container">
          <div className="rq-header">
            <div className="flex">
                <img alt="rediquette" src={require("../../resources/images/rediquette.png")} className="rq-icon" />
                <h3>Posting to Reddit</h3>
            </div>
            <div className="line"></div>
          </div>

          <div className="rq-rule">
            <h4>1. Remember the human</h4>
            <div className="line"></div>
          </div>

          <div className="rq-rule">
            <h4>2. Behave like you would in real life</h4>
            <div className="line"></div>
          </div>

          <div className="rq-rule">
            <h4>3. Look for the original source of content</h4>
            <div className="line"></div>
          </div>

          <div className="rq-rule">
            <h4>4. Search for duplicates before posting</h4>
            <div className="line"></div>
          </div>

          <div className="rq-rule">
            <h4>5. Read the community's rules</h4>
            <div className="line lastline"></div>
          </div>
        </div>

        <p className="extra">Please be mindful of reddit's <span>content policy</span> and practice good <span>reddiquette</span>.</p>
      </div>
    </div>
  );
}
