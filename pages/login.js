import { Formik } from "formik";
import InputLayout from "@/components/layouts/InputLayout";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import InputHelperText from "@/components/InputHelperText";
import AuthLinkText from "@/components/AuthLinkText";
import SubmitButton from "@/components/SubmitButton";
import useValidationSchema from "@/hooks/useValidationSchema";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/const/cognito";
import { setToken, setUser } from "@/hooks/cookies";


export default function Login() {
  const router = useRouter();
  const { message } = router.query
  const { loginSchema } = useValidationSchema();
  const [ loading, setLoading ] = useState(true);
  const [ loginError, setLoginError ] = useState(null);

  const login = (values, { setSubmitting }) => {
    setLoading(true);
    setLoginError(null);
    const user = new CognitoUser({
      Username: values.email,
      Pool: new CognitoUserPool({
        UserPoolId: COGNITO_USER_POOL_ID,
        ClientId: COGNITO_APP_CLIENT_ID
      })
    });
  
    const authDetails = new AuthenticationDetails({
      Username: values.email,
      Password: values.password
    });
    
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        setToken(result.idToken.jwtToken)
        setUser(result.idToken.payload)
        setLoading(false)
        router.push("/profile")
      },
      onFailure: (err) => {
        setLoading(false)
        setSubmitting(false)
        if (err.name == 'NotAuthorizedException') {
          setLoginError("Incorrect username or password entered")
        } else {
          setLoginError(JSON.stringify(err))
        }
      }
    });
  }

  return (
    <div style={{
      padding: "10px"
    }}>
      { message && <div>{message}</div> }
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={loginSchema}
        onSubmit={login}
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
              <Label>Email</Label>
              <InputField
                type="text"
                name="email"
                placeholder="email"
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
              <AuthLinkText href="/password/reset_code">{'Forgot password?'}</AuthLinkText>
            </InputLayout>
            <InputLayout>
              <AuthLinkText href="/register">{'Don\'t have an account? Register.'}</AuthLinkText>
            </InputLayout>
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
      { loginError && <div> Error: {loginError}</div> }
    </div>
  );
}