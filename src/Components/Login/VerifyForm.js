


import { useForm } from "react-hook-form";
import { FromError } from './../../plugins/Helper/Helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux'

import * as Actions from './../../Actions/'
import LoginApi from './../../Api/LoginApi';




function LoginForm(props) {

    //detect form validation hooks 
    const { register, handleSubmit, errors } = useForm();
    //select local storage
    const myStorage = window.localStorage;
    //if form submit successfully will be run this function
    const onSubmit = data => {

        //active the loading  
        props.dispatch(Actions.loadingAction(true));


        data.api_token = myStorage.getItem('api_token');

        //send user datas to firbase databse
        LoginApi.post('/verifyCode', data)

            .then(response => {
                if (response.data.status !== 'success') {
                    toast.error(response.data.Data.message, { position: "top-center" })
                } else {
                    let user_data = response.data.Data.items;
                    user_data.login = true;
                    myStorage.setItem('USET_INFOS', JSON.stringify(user_data));
                    props.dispatch(Actions.loginAction(user_data));
                    props.dispatch(Actions.loginAction(user_data));
                }

                //unactiving the loading
                props.dispatch(Actions.loadingAction(false))
            })

            //if ajax action will be failed will show a message//
            .catch(err => {
                //show notif 
                toast.error('خطا در ارسال اطلاعات ', { position: "top-center" })
                //un active loading
                props.dispatch(Actions.loadingAction(false))

            })

    }



    return (
        <>
            <form action="" className="form-box" onSubmit={handleSubmit(onSubmit)}>
                <a className="login-logo" href="#ss">

                </a>
                <div className="login-inputs">

                    <div className="form-group my-2">
                        {/* input value validation by form hooks  */}
                        <input ref={register({ required: true })} type="text" name="verifycode" className="form-control rtl nofocus  " placeholder=" کد اعتبار سنجی" />
                        {/* error showing  */}
                        <small className="text-danger">
                            {errors.name && FromError({
                                refrence: errors.name,
                                inputname: " کد اعتبار سنجی ",
                                minLength: 3
                            })}

                        </small>
                    </div>


                    <div className="form-group text-center">
                        <button className="btn login-button ">
                            ورود
                     </button>
                    </div>
                </div>
            </form>

            <ToastContainer />
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
export default connect(mapStateToProps)(LoginForm)