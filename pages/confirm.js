import { Formik } from "formik";
import InputLayout from "@/components/layouts/InputLayout";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import InputHelperText from "@/components/InputHelperText";
import SubmitButton from "@/components/SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";
import { useRouter } from "next/router";
import { useState } from "react";
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/const/cognito";

export default function Confirm(){
	const router = useRouter();
	const { email } = router.query;
	const { confirmSchema } = useValidationSchema();
	const [ confirmError, setConfirmError ] = useState();

	const confirmCode = (values, { setSubmitting }) => {
		var cognitoUser = new CognitoUser({
			Username: email,
			Pool: new CognitoUserPool({
				UserPoolId: COGNITO_USER_POOL_ID,
				ClientId: COGNITO_APP_CLIENT_ID
			}),
		});
		cognitoUser.confirmRegistration(values.code, true, function (err, result) {
			if (err) {
				setSubmitting(false)
				if (err.message) setConfirmError(err.message);
				else setConfirmError(JSON.stringify(err));
				return;
			}
			router.push({
				pathname: '/login',
				query: { message: "Account successfully registered - please login to continue" }
			}, "/login")
		});
	}

	return (
		<div style={{
			padding: "10px"
		}}>
			<Formik
				initialValues={{
					username: email,
					code: ""
				}}
				onSubmit={confirmCode}
				validationSchema={confirmSchema}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}>
				{
					({
						isSubmitting,
						errors,
						values,
						handleSubmit,
						handleChange,
						handleBlur
					 }) => (
						<form onSubmit={handleSubmit}>
							<InputLayout>
								<Label>Confirmation Code</Label>
								<InputField
									type={"text"}
									name={"code"}
									placeholder={"Code"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.code}
								/>
								<InputHelperText isError>{errors?.code}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
			{ confirmError && <div> Error: {confirmError}</div> }
		</div>
	)
}