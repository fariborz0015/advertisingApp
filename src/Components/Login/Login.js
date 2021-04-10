import { connect } from 'react-redux'
import { useState } from 'react'
 

import loadable from '@loadable/component'



const LoadinForm = loadable(() => import('./LoginForm'));
const VerifyForm = loadable(() => import('./VerifyForm'));

function Login(props) {


    const [verify, verifySet] = useState(false);
    //get loading status from props 
    const loading = props.loading;




    return (

        <>

            {/* f the load status on this line is true, it adds the active class to show the load, otherwise no load is shown  */}
            <div className={`login-page h-100 w-100 ${loading ? 'active' : ''} `} >
                {/* loading div pack  */}
                <div className="LoadingEl"></div>


                {
                    verify
                        ?
                        <VerifyForm />
                        :
                        <LoadinForm verifySet={verifySet} />
                }



            </div>



        </>

    )





}

// export redux state as props for functional component by connect
let mapStateToProps = (states) => {
    return {
        ...states,

        loading: states.LOADING_reducer.LoadingStatus
    }
}

export default connect(mapStateToProps)(Login)