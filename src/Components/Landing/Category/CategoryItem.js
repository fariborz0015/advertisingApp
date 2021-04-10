
import {Link } from 'react-router-dom';
function CategoryItem(props) {

    let item=props.item;
    
    return (

        <Link to={`/list/${item.id}`} className="category-item-link">
            <li className="category-item">
                <i className={item.icon}></i>
            </li>
            <span> {item.name}</span>
        </Link>


    )
}


export default CategoryItem