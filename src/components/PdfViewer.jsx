import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import ChatContainer from "./ChatContainer";
import "./Scrollbar.css";

function PdfViewer(props) {
    const [pdfURL, setPDFurl] = useState(openPdf(props.file))

    const docs = [
        // { uri: "https://calibre-ebook.com/downloads/demos/demo.docx" },
        // { uri: require("./example-files/pdf.pdf") },
      ];
    
    const base64ToBlob = (base64) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'application/pdfz' });
    };

    const openPdf = (base64) => {
        const blob = base64ToBlob(base64);
        const url = URL.createObjectURL(blob);
        setPDFurl(url)
        return url
    };
    

    return (
        <div className="w-full flex h-full ">
            <div className="w-[50%] h-full  m-3 text-center">
                {/* <embed
                    id="scrollbar"
                    className="overflow-y-scroll scrollbar"
                    src={`${pdfURL}#toolbar=1&navpanes=0&scrollbar=0`}
                    width="100%" height="100%"
                /> */}
                <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
    />

            </div>
            <div  className="w-[50%] h-full m-3 text-center ">
                {/* <ChatContainer file={props.file}/> */}
            </div>
            
        </div>
    )
}
export default PdfViewer;
