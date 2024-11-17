import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({children}) => {
  return (
    <div className="bg-contentBg text-textColor">
      <Header />
      {/* <Navbar /> */}
      <main className="container mx-auto items-center justify-between min-h-80">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
