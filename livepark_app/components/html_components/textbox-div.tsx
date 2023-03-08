import { InputProps } from "./props/InputProps";

export const TextBoxDivFrom = (props: InputProps) => {
    return (
        <div>
            <input
                type={props.type}
                name={props.name}
                onChange={props.handleOnchange}
                value={props.value}
                placeholder={props.placeholder}
            />
        </div>
    )
}
