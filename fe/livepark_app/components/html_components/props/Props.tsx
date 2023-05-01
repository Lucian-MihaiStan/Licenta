import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export type InputProps = {
    type: string | HTMLInputTypeAttribute | undefined;
    name: string | undefined;
    value: string | number | readonly string[] | undefined;
    placeholder: string | undefined;
    handleOnchange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export type ProfileProps = {
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
};