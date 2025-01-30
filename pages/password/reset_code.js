import { Formik } from "formik";
import InputLayout from "@/components/layouts/InputLayout";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import InputHelperText from "@/components/InputHelperText";
import SubmitButton from "@/components/SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/const/cognito";
import { useState } from "react";
import { useRouter } from "next/router"
import AuthLayout from "@/components/layouts/AuthLayout";

export default function ResetCode(){
	const router = useRouter();
	const { resetPasswordRequestSchema } = useValidationSchema();
	const [ resetError, setResetError ] = useState(null);

	const resetPasswordRequest = (values, { setSubmitting }) => {
		setResetError(null)
		const user = new CognitoUser({
		  Username: values.email,
		  Pool: new CognitoUserPool({
			UserPoolId: COGNITO_USER_POOL_ID,
			ClientId: COGNITO_APP_CLIENT_ID
		  })
		});

		user.forgotPassword({
			onSuccess: (data) => {
				console.log('CodeDeliveryData from forgotPassword: ' + JSON.stringify(data));
			},
			onFailure: function (err) {
				setSubmitting(false)
				if (err.message) setResetError(err.message);
				else setResetError(JSON.stringify(err));
			},
			inputVerificationCode: function (data) {
				router.push({
					pathname: '/password/reset',
					query: { email: values?.email }
				}, "/password/reset")
			}
		});
	}

	return (
		<AuthLayout>
			<div>
				<h1>Surprise.me Password Reset</h1>
			</div>
			<Formik
				initialValues={{
					email: ""
				}}
				onSubmit={resetPasswordRequest}
				validationSchema={resetPasswordRequestSchema}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}
				>
				{
					({
						isSubmitting,
						errors,
						values,
						handleSubmit,
						handleChange,
						handleBlur
					}) => (
						<form
							onSubmit={handleSubmit}
							className="authForm"
						>
							<InputLayout>
								<Label>Email</Label>
								<InputField
									type={"text"}
									name={"email"}
									placeholder={"Email"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.email}
								/>
								<InputHelperText isError>{errors?.email}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
			{ resetError && <div> Error: {resetError}</div> }
		</AuthLayout>
	)
}