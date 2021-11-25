import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../common/utils/validators";
import {loginAPIDataType} from "../../api/api";
import {Redirect} from "react-router-dom";
type LoginPropsType={
    loginThunk:(loginData:loginAPIDataType)=>void
    isAuth:boolean
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login = (props:LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginThunk(formData)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h4>login</h4>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const maxLength30=maxLengthCreator(30)
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[required,maxLength30]} component={Textarea} type={'input'} placeholder={'login'} name={'email'}/></div>
            <div><Field validate={[required,maxLength30]} component={Textarea} type={'input'} placeholder={'password'} name={'password'}/></div>
            <div><Field  component={'input'} type={'checkbox'} name={'rememberMe'}/>remember me</div>
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)