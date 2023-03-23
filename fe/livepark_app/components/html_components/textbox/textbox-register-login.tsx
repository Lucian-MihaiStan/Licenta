import { InputProps } from "../props/InputProps";
import textBoxStyles from './textbox_module_css/textbox.module.css'

export const TextBoxDivForm = (props: InputProps) => {
    return (
        <div className={textBoxStyles.custom_field}>
            <input
                type={props.type}
                name={props.name}
                onChange={props.handleOnchange}
                value={props.value}
                placeholder=" "
            />
            <span className={textBoxStyles.placeholder}>{props.placeholder}</span>
        </div>
    )
}
