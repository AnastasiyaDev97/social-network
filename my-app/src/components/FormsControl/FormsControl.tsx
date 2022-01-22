import React, {memo} from 'react';
import styles from './FormsControl.module.css'
import {EMPTY_STRING} from "../../const";

export const Textarea = memo((props: any) => {

        let {input, meta, ...restProps} = props
        let error = meta.error && meta.touched
        let currentForm = restProps.type
        if (currentForm === 'textarea')

            return <div>
                <textarea {...input} {...restProps} className={error ? styles.error :EMPTY_STRING}/>
                {error && <span className={styles.errorMessage}>{meta.error}</span>}
            </div>;

        return <div><input {...input} {...restProps}/>
            {error && <span className={styles.errorMessage}>{meta.error}</span>}</div>;

    }
)
