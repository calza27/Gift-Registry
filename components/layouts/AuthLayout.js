export default function AuthLayout({
  children
}) {
  return(
    <div style={{
      backgroundColor: "#FCF5E5",
      height: "100vh"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
      }}>
        {children}
      </div>
    </div>
  )
}