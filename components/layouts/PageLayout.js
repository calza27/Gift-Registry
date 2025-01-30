
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
  } , [token, requireAuth, router])

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
    <div id="page_layout" className="flex column">
      <div id="header" className="flex column">
        <div className="flex row">
          <div className="flex row" style={{flexGrow: "1"}}>
            { showBack && <a className="navLink" onClick={back}>
              <Image src="/back-arrow.svg" alt="Back" className="icon" width={20} height={20}/>
              <span className="navText">Back</span>
            </a> }
            { showHome() && <a className="navLink" onClick={home}>
              <span className="navText">Home</span>
              <Image src="/home.svg" alt="Home" className="icon" width={20} height={20}/>
            </a> }
          </div>
          <div className="flex row center" style={{flexGrow: "9"}}>
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
        </div>
        <div className="flex row end">
          <div className="flex center end">
            <div className="title">
              <span>{title}</span>
            </div>
            { token && <div className="">
              <div {...activeNavigationPage === "profile" ? {style: {borderBottom: "2px solid black", marginRight: "10px"}} : {style: {marginRight: "10px"}}}>
                <Link href="/profile" passHref>
                  <div className="centerText">
                    <Image src="/profile.svg" alt="Profile" width={30} height={30}/>
                    <br/>
                    Profile
                  </div>
                </Link>
                </div>
            </div>}
          </div>
          { token && <div className="flex column right">
              <div className="hide-small">
                <p style={{marginRigt: "5px"}}>Hello {userEmail}!</p>
              </div>
              <div className="right">
                <Button onClick={() => logout()}>Logout</Button>
              </div>
            </div> }
          { !token && <div className="flex row right">
              <div>
                <Button onClick={() => router.push('/login')}>Login</Button>
              </div>
              <div>
                <Button onClick={() => router.push('/register')}>Register</Button>
              </div>
            </div> }
        </div>
      </div>
      <div id="content">
        {children}
      </div>
      <div id="footer" className="flex column center">
        <div className="flex row">
          <div style={{flexGrow: "1", textAlign: "left"}}>
            A Blank Pages Project &copy; 2025
          </div>
          <div style={{flexGrow: "1", textAlign: "right"}}>
            <Link href="/about" passHref>About</Link>
          </div>
        </div>
      </div>
    </div>
  )
}