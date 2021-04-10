function HasErrorComp(){



    return(
        <div className="haserror-conatainer flex-column d-flex justify-content-center align-items-center">
            <img src="./../../svg/deadError.svg" width="50%" alt=""/>
             <h6 className="bg-danger mt-4 p-2 text-light rounded-3">
                 خطا در تبادل اطلاعات
             </h6>
        </div>
    )
}

export default HasErrorComp