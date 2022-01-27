import React, {FC, memo} from "react";
import {Redirect} from "react-router-dom";
import {loginAPIDataType} from "../../api/types";
import {useFormik} from "formik";
import {EMPTY_STRING} from "../../const";
import {PATH} from "../../enums/PATH";
import {FormikErrorType, validateLoginForm} from "../../utils/validators";
import style from './Login.module.scss'
import SuperButton from "../SuperButton/SuperButton";

import SuperInputText from "../SuperInput/SuperInputText";
import SuperCheckBox from "../SuperCheckBox/SuperCheckBox";


type LoginPropsType = {
    loginThunk: (loginData: loginAPIDataType) => void
    isAuth: boolean
    captchaUrl: string
}

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


export const Login: FC<LoginPropsType> = memo(({loginThunk, isAuth, captchaUrl}) => {

        const formik = useFormik({
            initialValues: {
                email: EMPTY_STRING,
                password: EMPTY_STRING,
                rememberMe: false,
                captcha: EMPTY_STRING,
            },

            validate: (values) => {
                const errors: FormikErrorType = {};
                validateLoginForm(values, errors)
                return errors;
            },

            onSubmit: values => {
                loginThunk(values)
                formik.resetForm()
            },
        })

    const fieldsWithValidation=[
        {name:'email',touched:formik.touched.email,error:formik.errors.email},
        {name:'password',touched:formik.touched.password,error:formik.errors.password},
    ]


    if (isAuth) {
        return <Redirect to={PATH.PROFILE}/>
    }


        return (

            <div className={style.loginWrapper}>
                <h2 className={style.title}>Login</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>

                    {fieldsWithValidation.map((field,i)=>{
                        return <div key={i} className={style.relativeInputBlock}>
                            <SuperInputText placeholder={field.name}
                                            {...formik.getFieldProps(field.name)}
                                            className={style.input}/>
                            {(field.touched && field.error) && <div
                                className={style.error}>{field.error}</div>}
                        </div>
                    })}

                    <SuperCheckBox type={'checkbox'} {...formik.getFieldProps('rememberMe')}
                                   className={style.padding}>
                        remember me
                    </SuperCheckBox>

                    {captchaUrl &&
                    <div>
                        <img src={captchaUrl} alt='captcha'/>
                        <input placeholder='add captcha' {...formik.getFieldProps('captcha')}/>
                    </div>}

                    <SuperButton className={style.btnMargin}>Login</SuperButton>
                </form>
            </div>
        )
    }
)
