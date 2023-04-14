import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  KeyboardEvent,
  memo,
  TextareaHTMLAttributes,
} from "react";
import style from "./SuperTextarea.module.scss";

type DefaultTextareaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type SuperTextareaPropsType = DefaultTextareaPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;

  spanClassName?: string;
};

const SuperTextarea: FC<SuperTextareaPropsType> = memo(
  ({
    // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,

    className,
    ...restProps // все остальные пропсы попадут в объект restProps
  }) => {
    const finalTextareaClassName = `${style.textarea} ${className} `;

    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange && // если есть пропс onChange
        onChange(e); // то передать ему е (поскольку onChange не обязателен)
      onChangeText && onChangeText(e.currentTarget.value);
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyPress && onKeyPress(e);
      onEnter && // если есть пропс onEnter
        e.key === "Enter" && // и если нажата кнопка Enter
        onEnter(); // то вызвать его
    };

    return (
      <>
        <textarea
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalTextareaClassName}
          {...restProps}
        />
      </>
    );
  }
);

export default SuperTextarea;
