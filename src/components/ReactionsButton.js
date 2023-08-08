import React from 'react';
import { reactionsAdded } from '../redux/features/posts/postsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ReactionsButton = ({post}) => {
    const dispatch = useDispatch();

    const reactionEmoji = {
        thumbsUp: "👍🏽",
        wow: "😲",
        love: "🩷",
        dislike: "👎🏽",
        sad: "😢",
        hot: "🥵",
    }
    
    const reactionBtn = Object.entries(reactionEmoji).map(([name,emoji]) => {
        return (
            <button key={name} type='button' className='reactionButton' onClick={() => {
                dispatch(reactionsAdded({postId: post.id, reaction: name }))
            }}>
                {emoji} {post.reactions[name]} &nbsp; &nbsp;
            </button>
        )
    });
    
  return (
    <div>
      {reactionBtn}
    </div>
  )
}

export default ReactionsButton
