import { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css'

const Uploads = (props) => {
    const [allCodes, setAllCodes] = useState([]);
    useEffect(() => {
        const authorId = props.authorId;
		const populate = async () => {
			try{
				const response = await axios.post('/uploads',{authorId});
				console.log("Uploads",response);
				setAllCodes(response.data);
			} catch(error) {
				console.log(error.response);
			}
		}
		populate();
    },[props.authorId]);

    const copyToClipboard = async (code) => {
        try{
            await navigator.clipboard.writeText(code);
            window.alert("Code Copied!");
        } catch(err){
            console.log(err);
        }
    }

    const deleteUpload = async (codeId) => {
        try{
            await axios.post('/deleteupload',{codeId});
            window.alert("Code deleted");
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="container">
            {
                allCodes.map((current, i) => {
                    return(
                        <div className="mb-4 row justify-content-center" key={i}>
                            <div className="card text-center code-card">
                                <iframe title="output" className="card-img-top mt-2" src={"data:text/html;charset=utf-8,"+encodeURI(current.code)} />
                                <div className="card-body">
                                    <h5 className="card-title">{current.authorName}</h5>
                                    <p className="card-text">{current.authorEmail}</p>
                                    <div>
                                        <button className="btn btn-primary non-reactive me-2"
                                            onClick={()=>copyToClipboard(current.code)}
                                        >
                                        Copy&nbsp;code
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteUpload(current._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Uploads;