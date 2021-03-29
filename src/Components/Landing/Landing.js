import loadable from '@loadable/component'
import { Route } from 'react-router-dom'
const Header = loadable(() => import('./Header/Header'));

// Routes Componentn loadable Component
const Home = loadable(() => import('./../../Routes/Home'));
 
const Profile = loadable(() => import('./../../Routes/Profile'));
//end
function Landing(params) {

 

    return (

        <div className="landing-page">
            {/* Header component */}
            <Header />
            {/* end Header */}
            <div className=" content-container ">
                {/* Home Route be Loade  home page */}
                <Route path="/home" component={Home} />
                <Route path="/profile"  component={Profile} />
            </div>
        </div>

    )
}

export default Landing