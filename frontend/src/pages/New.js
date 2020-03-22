import React, { useState } from "react";
import "./New.css";
import api from "../services/api";

const New = props => {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  return (
    <form
      id="new-post"
      onSubmit={async e => {
        e.preventDefault();

        const data = new FormData();

        data.append("image", image);
        data.append("author", author);
        data.append("place", place);
        data.append("description", description);
        data.append("hashtags", hashtags);

        await api.post("posts", data);

        props.history.push("/");
      }}
    >
      <input
        type="file"
        onChange={e => {
          setImage(e.target.files[0]);
        }}
        files={image}
      />
      <input
        type="text"
        name="author"
        placeholder="Autor do Post"
        value={author}
        onChange={e => {
          setAuthor(e.target.value);
        }}
      />
      <input
        type="text"
        name="place"
        placeholder="Local do Post"
        value={place}
        onChange={e => {
          setPlace(e.target.value);
        }}
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição do Post"
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        name="hashtag"
        placeholder="Hashtags do Post"
        value={hashtags}
        onChange={e => {
          setHashtags(e.target.value);
        }}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default New;
