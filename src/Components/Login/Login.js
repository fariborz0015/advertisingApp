import { connect } from 'react-redux'
import { useState } from 'react'
import * as Actions from './../../Actions/'
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { FromError } from './../../plugins/Helper/Helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(props) {


    //get loading status from props 
    const loading = props.loading;
    //select th local storage
    const myStorage = window.localStorage;
    //detect form validation hooks 
    const { register, handleSubmit, errors } = useForm();

    const [verifyStatus, verifyStatusSET] = useState(false)
    const [veifyCode, veifyCodeSet] = useState(null)
    //if form submit successfully will be run this function
    const onSubmit = data => {

        //active the loading for login action
        props.dispatch(Actions.loadingAction(true))
        //send user datas to firbase databse
        Axios.post('https://todoapp-93566-default-rtdb.firebaseio.com/users.json', data).then(response => {

            //set the datas in local storage
            myStorage.setItem('USET_INFOS', JSON.stringify({
                name: data.name,
                phone: data.phone,
                key: response.data.name,
                login: false
            }))
            // do login action with redux dispatch
            props.dispatch(Actions.loginAction({
                name: data.name,
                phone: data.phone,
                key: response.data.name,
                login: false
            }))
            //after all actions unactiving the loading
            props.dispatch(Actions.loadingAction(false))
            verifyStatusSET(true);
            let code = Math.floor(1000 + Math.random() * 9000);
            veifyCodeSet(Math.round(code))
            toast.success(`شبیه ساز اس ام اس - کدشما : ${code}`, { position: "top-center" })
        })

            //if ajax action will be failed will show a message//
            .catch(err => {
                //show notif 
                toast.error('خطا در ارسال اطلاعات ', { position: "top-center" })
                //un active loading
                props.dispatch(Actions.loadingAction(false))

            })

    }

    const verifysubmit = data => {

        if (data.verify == veifyCode) {
            //set the datas in local storage
            myStorage.setItem('USET_INFOS', JSON.stringify({
                ...props.user_info,
                login: true
            }))
            // do login action with redux dispatch
            props.dispatch(Actions.loginAction({
                ...props.user_info,
                login: true
            }))
        } else {
            toast.error('  کد تایید هویت صحیح نمیباشد ', { position: "top-center" })
        }
    }


    return (

        <>

            {/* f the load status on this line is true, it adds the active class to show the load, otherwise no load is shown  */}
            <div className={`login-page h-100 w-100 ${loading ? 'active' : ''} `} >
                <div className="LoadingEl"></div>
                {/* if form submited , it run the handleSubmit func */}
                <form action="" className="form-box" onSubmit={verifyStatus ? handleSubmit(verifysubmit) : handleSubmit(onSubmit)}>
                    <a className="login-logo" href="#ss">

                    </a>
                    <div className="login-inputs">

                        {
                            !verifyStatus ?

                                <>


                                    <div className="form-group my-2">
                                        {/* input value validation by form hooks  */}
                                        <input ref={register({ required: true, pattern: /^[\u0600-\u06FF\s]+$/, minLength: 3 })} type="text" name="name" className="form-control rtl nofocus  " placeholder="نام و نام خانوادکی " />
                                        {/* error showing  */}
                                        <small className="text-danger">
                                            {errors.name && FromError({
                                                refrence: errors.name,
                                                inputname: "نام و نام خانوادگی",
                                                minLength: 3
                                            })}

                                        </small>
                                    </div>

                                    <div className="form-group my-2">
                                        <input ref={register({ required: true, pattern: /^(\+98|0)?9\d{9}$/ })} type="text" name="phone" className="form-control rtl nofocus  " placeholder="شماره موبایل  " />
                                        <small className="text-danger">
                                            {errors.phone && FromError({
                                                refrence: errors.phone,
                                                inputname: "شماره مبایل "
                                            })}
                                        </small>
                                    </div>


                                </>
                                :
                                <div className="form-group my-2">
                                    <input ref={register({ required: true })} type="text" name="verify" className="form-control rtl nofocus  " placeholder=" کد تایید هویت  " />
                                    <small className="text-danger">
                                        {errors.phone && FromError({
                                            refrence: errors.phone,
                                            inputname: " کد ارسالی "
                                        })}
                                    </small>
                                </div>


                        }
                        <div className="form-group text-center">
                            <button className="btn login-button ">
                                ورود
                      </button>
                        </div>
                    </div>
                </form>

            </div>

            {/* notification shower component */}
            <ToastContainer rtl={true} />

        </>

    )





}

// export redux state as props for functional component by connect
let mapStateToProps = (states) => {
    return {
        ...states,
        user_info: states.LOGIN_reducer.user_info,
        loading: states.LOADING_reducer.LoadingStatus
    }
}

export default connect(mapStateToProps)(Login)