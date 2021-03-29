
export const FromError = (object) => {

    let name = object.inputname;
    let minlength = object.minLength ? object.minLength :'';
     
    if (object.refrence) {
        switch (object.refrence.type) {
            case 'required':

                return `${name} اجباری می باشد `
            case 'pattern':

                return `${name}    معتبر نمی باشد    `
     
            case 'minLength':
               
                return `${name}  باید بیشتر از ${minlength} کاراکتر باشد     `
     

            default:
                break;
        }
    }


}