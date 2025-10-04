import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { theme } from "./theme";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Header />
      <main style={{ minHeight: "80vh", padding: theme.spacing.large }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
