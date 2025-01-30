export default function AuthLayout({
  children
}) {
  return(
    <div id="auth_layout">
      <div id="content" className="flex column center middle fullHeight">
        {children}
      </div>
    </div>
  )
}