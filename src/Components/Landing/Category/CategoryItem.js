
import {Link } from 'react-router-dom';
function CategoryItem(props) {

    
    return (

        <Link to="/list/dddd" className="category-item-link">
            <li className="category-item">
                <i className="fas fa-briefcase"></i>
            </li>
            <span> استخدامی</span>
        </Link>


    )
}


export default CategoryItem