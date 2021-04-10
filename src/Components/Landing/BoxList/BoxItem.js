import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import jalali from 'jalali-moment';
import {Link} from 'react-router-dom';
function BoxItem(props) {

     
    return (
        <Link className="box-item" to={`/single/${props.item.id}`} id={`ADN_${props.item.id}`}>
            <div className="img-box">
                <LazyLoadImage   effect="blur" src={props.item.image?props.item.image:`/./img/placeholder.png`} className="w-100 h-100" alt="" />
            </div>
            <div className="box-text">
                <h6 className="box-title"> {  props.item.title ?   props.item.title : 'این یک عنوان فرضی است '} </h6>
                <p className="box-caption">
                    {
                        props.item.details ?
                        props.item.details.substr(0,50)
                            : ' این یک متن فرضی است برای نمایش چگونگی جایگیری کلمات در قاب های ایجاد شده .... '
                    }
                </p>
            </div>
            <div className="box-details">
                <span className="box-time text-secondary">
                    <i className="far fa-clock text-dark"></i>
                    <span> {jalali(props.item.created_at).locale('fa').fromNow()}</span>

                </span>
                <span className="box-location text-secondary">
                    <i className="fas fa-map-marker-alt  text-dark"></i>
                    <span className="mx-2">{props.item.city?props.item.city:'نامشخص'}</span>
                </span>
            </div>


        </Link>

    )
}


export default BoxItem