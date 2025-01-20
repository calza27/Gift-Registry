
import { useEffect, useState } from "react";
import { clearToken, getToken, getUserEmail } from "@/hooks/cookies";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PageLayout({ title, requireAuth, children }) {
  const router = useRouter();
  const [ token, setToken ] = useState(getToken())
  const [ userEmail, setUserEmail ] = useState(getUserEmail())

  useEffect(() => {
    if (!requireAuth || token) return;
    const reAuth = async () => {
      router.push({
        pathname: '/login',
        query: { message: "Session expired - please login to continue" }
      }, "/login")
    }
    reAuth()
  } , [token])

  const logout = () => {
    clearToken()
    router.push('/')
  };

  return(
    <div>
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "2",
          padding: "10px",
          height: "100px",
          borderBottom: "1px solid black",
          backgroundColor: "white"
        }}>
          <div style={{
            position: "absolute",
            left: "10px"
          }}><h1>{title}</h1></div>
          <div style={{
            position: "absolute",
            right: "10px",
            bottom: "10px"
          }}>
            { userEmail && <div>
              <div style={{paddingBottom: "5px"}}>Hello <Link href="/profile" passHref>{userEmail}!</Link></div>
              <button onClick={() => logout()} style={{marginRight: "5px"}}>Logout</button>
            </div> }
            { !userEmail && <div>
              <button onClick={() => router.push('/login')} style={{marginRight: "5px"}}>Login</button>
              <button onClick={() => router.push('/register')} style={{marginRight: "5px"}}>Register</button>
            </div> }
          </div>
      </div>
      <div style={{
        position: "relative",
        top: "100px",
        bottom: "100px",
        height: "calc(100vh - 200px)",
        overflowY: "auto"
      }}>
        {children}
      </div>
      <div style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        height: "100px",
        zIndex: "2",
        borderTop: "1px solid black",
        backgroundColor: "white"
      }}>
        Footer text
      </div>
    </div>
  )
}