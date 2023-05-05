import React from "react";
import { FormProps } from "./html_components/props/Props";
import { GlobalConstants } from "./globalc_namespace/global-constants";

export namespace UploadDocumentFormNamespace {
    export const DOCUMENT_ID = "documentId";
    export const USER_ID = "userId";

    export const IDENTITY_CARD = "Identity Card";
    export const DRIVING_LICENSE = "Driving License";

    export const INSURANCE = "Insurance";
    export const BRIEF = "Brief";

}

export const UploadDocumentForm = (props: FormProps) => {
    
    const [document, setDocument] = React.useState<File>(new File([], ""));
    
    function handleOnchange(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        if (e.target.files == null)
            return;
        setDocument(e.target.files[0]);
    }

    async function uploadFile() {
        try {
            const response = await fetch(GlobalConstants.ADD_DOCUMENT_LINK, {
                method: GlobalConstants.POST_REQUEST,
                headers: {
                    "Access-Control-Allow-Origin": GlobalConstants.STAR,
                    "Content-Type": GlobalConstants.APPLICATION_JSON,
                    "Origin": GlobalConstants.FRONTEND_API_LINK,
                },
                body: JSON.stringify(document),
            });

            const result = await response.json();
            if (result['document_id'] == null) {
                alert("Document not inserted");
                return;
            }
            
            const document_id = result['document_id'];

            const documentJson = {
                documentId: document_id,
                userId: props.userId
            }

            const responsePost = await fetch(props.url, {
                method: GlobalConstants.POST_REQUEST,
                headers: {
                    "Content-Type": GlobalConstants.APPLICATION_JSON,
                    "Access-Control-Allow-Origin": GlobalConstants.STAR,
                    "Origin": GlobalConstants.FRONTEND_API_LINK,
                    "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                },
                body: JSON.stringify(documentJson),
            });

            const resultPost = await responsePost.json();
            if (resultPost['posted'] == false) {
                alert("Document not posted");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        uploadFile();
    }

    return (
        <div>
            <form action='form' onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <h3> Upload {props.document_name} </h3>
                    <input type="file" onChange={(e) => handleOnchange(e)} />
                    <button> Upload </button>
                </div>
            </form>
        </div>
    )
}