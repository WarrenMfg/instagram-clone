import React, { useRef } from 'react';
import Actions from './Actions';
import AddComment from './AddComment';
import Comments from './Comments';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';

export default function Post({ content }) {
  const commentInputRef = useRef(null);
  const handleFocus = () => commentInputRef.current.focus();
  return (
    <>
      <div className='rounded col-span-4 border bg-white mb-16'>
        <Header username={content.username} />
        <Image src={content.imageSrc} caption={content.caption} />
        <Actions
          docId={content.docId}
          totalLikes={content.likes.length}
          likedPhoto={content.userLikedPhoto}
          handleFocus={handleFocus}
        />
        <Footer username={content.username} caption={content.caption} />
        <Comments
          docId={content.docId}
          allComments={content.comments}
          posted={content.dateCreated}
          commentInputRef={commentInputRef}
        />
      </div>
    </>
  );
}
