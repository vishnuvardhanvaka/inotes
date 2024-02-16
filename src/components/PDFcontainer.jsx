import React, { useEffect, useState } from "react";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import ChatContainer from "./ChatContainer";
import "./Scrollbar.css";

function PDFcontainer(props) {
    const [pdfURL, setPDFurl] = useState('')
    
    useEffect(() => {
        const fileURL = openPdf(props.file.pdf_data)
    }, [])
    const base64ToBlob = (base64) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'application/pdf' });
    };

    const openPdf = (base64) => {
        const blob = base64ToBlob(base64);
        const url = URL.createObjectURL(blob);
        setPDFurl(url)
        return url
        // Create an anchor tag
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        // a.download = 'generated.pdf'; // Optional: Set the filename for download

        // Simulate a click to open the PDF
        document.body.appendChild(a);
        a.click();

        // Clean up the anchor tag
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    

    return (
        <div className="w-full flex h-full ">
            <div className="w-[50%] h-full  m-3 text-center">
                <embed
                    id="scrollbar"
                    className="overflow-y-scroll scrollbar"
                    src={`${pdfURL}#toolbar=1&navpanes=0&scrollbar=0`}
                    width="100%" height="100%"
                />

            </div>
            <div  className="w-[50%] h-full m-3 text-center ">
                <ChatContainer file={props.file}/>
            </div>
        </div>
    )
}
export default PDFcontainer;
