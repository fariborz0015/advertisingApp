import axios from "axios"
import React, { useEffect, useState } from "react";
import jalali from 'jalali-moment';
import { connect } from "react-redux";
import * as Actions from './../Actions';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadable from "@loadable/component";


const HasErrorComp=loadable(() => import('./../Components/HasErrorComp/HasErrorComp'));

function Single(props) {


    const [itemInfo, itemInfoSet] = useState({ advers: {}, user: {} });
    const [phoneshow, phoneshowSet] = useState(false)
    const [hasError, hasErrorSet] = useState(false)
    const Token = props.match.params.adId;
    const api_token = window.localStorage.getItem('api_token');

    useEffect(() => {

        props.dispatch(Actions.loadingAction(true));
        axios.post('http://laravelapi.dct-roosh-hirkan.ir/api/single', { token: Token }, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        }
        ).then((response) => {
            props.dispatch(Actions.loadingAction(false));
            itemInfoSet(response.data);
        })
            .catch(err => {
                hasErrorSet(true)
                toast.error('خطا در دریافت اطلاعات ', { position: "top-center" });
                props.dispatch(Actions.loadingAction(false));
            })


    }, [])

    return (

        <>
            {
                hasError ?
                    <HasErrorComp />
                    :
                    <div className="w-100 my-3">

                        <div className="Post-image p-2  overflow-hidden">
                            <LazyLoadImage effect="blur" src={itemInfo.advers.image || `./../../img/placeholder.png`} alt="" className="w-100 rounded-3" />
                        </div>

                        <div className="content">
                            <h6 className="w-100 text-right p-2">این یک عنوان فرضی است </h6>
                            <ul className="list-group">
                                <li className="list-group-item rtl text-right border-top-0">
                                    <span className="list-title">
                                        <i className="fal fa-map-marker-alt  px-2  text-primary"></i>
                                    شهر   :
                                </span>

                                    <span className="text-secondary list-answer " > {itemInfo.advers.city || "گنبد کاووس"}   </span>
                                </li>
                                <li className="list-group-item rtl text-right border-top-0">
                                    <span className="list-title">
                                        <i className="fal fa-user  px-2 text-primary   "></i>
                                   فرستنده :
                                </span>

                                    <span className="text-secondary list-answer">  {itemInfo.user.name || "   ناشناس"} </span>
                                </li>
                                <li className="list-group-item rtl text-right border-top-0">
                                    <span className="list-title">
                                        <i className="fal fa-border-all  px-2 text-primary   "></i>
                                   دسته بندی  :
                                </span>

                                    <span className="text-secondary list-answer">  {itemInfo.advers.category_name || "   ناشناس"} </span>
                                </li>

                                <li className="list-group-item rtl text-right border-top-0">
                                    <span className="list-title">
                                        <i className="fal fa-clock px-2  text-primary  "></i>
                                    زمان ارسال  :
                                </span>

                                    <span className="text-secondary list-answer">  {jalali(itemInfo.advers.created_at).locale('fa').fromNow()}</span>
                                </li>

                            </ul>

                            <p className="text-right p-3 ad-detail-text">
                                {itemInfo.advers.details}
                            </p>

                            <div className="d-flex justify-content-around  rtl" >
                                <button className="btn btn-default">
                                    کپی اگهی
                            </button>
                                {
                                    phoneshow ?
                                        <a href={`tel:${itemInfo.user.phone}`} className="btn">
                                            {itemInfo.user.phone}
                                        </a>
                                        :
                                        <button className="btn btn-primary" onClick={() => phoneshowSet(true)}>
                                            شماره تماس
                                </button>
                                }

                            </div>
                        </div>
                        <br />
                        <ToastContainer />
                    </div>

            }
        </>


    )
}
let mapStateToProps = state => (state);
export default connect(mapStateToProps)(Single)