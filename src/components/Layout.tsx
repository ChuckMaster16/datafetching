import React from "react";
import { Inter } from "@next/font/google";
import { Container, Content } from "rsuite";


import type { LayoutProps } from "@/common/typing/proptypes";
import Header from "./Header";

//import { Header } from "@components";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children}: LayoutProps) {
  return (
    <Container className={`h-screen overflow-y-auto px-0 lg:px-[48px] p-10`}>
      <Header/>
      <Content className={`${inter.className} h-full`}>{children}</Content>
    </Container>
  );
}
