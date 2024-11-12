import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <main className="container mx-auto items-center justify-between min-h-full">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
