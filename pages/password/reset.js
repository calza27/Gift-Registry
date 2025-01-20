import { Formik } from "formik";
import InputLayout from "@/components/layouts/InputLayout";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import InputHelperText from "@/components/InputHelperText";
import SubmitButton from "@/components/SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";
import { useRouter } from "next/router";
import { useState } from "react";
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/const/cognito";

export default function Reset(){
	const router = useRouter()
	const { email } = router.query
	const { resetPasswordSchema } = useValidationSchema();
	const [ resetError, setResetError ] = useState(null)

	const resetPassword = (values, { setSubmitting }) => {
		setResetError(null)
		const user = new CognitoUser({
		  Username: email,
		  Pool: new CognitoUserPool({
			UserPoolId: COGNITO_USER_POOL_ID,
			ClientId: COGNITO_APP_CLIENT_ID
		  })
		});
		var code = values.code;
		var newPassword = values.password;

		user.confirmPassword(code, newPassword, {
			onSuccess() {
				router.push({
					pathname: '/login',
					query: { message: "Password successfully reset - please login to continue" }
				}, "/login")
			},
			onFailure(err) {
				setSubmitting(false)
				setResetError(JSON.stringify(err))
			},
		});
	}

	return (
		<div style={{
			padding: "10px"
		}}>
			<div>Reset code sent to {email} - Please enter it below and enter a new password</div>
			<Formik
				initialValues={{
					username: email,
					code: "",
					password: "",
					confirm_password: ""
				}}
				validationSchema={resetPasswordSchema}
				onSubmit={resetPassword}
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
						handleBlur,
						handleChange
					}) => (
						<form onSubmit={handleSubmit}>
							<InputLayout>
								<Label>Reset code</Label>
								<InputField
									type={"text"}
									name={"code"}
									placeholder={"Reset code"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.code}
								/>
								<InputHelperText isError>{errors?.code}</InputHelperText>
							</InputLayout>
							<InputLayout>
								<Label>New password</Label>
								<InputField
									type={"password"}
									name={"password"}
									placeholder={"New password"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.password}
								/>
								<InputHelperText isError>{errors?.password}</InputHelperText>
							</InputLayout>
							<InputLayout>
								<Label>Confirm password</Label>
								<InputField
									type={"password"}
									name={"confirm_password"}
									placeholder={"Confirm password"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.confirm_password}
								/>
								<InputHelperText isError>{errors?.confirm_password}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
			{ resetError && <div> Error: {resetError}</div> }
		</div>
	)
}