import React, {useState} from 'react';
import {createWorker} from "tesseract.js";

// this might be a custom hook for converting text 
const Convertion = () => {
    const [text, setText] = useState();

    const worker = createWorker({
      logger: (m) => console.log(m),
  });
  
  const onImageUpload = async (imageUrl) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
        data: {
            text
        },
    } = await worker.recognize(imageUrl);
    setText(text);
    console.log(text)
    await worker.terminate();
  };
    return ( <div>
        <button onClick={onImageUpload}>
            Convert
        </button>
<p> No idea what this is {text}</p>
    </div> );
}
 
export default Convertion;