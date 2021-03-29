import loadable from '@loadable/component'

 
const Category = loadable(() => import('./../Components/Landing/Category/Category'));
const BoxList = loadable(() => import('./../Components/Landing/BoxList/BoxList'));

function Home(params) {

    
    return (
        <>
            {/* Category Component */}
            <Category />
            {/* end Category */}

            {/* box list of advertising */}
            <BoxList />
            {/* End BoxList */}
        </>
    )
}


export default Home