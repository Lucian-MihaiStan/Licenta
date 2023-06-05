import { ChangeEvent, ChangeEventHandler, FormEvent, HTMLInputTypeAttribute, MutableRefObject, RefObject } from "react";

export type InputProps = {
    type: string | HTMLInputTypeAttribute | undefined;
    name: string | undefined;
    placeholder: string | undefined;
};

export type FormProps = {
    entityId: string | string[] | undefined;
    document_name: string | string[] | undefined;
    url: string;
};