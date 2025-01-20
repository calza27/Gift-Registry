import { Formik } from "formik";
import { getToken, getUserId } from "@/hooks/cookies";
import { useState } from "react";
import { createList, updateListById } from "@/hooks/list";
import { useRouter } from "next/router";
import ImageUpload from "./ImageUpload";
import InputField from "./InputField";
import InputHelperText from "./InputHelperText";
import InputLayout from "./layouts/InputLayout";
import Label from "./Label";
import SubmitButton from "./SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";

export default function ListForm({ listData, successAction }) {
    const router = useRouter();
    const { listSchema } = useValidationSchema();
    const [ token, setToken ] = useState(getToken())
    const [ userId, setUserId ] = useState(getUserId())
    const [ error, setError ] = useState(null);
    const [ newImageFileName, setNewImageFileName ] = useState(null);
    const [ imagePending, setImagePending ] = useState(false);

    async function submit(values, { setSubmitting }) {
        try {
            setError(null);
            if (newImageFileName) values.image_file_name = newImageFileName;

            var response;
            if (listData) {
                response = await updateListById(token, values)
            } else {
                response = await createList(token, values)
            }
            if (!response.ok) {
                throw new Error('Failed to submit list');
            }
            if (successAction) successAction();
            else router.push('/profile');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{
            padding: "10px"
        }}>
            <Formik
                initialValues={{
                    id: listData?.id,
                    user_id: userId,
                    list_name: listData?.list_name,
                    created_at: listData?.created_at,
                    sharing_id: listData?.sharing_id,
                    image_file_name: listData?.image_file_name,
                }}
                validationSchema={listSchema}
                onSubmit={submit}
                validateOnMount={false}
                validateOnChange={false}
                validateOnBlur={false}>
                {({
                    isSubmitting,
                    errors,
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <InputLayout>
                            <Label>Name</Label>
                            <InputField
                                type="text"
                                name="list_name"
                                placeholder="List Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.list_name}
                            />
                            <InputHelperText isError>{errors?.list_name}</InputHelperText>
                        </InputLayout>
                        <SubmitButton isSubmitting={imagePending || isSubmitting} />
                    </form>
                )}
            </Formik>
            <ImageUpload fileNameSetter={setNewImageFileName} pendingSetter={setImagePending} />
            { error && <div> Error: {error}</div> }
        </div>
    );
  }