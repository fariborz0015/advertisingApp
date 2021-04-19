
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import * as Actions from './../Actions'
import { FromError } from './../plugins/Helper/Helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UploadApi, api_token } from './../Api/UploadApi';
import axios from 'axios';


function Profile(props) {


    const myStorage = window.localStorage;
    const { register, handleSubmit, errors } = useForm();


    const onSubmit = data => {

        axios.post('/profileUpdate', data ,{
            headers:{
                Authorization:`Bearer ${api_token}` 
            }
        })
        .then(res=>{
            props.dispatch(Actions.profileAction({...res.data.Data.items,login:true}));
            props.dispatch(Actions.redirectAction('/profile'));
            toast.success(`پروفایل شما به درستی تغییر یافت`, { position: "top-center" })
        })
        .catch(err => {
            toast.error(err.response.message, { position: "top-center" })
        })
        props.dispatch(Actions.loadingAction(false));
       
    }
    const user = props.user_info;



    let AvatarHandler = e => {
        props.dispatch(Actions.loadingAction(true));
        let avatar=e.target.files[0];
        let formdata=new FormData();
        formdata.append('avatar',avatar);

        UploadApi.post('/avatar',formdata)
        .then(res=>{

            if(res.data.status!=='success'){
                toast.error(res.data.Data.message, { position: "top-center" });
                props.dispatch(Actions.loadingAction(false));
                Object.keys(res.data.Data.errors).map(function (key) {
                    toast.warning(res.data.Data.errors[key][0], { position: "top-center" });
                });
            }else{
                props.dispatch(Actions.profileAction({...user,avatar:res.data.Data.items.avatar_url}));
                props.dispatch(Actions.redirectAction('/profile'));
                props.dispatch(Actions.loadingAction(false));
                toast.success(res.data.Data.message, { position: "top-center" })
            }
           
        })
        .catch(err => {
            toast.error(err.response.data.Data.message, { position: "top-center" })
        })
    }



    return (



        <form className="w-100 profile-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="avatar-box text-right">
                <label htmlFor="avatar_input" className="avatar-label">
                    <img src={user.avatar ? user.avatar : `./img/placeholder.png`} alt="" />
                </label>
                <input type="file" onChange={e => AvatarHandler(e)} name="avatar" className="visually-hidden" id="avatar_input" placeholder="" />
            </div>
            <div className="w-100 px-4">

                <br />


                <div className="form-group mb-3 ">
                    <label className="mb-2">   :   نام و نام خانوادگی </label>
                    <input ref={register({ required: true, pattern: /^[\u0600-\u06FF\s]+$/, minLength: 3 })} type="text" defaultValue={user.name} className="form-control nofocus" name="name" placeholder=" نام و نام خانوادگی " />
                    <small className="text-danger">
                        {errors.name && FromError({
                            refrence: errors.name,
                            inputname: "نام و نام خانوادگی",
                            minLength: 3
                        })}

                    </small>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">: شماره موبایل </label>
                    <input ref={register({ required: true, pattern: /^(\+98|0)?9\d{9}$/ })} type="text" defaultValue={user.phone} className="form-control nofocus" name="phone" readOnly />
                    <small className="text-danger">
                        {errors.phone && FromError({
                            refrence: errors.phone,
                            inputname: "شماره موبایل",

                        })}

                    </small>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">  : شغل  </label>
                    <input ref={register({ required: true, pattern: /^[\u0600-\u06FF\s]+$/, minLength: 3 })} type="text" defaultValue={user.job ? user.job : ''} className="form-control nofocus" id="" name="job" placeholder=" شغل " />

                    <small className="text-danger">
                        {errors.job && FromError({
                            refrence: errors.job,
                            inputname: "شغل",

                        })}

                    </small>
                </div>
                <div className="form-group mb-3 ">
                    <label className="mb-2">  : تاریخ تولد   </label>
                    <input ref={register({ required: true })} type="text" defaultValue={user.birthdate ? user.birthdate : ''} className="form-control nofocus" id="" name="birthdate" placeholder="   تاریخ تولد" />
                    <small className="text-danger">
                        {errors.birthdate && FromError({
                            refrence: errors.birthdate,
                            inputname: "تاریخ تولد",

                        })}
                    </small>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary"> ذخیره تغییرات  </button>


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
        user_info: state.LOGIN_reducer.user_info
    }
}
export default connect(mapStatesToProps)(Profile)