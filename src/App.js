
import React, { useEffect ,useRef} from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import loadable from '@loadable/component'
import {  Route } from 'react-router-dom';
import * as Actions from'./Actions'




// loadable Component with @Loadable

const LoginCMP = loadable(() => import('./Components/Login/Login'));
const Landing = loadable(() => import('./Components/Landing/Landing'));



function App(props) {


  const history = useHistory();
  const myStorage = window.localStorage;
  const user = props.user_info;
  // const previousFooRef = useRef(props.foo);
  useEffect(() => {
    let data = JSON.parse(myStorage.getItem('USET_INFOS'))
    if (data) {
      props.dispatch(Actions.loginAction(data))
    }
  },[])

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
