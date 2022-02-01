import style from './Modal.module.scss'
import {useFormik} from "formik";
import SuperInputText from "../SuperInput/SuperInputText";
import React, {FC, memo} from "react";
import SuperTextarea from "../SuperTextarea/SuperTextarea";
import SuperCheckBox from "../SuperCheckBox/SuperCheckBox";
import {updateProfileThunkT} from "../../redux/reducer/profile/thunk";
import SuperButton from "../SuperButton/SuperButton";
import {shallowEqual} from "react-redux";
import {Nullable} from "../../types/Nullable";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type ItemForFormT={
    title?:string
    type?:string
    initialValue:Nullable<string|boolean>
    initialValueTitle:string
    icon?:IconProp
}

type ModalPropsT = {

    onSubmitBtnClick: (updateItem: updateProfileThunkT) => void
    setIsModalShown: (value: boolean) => void
    itemsForForm:ItemForFormT[]
}


export const Modal: FC<ModalPropsT> = memo(({itemsForForm, onSubmitBtnClick, setIsModalShown}) => {




    let objInitialValues = {}
    for (let i = 0; i < itemsForForm.length; i++) {
        let newVal = {[itemsForForm[i].initialValueTitle]: itemsForForm[i].initialValue}
        objInitialValues = {...objInitialValues, ...newVal}
    }


    const formik = useFormik({
        initialValues: objInitialValues,


        onSubmit: (values) => {
            const hasChanged = !shallowEqual(formik.initialValues, values)
            if(hasChanged){
                onSubmitBtnClick(values)
            }
            setIsModalShown(false)
        },
    })

    return (
        <div className={style.modalContainer}>

            <div className={style.modalBlock}>
                <h2>Add information about yourself</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>

                    {itemsForForm.map((value, i) => {
                        return <div key={i}>
                            <p>{value.title}</p>
                            {((value.type === 'input')||(!value.type)) &&
                            <SuperInputText {...formik.getFieldProps(value.initialValueTitle)}
                            placeholder={value.initialValueTitle}/>}
                            {value.type === 'checkbox' &&
                            <SuperCheckBox {...formik.getFieldProps(value.initialValueTitle)}/>}
                            {value.type === 'textarea' &&
                            <SuperTextarea {...formik.getFieldProps(value.initialValueTitle)}/>}
                        </div>
                    })}
                    <SuperButton className={style.btnSave}>Save</SuperButton>

                </form>

            </div>

        </div>
    )
})