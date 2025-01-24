import { getToken } from "@/hooks/cookies";
import { useEffect, useState } from "react";
import { uploadImage } from "@/hooks/image";
import Image from 'next/image'
import InputLayout from "./layouts/InputLayout";
import Label from "./Label";
import Button from "./Button";

export default function ImageUpload({ existingFile, fileNameSetter, pendingSetter }) {
    const [ token, setToken ] = useState(getToken())
    const [ error, setError ] = useState(null);
    const [ file, setFile ] = useState();
    const [ filePreview, setFilePreview ] = useState(existingFile);
    const [ showUploadButton, setShowUploadButton ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    async function handleChange(e) {
        pendingSetter(true);
        var file = e.target.files[0];
        setFilePreview(URL.createObjectURL(file));
        setFile(file);
        setShowUploadButton(true);
    }

    async function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            var output = reader.result.split('base64,')[1]
            resolve(output)
          }
          reader.onerror = reject
        })
    }
      
    async function upload() {
        try {
            setSuccess(false);
            var fileData;
            setError(null);
            await getBase64(file)
            .then(res => {
                fileData = res;
            })
            .catch(err => {
                throw new Error('Failed to convert image to base64');
            });
            const response = await uploadImage(token, file.name, fileData)
            if (!response.ok) {
                var errorMessage;
                if (response.message) errorMessage = response.message;
                else {
                    var body = await response.json();
                    errorMessage = body.message;
                }
                throw new Error('Failed to upload image: ' + errorMessage);
            }
            var newFileName = await response.text();
            fileNameSetter(newFileName);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            pendingSetter(false);
        }
    }

    useEffect(() => {
        setFilePreview(existingFile);
    }, [existingFile]);
 
    return (
        <InputLayout>
            <Label>Set Image</Label>
            <div>
                { filePreview ? <Image
                    src={filePreview}
                    width={0}
                    height={0}
                    style={{ width: '100px', height: 'auto', border: "1px dashed black"}}
                    alt="preview"
                /> : <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    height: "auto",
                    width: "100px",
                    border: "1px dashed black",
                }}>No image selected</div>
                }
            </div>
            <input style={{
                paddingTop: "0.5rem",
            }}
            type="file"
            onChange={handleChange}
            />
            { showUploadButton && <Button onClick={upload} type="button">Upload</Button> }
            { error && <div>Error: {error}</div> }
            { success && <div>Image successfully uploaded</div>}
        </InputLayout>
    );
  }