import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { InputProps } from "../props/Props";
import textBoxStyles from './textbox_module_css/textbox.module.css'
import { readConfigFile } from "typescript";

export const TextBoxDivForm = forwardRef((props: InputProps, ref: ForwardedRef<any>) => {

    const internalRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        // Specify the properties or functions to expose
        getData: () => {
          return internalRef.current?.value || '';
        },
        // Add more properties or functions as needed
    }));
    
    return (
        <div className={textBoxStyles.custom_field}>
            <input
                type={props.type}
                name={props.name}
                placeholder=" "
                ref={internalRef}
            />
            <span className={textBoxStyles.placeholder}>{props.placeholder}</span>
        </div>
    )
});
