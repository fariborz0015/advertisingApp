import React, { useState, useEffect } from 'react';


function ImagePreviwe(props) {

    const [ImageSplash, ImageSplashSet] = useState(false);

    let imagePreviewHandler = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            ImageSplashSet(reader.result)

        }


    }

    useEffect(() => {
         if(props.Reset==true) {
            ImageSplashSet(null)
         }
    }, []);



    return (
        <div className="avatar-box text-right">
            <label htmlFor="avatar_input" className="avatar-label" style={{ width: '91%', height: 'unset' }}>
                <img src={ImageSplash ? ImageSplash : `./img/placeholder.png`} className="w-100" alt="" />
            </label>
            {
                ImageSplash ?
                    <div className="w-100 m-2">
                        <span className="text-primary ">
                            فقط جهت نمایش
                </span>
                        <button className="btn btn-danger m-2" onClick={e => ImageSplashSet(false)}>
                            <span className="fa fa-trash"></span>
                        </button>
                    </div>
                    :
                    null
            }

            <input type="file" ref={props.inputref} onChange={e => imagePreviewHandler(e)}   name="image" className="visually-hidden" id="avatar_input" placeholder="" />
        </div>

    )

}



export default ImagePreviwe;