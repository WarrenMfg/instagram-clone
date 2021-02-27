import React, { useState } from 'react';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

function Comments({ docId, allComments, posted, commentInputRef }) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className='p-4 pt-1 pb-4'>
        {comments.length > 3 && (
          <p className='text-sm text-gray-500 mb-1 cursor-pointer'>
            View all {comments.length} comments
          </p>
        )}

        {comments.slice(0, 3).map(item => (
          <p key={`${item.comment}-${item.displayName}`} className='mb-1'>
            <Link to={`/p/${item.displayName}`}>
              <span className='mr-1 font-bold'>{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}

        <p className='text-gray uppercase text-xs mt-2'>
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInputRef={commentInputRef}
      />
    </>
  );
}

export default Comments;
