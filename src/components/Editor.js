import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import axios from 'axios';
import './Editor.css';

const Editor = (props) => {

    const [code, setCode] = useState("<html>\n\n<head>\n\n</head>\n\n<body>\n\n</body>\n\n</html>");
    const [srcHtml, setHtml] = useState();
    
    const highlighter = useRef(null);

    useEffect(() => {
        Prism.highlightAll();
    },[code]);

    const handleEditor = (event) => {
        setCode(event.target.value);
    }

    const syncScroll = (event) => {
        highlighter.current.scrollTop = event.target.scrollTop;
        highlighter.current.scrollLeft = event.target.scrollLeft;
    }

    const execute = () => {
        setHtml("data:text/html;charset=utf-8," + encodeURI(code));
    }

    const uploadCode = async (e) => {
        try{
            const payload = {
                code: code,
                authorId: props.userData.id,
                authorName: props.userData.name,
                authorEmail: props.userData.email
            };
            const response = await axios.post('/upload',payload);
            console.log(response)
            window.alert(response.data.message);
        } catch(error){
            console.log(error.response);
            window.alert(error.response.data.error);
        }
    }

    return (
        <section>
        <div className="container">
            <div className="row my-1">
                <nav className="nav">
                    <button className="btn btn-primary non-reactive me-2" onClick={execute}>RUN</button>
                    <button className="btn btn-primary non-reactive" onClick={uploadCode}>SUBMIT</button>
                </nav>
            </div>
            <div className="row my-2 user-code">
                <textarea className="editor-input " spellCheck="false" 
                onChange={ handleEditor } 
                onScroll={ syncScroll } 
                value={ code } 
                />
                <pre className="highlighter" ref={highlighter}>
                    <code className="language-html">
                        {code}
                    </code>
                </pre>
            </div>
            <div className="row my-2">
                <iframe title="output" className="htmlOutput" src={ srcHtml } />
            </div>                   
        </div>
        </section>
    );
}

export default Editor;