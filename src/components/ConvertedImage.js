import React, { useEffect, useState } from 'react';
import '../styling/Button.css';
import { useNavigate } from 'react-router-dom';

function ConvertedImage({ filter, selectedImage }) {
    const [downloadUrl, setDownloadUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImageAndCreateBlob = async () => {
            try {
                const response = await fetch(`http://localhost:5000/${filter}Image`);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setDownloadUrl(blobUrl);
            } catch (error) {
                console.error(`Error fetching ${filter} image and creating blob:`, error);
            }
        };

        fetchImageAndCreateBlob();
    }, [filter]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="MainPage">
            <header className="App-header">
                <h1>Converted Image</h1>                
                <img className="converted-image" src={downloadUrl} alt="Converted" />                
                <div className="button-container">
                <a href={downloadUrl} download={`${filter}_image.jpg`}>
                        <button className="button-white">Download</button>
                    </a>
                    <button className="button-white" onClick={goBack}>Go Back</button>
                </div>
            </header>
        </div>
    );
}

export default ConvertedImage;
