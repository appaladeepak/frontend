// Imports
import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
// Type Imports
import { Post, Subreddit, Comment } from '../../types/types';
// SVG Imports
import { ReactComponent as Dropdown } from "../../resources/images/dropdown.svg";
// Component Imports
import EditComment from '../EditComment/EditComment';
import PostedComment from '../PostedComment/PostedComment';
// CSS Imports
import './Comments.scss';


export interface CommentsProps {
  userName: string,
  currentSub: Subreddit | undefined,
  mainComment: string,
  randomIntToString: string,
  writeComment: any,
  currentEditedComment: string,
  currentPost: Post,
  loginStatus: boolean,
  writeNestedComment: any,
  editComment: any,
  editNestedComment: any,
  setIndex: Dispatch<SetStateAction<number | undefined>>,
  navToProfile: MouseEventHandler | undefined,
  navToUserProfile: MouseEventHandler | undefined,
  submitNestedComment: MouseEventHandler,
  submitComment: MouseEventHandler,
  handleLikeComment: MouseEventHandler,
  handleNestedComment: MouseEventHandler
}

export default function Comments (props: CommentsProps) {
  const {
    userName,
    currentSub,
    mainComment,
    writeComment,
    currentEditedComment,
    currentPost,
    loginStatus,
    randomIntToString,
    writeNestedComment,
    editComment,
    editNestedComment,
    navToProfile,
    navToUserProfile,
    setIndex,
    submitNestedComment,
    submitComment,
    handleLikeComment,
    handleNestedComment
  } = props;

  // Local state
  const [focussed, setFocussed] = useState(false);
  const [hovered, setHovered] = useState({
    upvote: false,
    downvote: false
  });
  const [boxId, setBoxId] = useState(0);
  const [hoveredComments, setHoveredComments] = useState([
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    }
  ])
  const basicCommentHoverState = [
    {
      upvote: false,
      downvote: false,
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    }
  ];

  // Reset comment hover states on login/logout
  useEffect(() => {
    setHoveredComments(basicCommentHoverState);
  }, [loginStatus])

  // Handle comment hover events
  const handleHoverComment = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const idString = target.classList[0];
    const id = parseInt(idString);
    if (target.id === "upvote") {
        const newHoverState = {
            upvote: !hoveredComments[id].upvote,
            downvote: hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    } else if (target.id === "downvote") {
        const newHoverState = {
          upvote: hoveredComments[id].upvote,
          downvote: !hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    }
  }

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3 className="submit-header">Comment as <span style={{ color: currentSub?.buttonColor }}>{userName !== "" ? userName : "User"}</span></h3>

          <EditComment 
            mainComment={mainComment}
            writeComment={writeComment}
            submitComment={submitComment}
            currentSub={currentSub}
            mainBox={true}
            nested={false}
            edited={true}
            setIndex={setIndex}
            editComment={editComment}
            editNestedComment={editNestedComment}
            boxId={boxId}
            setBoxId={setBoxId}
            randomIntToString={randomIntToString}
          />
        </div>

        <div className="comment-list">
          <div className="sorter">
            <h3 style={{ color: currentSub?.buttonColor }}>Sort By: Best</h3>
            <Dropdown 
              fill={currentSub?.buttonColor}
              className="dropdown"
            />
          </div>

          <div className="divider"></div>

          {currentPost.comments.map((comment, i) => {
            return <PostedComment
                     index={i}
                     currentPost={currentPost}
                     userName={userName}
                     mainComment={mainComment}
                     handleHoverComment={handleHoverComment}
                     handleLikeComment={handleLikeComment}
                     handleNestedComment={handleNestedComment}
                     hoveredComments={hoveredComments}
                     commentObj={comment}
                     targetedComment={currentPost.comments[i].nested_comments[0]}
                     writeComment={writeComment}
                     submitComment={submitComment}
                     currentSub={currentSub}
                     nested={false}
                     setIndex={setIndex}
                     writeNestedComment={writeNestedComment}
                     submitNestedComment={submitNestedComment}
                     currentEditedComment={currentEditedComment}
                     editComment={editComment}
                     editNestedComment={editNestedComment}
                     boxId={boxId}
                     setBoxId={setBoxId}
                     randomIntToString={randomIntToString}
                     navToUserProfile={navToUserProfile}
                     navToProfile={navToProfile}
                    />
          })}
        </div>
    </div>
  );
}
