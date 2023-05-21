// Imports
import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
// Hook Imports
import { useLocation } from 'react-router-dom';
// Type Imports
import { Post, Subreddit } from '../../types/types';
// Utility Imports
import userArray from '../../utils/userArray';
// Component Imports
import Comments from '../Comments/Comments';
// CSS Imports
import './GridPost.scss';

export interface GridPostProps {
    post: any,
    posts: Post[],
    userName: string,
    currentSub: Subreddit | undefined,
    currentPost: Post | undefined,
    mainComment: string,
    writeComment: any,
    currentEditedComment: string,
    loginStatus: boolean,
    writeNestedComment: any,
    editComment: any,
    randomIntToString: string,
    currentlyInspectedUser?: string | undefined,
    editNestedComment: any,
    currentProfileSection?: string,
    nonUserData?: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    navToProfile?: MouseEventHandler | undefined,
    navToUserProfile: MouseEventHandler | undefined,
    savePost: MouseEventHandler,
    submitNestedComment: MouseEventHandler,
    handleNavigate: MouseEventHandler,
    handleLike: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    openPost: MouseEventHandler,
    submitComment: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
}

export default function GridPost (props: GridPostProps) {
  const {
    post,
    posts,
    userName,
    currentSub,
    currentPost,
    currentlyInspectedUser,
    mainComment,
    currentProfileSection,
    nonUserData,
    writeComment,
    currentEditedComment,
    loginStatus,
    writeNestedComment,
    editComment,
    randomIntToString,
    editNestedComment,
    setIndex,
    navToProfile,
    savePost,
    submitNestedComment,
    handleNavigate,
    navToUserProfile,
    submitComment,
    handleLike,
    handleLikeComment,
    handleNestedComment,
    openPost
  } = props;

  // Local state
  const [hovered, setHovered] = useState({
    upvote: false,
    downvote: false
  });
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 80 + 12));

  // Declaring location variable to use useLocation() hook with
  const location = useLocation();

  // Hover event handler for upvote/downvote buttons
  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === "upvote") {
        const newHoverState = {
            upvote: !hovered.upvote,
            downvote: hovered.downvote
        };
        setHovered(newHoverState);
    } else if (target.id === "downvote") {
        const newHoverState = {
            upvote: hovered.upvote,
            downvote: !hovered.downvote
        };
        setHovered(newHoverState);
    }
  }

  // timed event handler to randomly add/subtract to current viewer count
  const changeViewers = (e: any) => {
    const outcome = Math.floor(Math.random() * 2);
    if (outcome === 0) {
        setViewers(viewers => viewers - 1);
    } else if (outcome === 1) {
        setViewers(viewers  => viewers + 1);
    }
  }

  // Comment counter
  const addUpComments = (posting: Post | undefined) => {
    if (currentPost === undefined) {
        let postId = posts.findIndex(postObject => postObject.title === post.title);

        if (postId === -1) {
            return;
        }

        let targetedPost = posts[postId];
        let totalCommentCount: number = 0;
        let baseCommentCount: number = targetedPost.comments.length;
        let nestedCommentCount: number = 0;
        targetedPost.comments.map((comment, i) => {
            nestedCommentCount += comment.nested_comments.length;
        });
        totalCommentCount = nestedCommentCount + baseCommentCount;
        return totalCommentCount;
    } else {
        let totalCommentCount: number = 0;
        let baseCommentCount: number = currentPost.comments.length;
        let nestedCommentCount: number = 0;
        currentPost.comments.map((comment, i) => {
            nestedCommentCount += comment.nested_comments.length;
        });
        totalCommentCount = nestedCommentCount + baseCommentCount;
        return totalCommentCount;
    }
  }

  // Fire changeViewers function every 6 seconds
  useEffect(() => {
    setInterval(changeViewers, 6000);
  }, [])

  return (
    <div className="gridPost" id={post.id} onClick={openPost} style={{ width: currentPost === undefined ? "640px" : "740px", borderRadius: "5px", borderBottomLeftRadius: currentPost === undefined ? "5px" : "0px", borderBottomRightRadius: currentPost === undefined ? "5px" : "0px" }}>
        <div className="upper" style={{ borderBottomLeftRadius: currentPost === undefined ? "5px" : "0px", borderBottomRightRadius: currentPost === undefined ? "5px" : "0px", borderBottom: currentPost === undefined ? "" : "none" }}>
        <div className="left" style={{ backgroundColor: currentPost === undefined ? "#f8f9fa" : "white" }}>
            <button className="upvote-btn" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleLike} id="upvote">
                <img alt="upvote" className="upvote" src={require(`../../resources/images/${post.vote === 0 || post.vote === -1 ? 
                                                                               hovered.upvote ? "upvoteHover.png" : "upvote.png" 
                                                                               : "upvoted.png"}`)} 
                />
            </button>

            <h3 className="votes">{post.upvotes}</h3>

            <button className="downvote-btn" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleLike} id="downvote">
                <img className="downvote" src={require(`../../resources/images/${post.vote === 0 || post.vote === 1 ?
                                                                                 hovered.downvote ? "downvoteHover.png" : "downvote.png"  
                                                                                 : "downvoted.png"}`)} 
                />
            </button>
        </div>
        <div className="right">
            <div className="header">
                <img alt="icon" className="subIcon dontOpenPost" src={require(`../../resources/images/Communities/${post.subreddit}/icon.png`)} id={post.subreddit} onClick={handleNavigate} />
                <h5 className="subName dontOpenPost" id={post.subreddit} onClick={handleNavigate}>r/{post.subreddit}</h5>
                <h5 className="author dontOpenPost">· Posted by <span className="span" id={post.author} onClick={navToUserProfile}>u/{post.author}</span></h5>
                <h5 className="creationDate">· {post.time}</h5>
                <div className="awards">
                    {post.awards.map((award: string, i: number) => {
                        return <img alt="award" className="award" src={require(`../../resources/images/${award}.png`)} />
                    })}
                </div>
            </div>

            <div className="headline" style={{ gap: /[0-9]+$/.test(location.pathname) ? "3px" : "0px" }}>
                <h2 className="headline-text" style={{ width: currentPost === undefined ? "490px" : "640px" }}>
                    {post.title}
                    {post.flair.title !== "none" ? location.pathname.substring(25, 26) !== "r" ? <button className="flair" style={{ backgroundColor: post.flair.color, zIndex: 1 }}>{post.flair.title}</button> : /[0-9]+$/.test(location.pathname) ? null : <button className="flair" style={{ backgroundColor: post.flair.color, zIndex: 1 }}>{post.flair.title}</button> : null}
                </h2>
                <div className="individualPost">
                    {post.flair.title !== "none" ? location.pathname.substring(25, 26) === "r" ? /[0-9]+$/.test(location.pathname) ? <button className="flair" style={{ backgroundColor: post.flair.color, zIndex: 1 }}>{post.flair.title}</button> : null : null : null}
                </div>
            </div>

            <div className="content">
                {post.type === "text" ? 
                <p className="src" style={{ width: currentPost === undefined ? "555px" : "662px" }}>{post.src}</p> : <img className="src" src={currentPost?.author === userName ? currentPost.src : location.pathname.includes("user") ? currentlyInspectedUser === userName ? userArray.findIndex(user => user.username === userName) !== -1 ? require(`../../resources/images/Communities/${post.subreddit}/${post.id.toString()}.png`) : nonUserData.includes(currentProfileSection) ? require(`../../resources/images/Communities/${post.subreddit}/${post.id.toString()}.png`) : post.src : require(`../../resources/images/Communities/${post.subreddit}/${post.id.toString()}.png`) : require(`../../resources/images/Communities/${post.subreddit}/${post.id.toString()}.png`)} style={{ maxWidth: currentPost === undefined ? "599px" : "698px" }} />}
            </div>

            <div className="footer">
                <div className="comments footer-div">
                    <img alt="comment" className="comments-icon" src={require("../../resources/images/comments.png")} />
                    <h4>{addUpComments(currentPost)} Comments</h4>
                </div>

                <div className="awards-footer footer-div">
                    <img alt="award" className="awards-icon" src={require("../../resources/images/awards.png")} />
                    <h4>Award</h4>
                </div>

                <div className="share footer-div">
                    <img alt="share" className="share-icon" src={require("../../resources/images/share.png")} />
                    <h4>Share</h4>
                </div>

                <div className="save footer-div save-div dontOpenPost" onClick={savePost} id={post.saved ? "saved" : "save"}>
                    <img alt="save" className="save-icon" src={require(`../../resources/images/${post.saved ? "saved" : "save"}.png`)} />
                    <h4>{post.saved ? "Unsave" : "Save"}</h4>
                </div>

                <div className="more footer-div">
                    <img alt="more" className="more-icon" src={require("../../resources/images/moregrey.png")} />
                </div>

                {currentPost === undefined ? null : <div className="people">
                    <p className="people-count">{viewers} people here</p>
                    <img alt="people" className="people-icon" src={require("../../resources/images/people.png")} />
                </div>}
            </div>
        </div>
        </div>

        {currentPost === undefined ? null : <div className="lower">
            <Comments 
              userName={userName}
              currentSub={currentSub}
              mainComment={mainComment}
              writeComment={writeComment}
              currentPost={currentPost}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              navToProfile={navToProfile}
              navToUserProfile={navToUserProfile}
            />
        </div>}
    </div>
  );
}
