import React, {useEffect, useState} from "react";
// import { useHistory } from "react-router-dom";
import './uploadPicture.css'


const UploadPicture = ({setImages, action}) => {
    // const history = useHistory();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [urls, setUrls] = useState([])
    const [urlsValidationErrors, setUrlsValidationErrors] = useState([]);
    const [showImagesErrors, setShowImagesErrors] = useState(false);

    useEffect(() => {
        const errors =[];
        if (urls.length === 0) errors.push("Images are required");
        setUrlsValidationErrors(errors);
    }, [urls])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowImagesErrors(true);
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/businesses/addImages', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            setImageLoading(false);
            const newUrls = [...urls]
            newUrls.push(data.url)
            setUrls(newUrls)
            setImages(newUrls)
            // history.push("/images")
        }
        else {
            setImageLoading(false);
            const data = await res.json();
            // a real app would probably use more advanced
            // error handling
            alert(data.errors)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleRemove = (url) => {
        const newUrls = urls.filter(ele => ele !== url);
        setUrls(newUrls)
        setImages(newUrls)

    }

    return (
        <div>
            <form className="upload-picture-form" onSubmit={handleSubmit}>
                <input
                    id='file-upload'
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />

                <button className="upload-picture-button" type="submit">Add Image</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
            <>
                {(action === 'create') && showImagesErrors && urlsValidationErrors.map((error, idx) => (
                    <li key={idx} className='error'>{error}</li>
                ))}
            </>
            <div className="upload-picture-image-container">
                {urls.map((url) =>
                <div>
                    <img className="upload-picture-image" key={url} alt='' src={url} />
                    <button className="upload-picture-button" onClick={() => handleRemove(url)}>Remove</button>
                </div>

                )}

            </div>
        </div>

    )
}

export default UploadPicture;
