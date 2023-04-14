import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  memo,
} from "react";
import style from "./SuperCheckBox.module.scss";
import { EMPTY_STRING } from "../../const";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

const SuperCheckBox: FC<SuperCheckboxPropsType> = memo(
  ({
    type,
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children,

    ...restProps
  }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };

    const finalInputClassName = `${style.checkbox} ${
      className ? className : EMPTY_STRING
    }`;

    return (
      <label className={style.labelForCheckBox}>
        <input
          type={"checkbox"}
          onChange={onChangeCallback}
          className={finalInputClassName}
          {...restProps}
        />
        {children && <span className={style.spanClassName}>{children}</span>}
      </label>
    );
  }
);

export default SuperCheckBox;
