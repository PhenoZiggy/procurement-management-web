import React, { useEffect, useState } from 'react';
import firebaseUpload from '../utils/firebaseUpload';

const Test = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
  const [percentage, setPercentage] = useState();

  function handleChange(e) {
    const newFiles = [];
    for (let j = 0; j < event.target.files.length; j++) {
      newFiles.push(event.target.files[j]);
    }
    setFile(newFiles);
  }

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      toast('Please Select a File');
    }
    await firebaseUpload(file, setPercentage, setURL, 'user');
  };
  useEffect(() => {
    console.log(url);
  }, [url]);

  useEffect(() => {
    console.log(percentage);
  }, [percentage]);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} multiple />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );
};

export default Test;
