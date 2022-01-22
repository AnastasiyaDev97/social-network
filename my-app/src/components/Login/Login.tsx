import React, {FC, memo} from "react";
import {Redirect} from "react-router-dom";
import {loginAPIDataType} from "../../api/types";
import {useFormik} from "formik";
import {EMPTY_STRING} from "../../const";
import {PATH} from "../../enums/PATH";
import {FormikErrorType, validateLoginForm} from "../../utils/validators";

type LoginPropsType = {
    loginThunk: (loginData: loginAPIDataType) => void
    isAuth: boolean
}

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login: FC<LoginPropsType> = memo(({loginThunk, isAuth}) => {

        const formik = useFormik({
            initialValues: {
                email: EMPTY_STRING,
                password: EMPTY_STRING,
                rememberMe: false
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

        if (isAuth) {
            return <Redirect to={PATH.PROFILE}/>
        }

        return (
            <div>
                <h4>login</h4>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input placeholder={'email'} {...formik.getFieldProps('email')}/>
                    </div>
                    {(formik.touched.email && formik.errors.email) && <div>{formik.errors.email}</div>}

                    <div>
                        <input placeholder={'password'} {...formik.getFieldProps('password')}/>
                    </div>
                    {(formik.touched.password && formik.errors.password) && <div>{formik.errors.password}</div>}

                    <div>
                        <input type={'checkbox'} {...formik.getFieldProps('rememberMe')}/>
                        remember me
                    </div>
                    <button>Login</button>
                </form>
            </div>
        )
    }
)
