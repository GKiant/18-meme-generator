import { useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [text, setText] = useState({
    topText: "",
    bottomText: "",
    errorText: "",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
      } catch (error) {
        setText((prevText) => ({
          ...prevText,
          errorText: `O-oh, we have "${error}" in the house`,
        }));
      }
    }
    getMemes();
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setText((prevText) => ({
      ...prevText,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={text.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={text.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        {text.errorText && <h2>{text.errorText}</h2>}
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{text.topText}</h2>
        <h2 className="meme--text bottom">{text.bottomText}</h2>
      </div>
    </main>
  );
}
