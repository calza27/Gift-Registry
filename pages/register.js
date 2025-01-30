import { Formik } from "formik";
import InputLayout from "@/components/layouts/InputLayout";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import InputHelperText from "@/components/InputHelperText";
import AuthLinkText from "@/components/AuthLinkText";
import SubmitButton from "@/components/SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";
import { COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/const/cognito";
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function Register() {
	const { registerSchema } = useValidationSchema()
	const router = useRouter();

	const register = (values, { setSubmitting }) => {
		var userPool = new CognitoUserPool({
			UserPoolId: COGNITO_USER_POOL_ID,
			ClientId: COGNITO_APP_CLIENT_ID
		});

		var attributeList = []
		var dataEmail = {
			Name: 'email',
			Value: values.email,
		};
		var attributeEmail = new CognitoUserAttribute(dataEmail);
		attributeList.push(attributeEmail);
		var dataUsername = {
			Name: 'username',
			Value: values.email,
		};
		var attributeUsername = new CognitoUserAttribute(dataUsername);
		attributeList.push(attributeUsername);
		userPool.signUp(
			values.email,
			values.password,
			attributeList,
			null,
			function (err, result) {
				if (err) {
					setSubmitting(false)
					alert(err.message || JSON.stringify(err));
					return;
				}
				router.push({
					pathname: '/confirm',
					query: { email: values?.email }
				}, "/confirm")
			}
		);
	}

	return (
		<AuthLayout>
			<div className="authHeader">
				<h1>Surprise.me Registration</h1>
			</div>
			<Formik
				initialValues={{
					email: "",
					password: "",
					confirm_password: ""
				}}
				validationSchema={registerSchema}
				onSubmit={register}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}>
				{({
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
								type="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.email}
							/>
							<InputHelperText isError>{errors?.email}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<Label>Password</Label>
							<InputField
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.password}
							/>
							<InputHelperText isError>{errors?.password}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<Label>Confirm password</Label>
							<InputField
								type="password"
								name="confirm_password"
								placeholder="Confirm password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.confirm_password}
							/>
							<InputHelperText isError>{errors?.confirm_password}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<AuthLinkText href="/login">Already have an account? Log in</AuthLinkText>
						</InputLayout>
						<SubmitButton isSubmitting={isSubmitting} />
					</form>
				)}
			</Formik>
		</AuthLayout>
	)
}