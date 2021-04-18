import loadable from '@loadable/component'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import {useRef} from 'react';
import PrivateRoute from '../PrivateRoute';




const Header = loadable(() => import('./Header/Header'));
// Routes Componentn loadable Component
const Home = loadable(() => import('./../../Routes/Home'));
const Profile = loadable(() => import('./../../Routes/Profile'));
const List_Item = loadable(() => import('./../../Routes/List_Item'));
const AddNew = loadable(() => import('./../../Routes/AddNew'));
const MyAdvertises = loadable(() => import('./../../Routes/MyAdvertises'));
const single = loadable(() => import('./../../Routes/single'));
//end



function Landing(props) {

    const container = useRef()
    const Loading = props.LoadingStatus;




   
    return (

        <div className={`landing-page ${Loading ? 'active' : ''}`} >
            <div className="LoadingEl"></div>
            {/* Header component */}
            <Header />
            {/* end Header */}
            <div className=" content-container " id="scrollableDiv">
                {/* Home Route be Loade  home page */}
                <PrivateRoute path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/list/:CatId" component={List_Item} />
                <Route path="/AddNew" component={AddNew} />
                <Route path="/MyAdvertises" component={MyAdvertises} />
                <Route path="/single/:adId" component={single} />
            </div>
        </div>

    )
}

let mapStateToProps = (states) => {
    return {
        ...states,
        LoadingStatus: states.LOADING_reducer.LoadingStatus,
    }

}
export default connect(mapStateToProps)(Landing)