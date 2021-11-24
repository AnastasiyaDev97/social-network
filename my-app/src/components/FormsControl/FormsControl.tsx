import React from 'react';
import styles from './FormsControl.module.css'

export const Textarea = (props: any) => {

    let {input, meta, ...restProps} = props
    let error = meta.error && meta.touched
    let currentForm = restProps.type
    if (currentForm === 'textarea')

        return <div>
            <textarea {...input} {...restProps} className={error ? styles.error : ''}/>
            {error && <span className={styles.errorMessage}>{meta.error}</span>}
        </div>;

    return <div><input {...input} {...restProps}/>
        {error && <span className={styles.errorMessage}>{meta.error}</span>}</div>;

}

