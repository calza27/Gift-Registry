
import Link from "next/link"

export default function Home() {
	return (
		<div>
			<h1>Index page</h1>
			<Link href="/register" passHref>Register</Link>
			<br />
			<Link href="/login" passHref>Login</Link>
		</div>
	)
}
