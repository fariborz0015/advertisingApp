


import { useForm } from "react-hook-form";
import { FromError } from './../../plugins/Helper/Helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import * as Actions from './../../Actions/'
import LoginApi from './../../Api/LoginApi';




function LoginForm(props) {


    const myStorage = window.localStorage;
    //detect form validation hooks 
    const { register, handleSubmit, errors } = useForm();

    //if form submit successfully will be run this function
    const onSubmit = data => {

        //active the loading  
        props.dispatch(Actions.loadingAction(true));

        //send user datas to firbase databse
        LoginApi.post('/Login', data)

            .then(response => {
              
              
                myStorage.setItem('api_token', response.data.Data.items.api_token);
                
                props.verifySet(true);
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