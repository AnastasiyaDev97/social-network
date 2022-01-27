import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, memo} from 'react'
import style from './SuperCheckBox.module.scss'
import {EMPTY_STRING} from "../../const";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckBox: FC<SuperCheckboxPropsType> = memo((
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange&&onChange(e)
        onChangeChecked&&onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${style.checkbox} ${className ? className : EMPTY_STRING}`

    return (
        <label className={style.labelForCheckBox}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            {children && <span className={style.spanClassName}>{children}</span>}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
})

export default SuperCheckBox