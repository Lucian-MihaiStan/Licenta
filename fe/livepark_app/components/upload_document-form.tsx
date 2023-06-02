import React, { useState } from "react";
import { FormProps } from "./html_components/props/Props";
import { GlobalConstants } from "./globalc_namespace/global-constants";

export namespace UploadDocumentFormNamespace {
    export const DOCUMENT_ID = "documentId";
    export const USER_ID = "userId";

    export const IDENTITY_CARD = "Identity Card";
    export const DRIVING_LICENSE = "Driving License";

}

export const UploadDocumentForm = (props: FormProps) => {
    
    const [file_document, setDocument] = useState<File>(new File([], ""));
    const [fileBase64String, setFileBase64String] = useState(null);

    function handleOnchange(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        if (e.target.files == null)
            return;
        setDocument(e.target.files[0]);
    }

    async function uploadFile() {
        try {

            var reader = new FileReader();
            reader.readAsDataURL(file_document);
            reader.onload = () => {
              setFileBase64String(reader.result);
            };

            reader.onerror = (error) => {
              console.log("error: ", error);
            };
            const response = await fetch(GlobalConstants.ADD_DOCUMENT_LINK, {
                method: GlobalConstants.POST_REQUEST,
                headers: {
                    "Access-Control-Allow-Origin": GlobalConstants.STAR,
                    "Content-Type": GlobalConstants.APPLICATION_JSON,
                    "Origin": GlobalConstants.FRONTEND_API_LINK,
                },
                body: JSON.stringify({
                    file: fileBase64String
                })
            });

            const result = await response.json();
            if (result['document_id'] == null) {
                alert("Document not inserted");
                return;
            }
            
            const document_id = result['document_id'];
            console.log(props.entityId);
            console.log(parseInt(props.entityId));
            const documentJson = {
                entityId: props.entityId,
                documentId: document_id,
                documentType: props.document_name,
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

            if (!responsePost.ok) {
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