import React, { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

function AddComment({ docId, comments, setComments, commentInputRef }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleSubmitComment = async e => {
    e.preventDefault();

    setComment('');

    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          displayName: user.displayName,
          comment
        })
      });

    setComments([{ displayName: user.displayName, comment }, ...comments]);
  };

  return (
    <div className='border-t border-gray'>
      <form
        className='flex w-full justify-between'
        onSubmit={e => (comment ? handleSubmitComment(e) : e.preventDefault())}
        method='POST'
      >
        <input
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray w-full py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Add a comment...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInputRef}
        />
        <button
          className={`text-sm font-bold text-blue-500 px-5 ${
            !comment && 'opacity-25'
          }`}
          type='submit'
          disabled={!comment.length}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
