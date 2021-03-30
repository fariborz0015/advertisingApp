import loadable from '@loadable/component'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'


const Header = loadable(() => import('./Header/Header'));
// Routes Componentn loadable Component
const Home = loadable(() => import('./../../Routes/Home'));
const Profile = loadable(() => import('./../../Routes/Profile'));
const List_Item = loadable(() => import('./../../Routes/List_Item'));
//end



function Landing(props) {


    const Loading=props.LoadingStatus;
  
    return (

        <div className={`landing-page ${ Loading ?'active':''}`} >
            <div className="LoadingEl"></div>
            {/* Header component */}
            <Header />
            {/* end Header */}
            <div className=" content-container ">
                {/* Home Route be Loade  home page */}
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/list/:CatId" component={List_Item} />
            </div>
        </div>

    )
}

let mapStateToProps=(states)=>{
    return{
        ...states,
        LoadingStatus:states.LOADING_reducer.LoadingStatus,
    }

}
export default connect(mapStateToProps)(Landing)