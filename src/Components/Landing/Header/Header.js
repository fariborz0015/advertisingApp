
import Loadable from '@loadable/component'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SideBar = Loadable(() => import('./../Sidebar/Sidebar'));

function Header(params) {

    const [searchStatus, searchStatusSet] = useState(false)
    const history = useHistory()
    let sideBarToggle = (e) => {
        e.target.classList.toggle('active')
    }

    let searchHandel = (e) => {

        if (searchStatus) {

            history.push('/searchPage');
        } else {
            
            e.target.classList.toggle('active')
        }
    }

    let searchInput = (e) => {

        let value = e.target.value;
       
        if (value.length > 0) {
            searchStatusSet(true)
            
        } else {
            searchStatusSet(false)
        }

    }

   
    return (
        <div className="header-bottoms">
            <button className="btn text-primary side-btn nofocus  " onClick={e => sideBarToggle(e)}>
                <i className="dots"></i>
            </button>
            <div className=" d-flex flex-row-reverse ">
                <button className={`btn search-btn nofocus  ${searchStatus?'dosearch active':''}`} onClick={e => searchHandel(e)}>
                    <span className="fa fa-search text-them"></span>
                </button>
                <input type="text" className="form-control search-input  "  onInput={e => searchInput(e)} />


            </div>
            {/* just  side bar  */}
            <SideBar />
            {/* END SideBar */}
        </div>
    )
}


export default Header;