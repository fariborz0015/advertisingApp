
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux'
function Sidebar(props) {

    useEffect(() => {
        let activeNav = document.querySelector('.side-bar-list-item.active');
        if (activeNav) {
            let Arrow = document.querySelector('.arrow');
            Arrow.style = `top:${activeNav.offsetTop - 15}px`;
        }
    }, [])

    let ArrowOffsetHandel = (e) => {
        let Arrow = document.querySelector('.arrow');
        let item = e.target
        Arrow.style = `top:${item.offsetTop - 15}px`;

        //this line of code do unactive the side bar after 500  after changing route
        setTimeout(() => {
            document.querySelector('.btn.text-primary.side-btn.nofocus.active').classList.toggle('active');
        }, 500)
    }

    let LogoutHandler = () => {

        let myStorage = window.localStorage;
        myStorage.removeItem('USET_INFOS');
        props.dispatch({
            type: 'LOGOUT_ACT',
            user_info: {
                name: null,
                login: false,
                phone: null

            }
        })

    }


    return (
        <div className="side-bar bg-them">

            <ul className="side-bar-list">
                <NavLink className="side-bar-list-item" activeClassName="active" to="/home" onClick={e => ArrowOffsetHandel(e)}>
                    <span className="fa fa-home"></span>
                </NavLink>
                <NavLink className="side-bar-list-item" activeClassName="active" to="/profile" onClick={e => ArrowOffsetHandel(e)}>
                    <span className="fa fa-user"></span>
                </NavLink>
                <a href="#/" className="side-bar-list-item text-danger" onClick={e => LogoutHandler()}>
                    <span className="fa fa-power-off"></span>
                </a>
                <span className=" arrow fas fa-caret-right"></span>
            </ul>
        </div>

    )
}



let mapStateToProps = (state) => {
    return {
        ...state,
        user_info: state.LOGIN_reducer.user_info
    }
}


export default connect(mapStateToProps)(Sidebar);