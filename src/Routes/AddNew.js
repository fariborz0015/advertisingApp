import React, { useState,useEffect } from 'react';
import * as Actions from './../Actions/index';
import {connect} from 'react-redux';
import { FromError } from './../plugins/Helper/Helper';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImagePreviwe from './../Components/ImagePreviwe/ImagePreviwe';
import axios from 'axios';

function AddNew(props) {

    const myStorage = window.localStorage;
    const api_token = myStorage.getItem('api_token');
    const { register, handleSubmit, errors ,reset} = useForm();
    const Formdata = new FormData();
    const [Reset, ResetSET]=useState();



    const onSubmit = (data, e) => {
        props.dispatch(Actions.loadingAction(true));
        Formdata.append('image', data.image[0]);
        Formdata.append('title', data.title);
        Formdata.append('city', data.city);
        Formdata.append('details', data.details);
        Formdata.append('category', data.category);

        axios.post('http://laravelapi.dct-roosh-hirkan.ir/api/AddAdvertis',
            Formdata,
            {
                headers: {
                    Authorization: `Bearer ${api_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })


            .then(response => {
                
                var Datas = response.data.Data;
                if (response.data.status !== 'success') {
                    toast.error(Datas.message, { position: "top-center" });
                    Object.keys(Datas.errors).map(function (key) {
                        toast.warning(Datas.errors[key][0], { position: "top-center" });
                    });
                } else {


                    toast.success(Datas.message, { position: "top-center" });
                    ResetSET(true)
                }

                props.dispatch(Actions.loadingAction(false));
            })




            .catch(error => {
                props.dispatch(Actions.loadingAction(false));
                toast.error(error.response.message, { position: "top-center" });
            })
           


        e.target.reset();
        


    }

    
    //getting categories
    useEffect(() => {
        props.dispatch(Actions.loadingAction(true));
        axios.get('http://laravelapi.dct-roosh-hirkan.ir/api/category/getAll', {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {

               
                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.GetAllCategory(res.data.Data.items));

            })
            .catch(err => {
                props.dispatch(Actions.loadingAction(false));
            })

    }, [])
    //end


    return (


        <form className="w-100 profile-form" onSubmit={handleSubmit(onSubmit)} >

            {/* preview image upload component */}
          
                <ImagePreviwe Reset={Reset} key={Date.now()} inputref={register} />
               

       

            <div className="w-100 px-4">

                <br />


                <div className="form-group mb-3 ">
                    <label className="mb-2">   :   عنوان موضوع </label>
                    <input ref={register({ required: true, minLength: 3, maxLength: 80 })} type="text" className="form-control nofocus" name="title" placeholder=" تا 80 کاراکتر  " />
                    <small className="text-danger">

                        {
                            errors.title && FromError({
                                refrence: errors.title,
                                inputname: "عنوان موضوع",
                                minLength: 3,
                                maxLength: 80,
                            })
                        }



                    </small>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">: شهر مورد نظر </label>
                    <input ref={register({ required: true, pattern: /^[\u0600-\u06FF\s]+$/, minLength: 3 })} type="text" className="form-control nofocus" name="city" placeholder="مانند : گنبد کاووس" />
                    <small className="text-danger">
                        {errors.city ? errors.city && FromError({
                            refrence: errors.city,
                            inputname: "شهر مورد نظر",

                        }) :
                            <span className="text-secondary mr-2">
                                به فارسی وارد کنید
                           </span>
                        }

                    </small>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">  : دسته بندی   </label>
                    <select className="select-box" name="category" ref={register} id="">
                        {
                            props.categories.map(item=>{
                                return  <option value={item.id}>{item.name}</option>
                            })
                        }
                       
                    </select>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">  : توضیحات   </label>
                    <textarea ref={register({ required: true, minLength: 10 })} className="form-control" name="details" id="" cols="30" rows="10"></textarea>
                    <small className="text-danger">
                        {errors.details && FromError({
                            refrence: errors.details,
                            inputname: "  توضیحات ",
                            minLength: 10

                        })}
                    </small>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">  ثبت اگهی </button>
                </div>


            </div>



            {/* notification shower component */}
            <ToastContainer rtl={true} />
        </form>

    )




}
let mapStatesToProps = (state) => {
    return {
        ...state,
        categories:state.GETCATEGORIES_reducer.Categories
    }
}
export default connect(mapStatesToProps)(AddNew)