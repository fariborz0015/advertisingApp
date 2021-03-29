import { connect } from 'react-redux'
import * as Actions from './../../Actions/'
 
import { useForm } from "react-hook-form";
import { FromError } from './../../plugins/Helper/Helper'
import 'react-toastify/dist/ReactToastify.css';
function Login(props) {


 
    const myStorage = window.localStorage;
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        myStorage.setItem('USET_INFOS', JSON.stringify({
            name: data.name,
            phone: data.phone,
            login: true
        }))
        props.dispatch(Actions.loginAction({
            name: data.name,
            phone: data.phone,
            login: true
        }))
    
         
    }
















    return (

        <>
            <div className="login-page h-100 w-100   " >

                <form action="" className="form-box" onSubmit={handleSubmit(onSubmit)}>
                    <a className="login-logo" href="#ss">

                    </a>
                    <div className="login-inputs">
                        <div className="form-group my-2">
                            <input ref={register({ required: true, pattern: /^[\u0600-\u06FF\s]+$/, minLength: 3 })} type="text" name="name" className="form-control rtl nofocus  " placeholder="نام و نام خانوادکی " />
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

            </div>


        </>

    )





}

let mapStateToProps = (states) => {
    return {
        user_info: states.LOGIN_reducer.user_info,
    }
}

export default connect(mapStateToProps)(Login)