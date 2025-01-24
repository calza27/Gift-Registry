
import { useEffect, useState } from "react";
import { clearToken, getToken, getUserEmail } from "@/hooks/cookies";
import { useRouter } from "next/router";
import SearchField from "@/components/SearchField"
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function PageLayout({
  title,
  requireAuth,
  showBack = true,
  children,
  activeNavigationPage,
}) {
  const router = useRouter();
  const [ token, setToken ] = useState(getToken())
  const [ userEmail, setUserEmail ] = useState(getUserEmail())
  const [ shareCode, setShareCode ] = useState(null)

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
    if (router.pathname === "/") router.reload()
    else router.push('/')
  };

  const back = () => {
    router.back()
  }

  const showHome = () => {
    if (router.pathname === "/") return false
    return true
  }

  const home = () => {
    router.push("/")
  }

	const handleChange = (e) => {
		setShareCode(e.target.value)
	}

	const viewList = () => {
		router.push("/list?list_id=" + shareCode)
	}

  return(
    <div style={{backgroundColor: "#FCF5E5", height: "100vh"}}>
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "2",
          padding: "10px",
          height: "100px",
          borderBottom: "1px solid black"
        }}>
          <div style={{
            position: "absolute",
            left: "10px",
            top: "10px"
          }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
              }}>
                { showBack && <a onClick={back} style={{cursor: "pointer"}}>
                  <Image src="/back-arrow.svg" alt="Back" width={20} height={20} style={{position: "relative", top: "3px"}}/>
                  &nbsp;Back&nbsp;&nbsp;&nbsp;
                </a> }
                { showHome() && <a onClick={home} style={{cursor: "pointer"}}>
                  Home&nbsp;
                  <Image src="/home.svg" alt="Home" width={20} height={20} style={{position: "relative", top: "3px"}}/>
                </a> }
              </div>
          </div>
          <div style={{
            position: "absolute",
            left: "10px",
            bottom: "10px"
          }}>
              <div style={{display: "flex", justifyContent: "center"}}>
                <h1 style={{margin: "0px", marginRight: "50px", width: "200px"}}>{title}</h1>
                { token && <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                  <div {...activeNavigationPage === "profile" ? {style: {borderBottom: "2px solid black", marginRight: "10px"}} : {style: {marginRight: "10px"}}}>
                    <Link href="/profile" passHref>
                      <div style={{textAlign: "center"}}>
                        <Image src="/profile.svg" alt="Profile" width={30} height={30}/>
                        <br/>
                        Profile
                      </div>
                    </Link>
                    </div>
                </div>}
              </div>
          </div>
          <div style={{textAlign: "center", paddingTop: "10px", paddingRight: "10px"}}>
            <div style={{marginBottom: "10px"}}>
              <SearchField
                type="text"
                name="share_code"
                placeholder="Enter Share Code"
                onChange={handleChange}
                searchAction={viewList}
              />
            </div>
          </div>
          <div style={{
            position: "absolute",
            right: "10px",
            bottom: "10px"
          }}>
            { token && <div>
              <p style={{marginRigt: "5px"}}>Hello {userEmail}!</p>
              <Button onClick={() => logout()} style={{marginRight: "5px"}}>Logout</Button>
            </div> }
            { !token && <div>
              <Button onClick={() => router.push('/login')} style={{marginRight: "5px"}}>Login</Button>
              <Button onClick={() => router.push('/register')} style={{marginRight: "5px"}}>Register</Button>
            </div> }
          </div>
      </div>
      <div style={{
        position: "relative",
        top: "100px",
        bottom: "50px",
        height: "calc(100vh - 150px)",
        width: "calc(100vw - 100px)",
        overflowY: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "3rem",
      }}>
        {children}
      </div>
      <div style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        height: "50px",
        zIndex: "2",
        borderTop: "1px solid black"
      }}>
        <div style={{
          position: "absolute",
          left: "10px",
          right: "10px",
          bottom: "10px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
          }}>
            <div style={{flexGrow: "1", textAlign: "left"}}>
              A Blank Pages Project &copy; 2025
            </div>
            <div style={{flexGrow: "1", textAlign: "right"}}>
              <Link href="/about" passHref>About Blank Pages</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}