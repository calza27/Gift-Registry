import { Formik } from "formik";
import { getToken, getUserId } from "@/hooks/cookies";
import { useState } from "react";
import { createGift, updateGiftById } from "@/hooks/gift";
import { useRouter } from "next/router";
import ImageUpload from "./ImageUpload";
import InputField from "./InputField";
import InputHelperText from "./InputHelperText";
import InputLayout from "./layouts/InputLayout";
import Label from "./Label";
import SubmitButton from "./SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";

export default function GiftForm({ listId, giftData, successAction }) {
    const router = useRouter();
    const { giftSchema } = useValidationSchema();
    const [ token, setToken ] = useState(getToken())
    const [ error, setError ] = useState(null);
    const [ newImageFileName, setNewImageFileName ] = useState(null);
    const [ imagePending, setImagePending ] = useState(false);

    async function submit(values, { setSubmitting }) {
        try {
            setError(null);
            if (newImageFileName) values.image_file_name = newImageFileName;

            values.price = Math.round(values.price * 100);
            var response;
            if (giftData) {
                response = await updateGiftById(token, listId, values)
            } else {
                response = await createGift(token, listId, values)
            }
            if (!response.ok) {
                throw new Error('Failed to submit gift');
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
                    id: giftData?.id,
                    list_id: listId,
                    created_at: giftData?.created_at,
                    title: giftData?.title,
                    description: giftData?.description,
                    place_of_purchase: giftData?.place_of_purchase,
                    url: giftData?.url,
                    price: giftData ? (giftData?.price/100).toFixed(2) : 0,
                    rank: 0,
                    image_file_name: giftData?.image_file_name,
                }}
                validationSchema={giftSchema}
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
                            <Label>Gift Title</Label>
                            <InputField
                                type="text"
                                name="title"
                                placeholder="Gift Title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.title}
                            />
                            <InputHelperText isError>{errors?.title}</InputHelperText>
                        </InputLayout>
                        <InputLayout>
                            <Label>Description</Label>
                            <textarea
                                name="title"
                                placeholder="Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.description}
                            />
                        </InputLayout>
                        <InputLayout>
                            <Label>Place of Purchase</Label>
                            <InputField
                                type="text"
                                name="place_of_purchase"
                                placeholder="Place of Purchase"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.place_of_purchase}
                            />
                            <InputHelperText isError>{errors?.place_of_purchase}</InputHelperText>
                        </InputLayout>
                        <InputLayout>
                            <Label>Link</Label>
                            <InputField
                                type="text"
                                name="url"
                                placeholder="URL"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.url}
                            />
                        </InputLayout>
                        <InputLayout>
                            <Label>Price</Label>
                            <InputField
                                type="number"
                                name="price"
                                placeholder="Price"
                                min="1"
                                step="any"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.price}
                            />
                            <InputHelperText isError>{errors?.price}</InputHelperText>
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