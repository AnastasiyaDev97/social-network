import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../common/utils/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
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
            <div><Field validate={[required,maxLength30]} component={Textarea} type={'input'} placeholder={'login'} name={'login'}/></div>
            <div><Field validate={[required,maxLength30]} component={Textarea} type={'input'} placeholder={'password'} name={'password'}/></div>
            <div><Field  component={'input'} type={'checkbox'} name={'rememberMe'}/>remember me</div>
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)