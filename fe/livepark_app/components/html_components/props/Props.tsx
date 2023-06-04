import { ChangeEvent, ChangeEventHandler, FormEvent, HTMLInputTypeAttribute } from "react";

export type InputProps = {
    type: string | HTMLInputTypeAttribute | undefined;
    name: string | undefined;
    value: string | number | readonly string[] | undefined;
    placeholder: string | undefined;
    handleOnchange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export type FormProps = {
    entityId: string | string[] | undefined;
    document_name: string | string[] | undefined;
    url: string;
};