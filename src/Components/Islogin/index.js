import axios from "axios";
import { connect } from "react-redux";
import * as Actions from "../../Actions";



function Islogin(props) {


    const myStorage = window.localStorage;
    const api_token = myStorage.getItem('api_token');

    if (!api_token) {
        return false;
    } else {

        axios.post('/userinfos', null, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then((response) => {
                if (response.data.Data.items.login) {
                    props.dispatch(Actions.loginAction(response.data.Data.items))
                    return true
                } else {
                    return false
                }
            })
            .catch((error) => {
                return false
            })


    }

}

let mapStateToProps=(state) =>{
    return{
        ...state,
        user_infos:state.LOGIN_reducer.user_info,
    }
}
export default connect(mapStateToProps)(Islogin);