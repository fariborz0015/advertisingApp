
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import * as Actions from './../Actions'
import { FromError } from './../plugins/Helper/Helper'
function Profile(props) {


    const myStorage = window.localStorage;
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        //remove old data from local storage
        let prevLocalStorage = JSON.parse(myStorage.getItem('USET_INFOS'));


        //set the new user info data in local storage
        myStorage.setItem('USET_INFOS', JSON.stringify({
            ...prevLocalStorage,
            name: data.name,
            job: data.job,
            birthDate: data.birthDate,
            login: true
        }))
        //rout path updating | after the change states user backed to this url
        props.dispatch(Actions.redirectAction('/profile'));
        //profile updating 
        props.dispatch(Actions.profileAction({
            ...prevLocalStorage,
            name: data.name,
            job: data.job,
            birthDate: data.birthDate,
            login: true
        }))





    }



    const user = props.user_info;
    return (



        <form className="w-100 profile-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="avatar-box text-right">
                <label htmlFor="avatar_input" className="avatar-label">
                    <img src="./img/placeholder.png" alt="" />
                </label>
                <input type="file" name="avatar" className="visually-hidden" id="avatar_input" placeholder="" />
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
                    <input ref={register({ required: true })} type="text" defaultValue={user.birthDate ? user.birthDate : ''} className="form-control nofocus" id="" name="birthDate" placeholder="   تاریخ تولد" />
                    <small className="text-danger">
                        {errors.birthDate && FromError({
                            refrence: errors.birthDate,
                            inputname: "تاریخ تولد",

                        })}
                    </small>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary"> ذخیره تغییرات  </button>


                </div>


            </div>




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