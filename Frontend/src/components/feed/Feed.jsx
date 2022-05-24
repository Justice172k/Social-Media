import React from 'react';
import "./Feed.scss"
import Share from '../share/Share';
import Post from '../post/Post';
import Data from "../../dummyData"


const Feed = () => {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {Data.Posts.map((p) => {
                    return <Post key={p.id} post={p} />
                })}
            </div>
        </div>
    );
}

export default Feed;
