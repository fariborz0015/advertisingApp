
import React, { useEffect } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import loadable from '@loadable/component'
import { Route } from 'react-router-dom';
import * as Actions from './Actions'
import axios from 'axios';
// import Islogin from './Components/Islogin';




// loadable Component with @Loadable

const LoginCMP = loadable(() => import('./Components/Login/Login'));
const Landing = loadable(() => import('./Components/Landing/Landing'));



function App(props) {

  const history = useHistory();
  const myStorage = window.localStorage;
  const user = props.user_info;
  // const previousFooRef = useRef(props.foo);

  useEffect(() => {

    let api_token = myStorage.getItem('api_token')

    if (api_token) {
      props.dispatch(Actions.loadingAction(true));
      axios.post('http://laravelapi.dct-roosh-hirkan.ir/api/userinfos', null, {
        headers: {
          Authorization: `Bearer ${api_token}`
        }
      })
        .then(res => {
          props.dispatch(Actions.profileAction(
            {
              ...res.data.Data.items,

            }
          ))
          props.dispatch(Actions.loadingAction(false));
        })
        .catch(error => {

          props.dispatch(Actions.loadingAction(false));
          props.dispatch(
            Actions.profileAction(
              {

                login: false,
              }
            )
          )
        }
        )
    }




  }, [])


  if (user.login === true) {
    history.push(props.path)
  } else {
    history.push('/')
  }







  return (
    <>


      <Switch>

        {/* login route page */}
        <Route path="/" exact component={LoginCMP} />
        {/* importing the home landing and profile root  */}
        <Landing />
        {/* end landing import */}

      </Switch>





    </>
  );


}

let mapStatesToProps = (states) => {
  return {
    user_info: states.LOGIN_reducer.user_info,
    path: states.REDIRECT_reducer.path,
  }
}
export default connect(mapStatesToProps)(App)
