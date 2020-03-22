import React, { useEffect, useState } from "react";
import "./Feed.css";
import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";
import api from "../services/api";
import io from "socket.io-client";

const Feed = props => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    (async () => {
      const socket = io("http://localhost:3333");
      socket.on("post", newPost => {
        setFeed(feed => [newPost, ...feed]);
      });
      socket.on("like", likedPost => {
        setFeed(feed =>
          feed.map(post => (post._id === likedPost._id ? likedPost : post))
        );
      });

      const response = await api.get("posts");
      setFeed(response.data);
    })();
  }, []);

  return (
    <section id="post-list">
      {feed.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>
            <img src={more} alt="Mais" />
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} />
          <footer>
            <div className="actions">
              <button
                type="button"
                onClick={() => {
                  api.post(`/posts/${post._id}/like`);
                }}
              >
                <img src={like} alt="" />
              </button>

              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>
            <strong>{post.likes} curtidas</strong>
            <p>
              {post.description}
              <span>{post.hashtagas}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
};

export default Feed;
