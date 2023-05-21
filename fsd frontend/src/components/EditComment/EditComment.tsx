// Imports
import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
// Type Imports
import { Comment, Subreddit } from '../../types/types';
// CSS Imports
import './EditComment.scss';

export interface EditCommentProps {
    mainComment: string,
    mainBox?: boolean,
    targetedComment?: Comment | undefined,
    index?: number,
    writeComment: any,
    currentEditedComment?: string,
    einhorn?: string,
    commentObj?: Comment,
    randomIntToString: string,
    currentSub: Subreddit | undefined,
    nestedEdited?: boolean,
    nested: boolean,
    edited?: boolean,
    boxId: number | undefined,
    setBoxId: any,
    writeNestedComment?: any,
    editComment: any,
    editNestedComment: any,
    switchNestedEdit?: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    switchEdit?: MouseEventHandler,
    submitNestedComment?: MouseEventHandler,
    handleNestedComment?: MouseEventHandler,
    submitComment: MouseEventHandler,
}

export default function EditComment  (props: EditCommentProps) {
  const {
    mainComment,
    targetedComment,
    index,
    switchNestedEdit,
    boxId,
    setBoxId,
    mainBox,
    randomIntToString,
    commentObj,
    currentEditedComment,
    edited,
    writeComment,
    nested,
    currentSub,
    writeNestedComment,
    editComment,
    editNestedComment,
    nestedEdited,
    setIndex,
    switchEdit,
    handleNestedComment,
    submitNestedComment,
    submitComment
  } = props;

  // Local state
  const [focussed, setFocussed] = useState(false);
  const [isMainBox, setIsMainBox] = useState(false);

  // Set indices for comments
  useEffect(() => {
    if (index !== undefined) {
      setIndex(index);
    }
  }, [index])

  // Set id's for editComment boxes
  useEffect(() => {
    let submitButton = (document.body.getElementsByClassName('submitcomment'))[boxId!];
    if (submitButton === undefined) {
      return;
    }
    if (isNaN(parseInt(submitButton.id))) {
      setIsMainBox(true);
    }
  }, []);

    // Set id's for editComment boxes
  useEffect(() => {
    setBoxId(boxId! + 1);
  }, []);

  return (
    <div className="hoverArea" style={{ marginTop: nested ? "18px" : "5px", marginLeft: nested ? "20px" : "", width: nested ? "608px" : "652px", minWidth: nested ? "608px" : "652px", border: focussed ? "1px solid black" : "1px solid transparent" }}>
      <textarea id={index?.toString()} className="comment-box" style={{ 
        height: nested ? "130px" : "139px", 
        minHeight: nested ? "130px" : "139px" , 
        width: nested ? "608px" : "652px", 
        minWidth: nested ? "608px" : "652px", 
        maxWidth: nested ? "608px" : "652px" }} 
        placeholder="What are your thoughts?" 
        value={nestedEdited ? commentObj?.nested_comments[0].content : nested ? commentObj?.nested_comments[0].content : isMainBox ? mainComment : commentObj?.content} 
        onChange={nestedEdited ? editNestedComment : nested ? (e) => console.log(edited + " " + nested + " " + nestedEdited) : (e) => {e.target.id === "" ? writeComment(e) : editComment(e)}} 
        onFocus={() => setFocussed(true)} 
        spellCheck={false}
        onBlur={() => setFocussed(false)}>
      </textarea>

      <div className="button-bar">
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
      
            {mainBox && (
              <>
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
              </>
            )}
            <button className="text-settings" aria-label="More">
              <img alt="dots" className="setting-icon" src={require("../../resources/images/dots.png")} />
            </button>
        </div>

        <div className="end">
            <button className="markdown btn" id="markdown">
              <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
            </button>

            {mainBox !== true && <button className="markdown btn cancel" onClick={nestedEdited ? commentObj?.nested_comments[0].content.length === 0 ? (e) => {handleNestedComment!(e); switchNestedEdit(e);} : commentObj?.nested_comments[0].hasBeenSubmittedYet ? (e) => {commentObj.nested_comments[0].content = commentObj.nested_comments[0].lastSubmitContent!; commentObj.nesting = "posted";} : (e) => {handleNestedComment!(e); switchNestedEdit(e);} : (e) => {if (commentObj!.lastSubmitContent !== undefined && commentObj !== undefined) {commentObj.content = commentObj?.lastSubmitContent}; switchEdit!(e);}}>
              <p style={{ color: currentSub?.buttonColor }}>Cancel</p>
            </button>}
      
            <button className="markdown submit submitcomment" 
              style={{ 
                backgroundColor: nested ? commentObj!.nested_comments[0].content.length >= 1 ? currentSub?.buttonColor : "#9a9a9a" : isMainBox ? mainComment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a" : boxId! >= 1 ? commentObj!.content.length >= 1 ? currentSub?.buttonColor : "#9a9a9a" : mainComment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a", 
                color: nested ? commentObj!.nested_comments[0].content.length >= 1 ? "white" : "#cdcdcd" : isMainBox ? mainComment.length >= 1 ? "white" : "#cdcdcd" : boxId! >= 1 ? commentObj!.content.length >= 1 ? "white" : "#cdcdcd" : mainComment.length >= 1 ? "white" : "#cdcdcd", 
                cursor: nested ? commentObj!.nested_comments[0].content.length >= 1 ? "pointer" : "not-allowed" : isMainBox ? mainComment.length >= 1 ? "pointer" : "not-allowed" : boxId! >= 1 ? commentObj!.content.length >= 1 ? "pointer" : "not-allowed" : mainComment.length >= 1 ? "pointer" : "not-allowed" 
              }} 
                onClick={nestedEdited ? commentObj!.nested_comments[0].content.length >= 1 ? submitNestedComment : (e) => {} : isMainBox ? mainComment.length >= 1 ? (e) => {submitComment(e);} : (e) => {} : boxId! >= 1 ? commentObj!.content.length >= 1 ? (e) => {submitComment(e); switchEdit!(e);} : (e) => {} : mainComment.length >= 1 ? (e) => {submitComment(e);} : (e) => {}} 
                id={`${index}`}
              >
              <p>Comment</p>
            </button>
        </div>
      </div>
    </div>
  );
}
