function BoxItem() {
    return (
        <a className="box-item" href="#ff">
            <div className="img-box">
                <img src="./img/placeholder.png" className="w-100 h-100" alt="" />
            </div>
            <div className="box-text">
                <h6 className="box-title">این یک عنوان از اگهی است </h6>
                <p className="box-caption">
                    و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                </p>
            </div>
            <div className="box-details">
                <span className="box-time text-secondary">
                    <i className="far fa-clock text-dark"></i>
                    <span>  10 ثانیه قبل</span>

                </span>
                <span className="box-location text-secondary">
                    <i className="fas fa-map-marker-alt  text-dark"></i>
                    <span>گنبد کاووس</span>
                </span>
            </div>


        </a>

    )
}


export default BoxItem