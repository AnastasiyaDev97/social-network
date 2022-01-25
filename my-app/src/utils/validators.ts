import {FormDataType} from "../components/Login/Login";
import {ERROR_MESSAGE} from "../enums/ErrorMessages";

export type FormikErrorType = {
    message?: string
    email?:string
    password?: string
    rememberMe?: boolean
    captcha?:string
}

const minPasswordLength=8
const passwordRegex = /(?=.*[0-9])/

export const validateLoginForm = (values: FormDataType, errors: FormikErrorType) => {
    if (!values.email) {
        errors.email = ERROR_MESSAGE.REQUIRED;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = ERROR_MESSAGE.INVALID_EMAIL;
    }
    if (!values.password) {
        errors.password = ERROR_MESSAGE.REQUIRED;
    } else if (values.password.length < minPasswordLength) {
        errors.password = ERROR_MESSAGE.SHORT_PASSWORD;
    } else if (!passwordRegex.test(values.password)) {
        errors.password = ERROR_MESSAGE.NEED_NUMBER;
    }
}