import React, { useState } from "react";
import { FormProps } from "./html_components/props/Props";
import { GlobalConstants } from "./globalc_namespace/global-constants";
import documents_style from "@/components/cars/document_styles/document_style.module.css";

import Head from "next/head";
import classNames from "classnames";
import { useRouter } from "next/router";

export namespace UploadDocumentFormNamespace {
    export const DOCUMENT_ID = "documentId";
    export const USER_ID = "userId";

    export const IDENTITY_CARD = "Identity Card";
    export const DRIVING_LICENSE = "Driving License";

}

export const UploadDocumentForm = (props: FormProps) => {
    
    const [file_document, setDocument] = useState<File>(new File([], ""));
    const router = useRouter();
    const userId = props.entityId;

    function handleOnchange(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        if (e.target.files == null)
            return;
        setDocument(e.target.files[0]);
    }

    const readUploadedFileAsText = (inputFile: any) => {
        const temporaryFileReader = new FileReader();
        
        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
        
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };

            temporaryFileReader.readAsDataURL(inputFile);
        });
    };
      

    async function uploadFile(e: React.FormEvent<HTMLFormElement>) {
        try {

            const fileBase64String = await readUploadedFileAsText(file_document);
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
            const documentJson = {
                entityId: userId,
                documentId: document_id,
                documentType: props.document_name,
            }

            console.log(documentJson);
            console.log(userId);

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

            router.push(GlobalConstants.CARS + "/" + userId);
        } catch (error) {
            console.log(error);
        }
    }

    function handleOnSubmit(e: any): void {
        e.preventDefault();
        uploadFile(e);
    }

    function handleOnDownload(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    function handleOnDelete(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    return (
        <>
        <Head>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>
        <div>
            <h5> Încarcă Document {(props.document_name as string).toUpperCase()} </h5>
            <div className={classNames("row", documents_style.input_div)}>
                <div className={classNames("col")}>
                    <input className={classNames("form-control", documents_style.input_file)} type="file" onChange={(e) => handleOnchange(e)} id="formFile"/>
                </div>
            </div>

            <div className={classNames("row", "col", documents_style.upload_download_div)}>
                <div className={classNames(documents_style.upload_download)}>
                    <button className={classNames("btn btn-primary", documents_style.button_upload)} onClick={(e) => handleOnSubmit(e)}> Upload </button>
                </div>

                <div className={classNames(documents_style.upload_download)}>
                    <button className={classNames("btn btn-secondary", documents_style.button_upload)} onClick={() => handleOnDownload}> Download </button>
                </div>

                <div className={classNames(documents_style.upload_download)}>
                    <button className={classNames("btn btn-danger", documents_style.button_upload)} onClick={() => handleOnDelete}> Delete </button>
                </div>
            </div>
        </div>
        </>
    )
}