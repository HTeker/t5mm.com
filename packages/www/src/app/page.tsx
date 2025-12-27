"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import { NewsletterEnum } from "@t5mm/shared";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <header>
        <Link href="/">
          <Image
            src="/img/t5mm-logo-dark-mode.svg"
            alt="T5MM Logo"
            width={81}
            height={24}
          />
        </Link>
      </header>
      <main style={{ maxWidth: "30rem" }}>
        <h1>
          Become a <span className="underlined">better software engineer</span> in 5
          minutes a day.
        </h1>
        <br />
        {/* <h3>Get free daily</h3> */}
        <p>
          <b>Newsletters:</b>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {Object.values(NewsletterEnum).map((newsletter, index) => (
            <label key={index} style={{ display: "flex", alignItems: "center", gap: ".35rem" }}>
              <input type="checkbox" value={newsletter} />
              {t(newsletter)}
            </label>
          ))}
        </div>
        <br />
        <div style={{ display: "flex", gap: ".5rem" }}>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            style={{ minWidth: "16rem" }}
            autoFocus
          />
          <button>Subscribe</button>
        </div>
        <p style={{ fontSize: ".9rem", marginTop: ".5rem" }}>
          The best news, insights and actionable tips from the web!
        </p>
      </main>
      <footer>
        <a href="#">Privacy policy</a>
      </footer>
    </div>
  );
}
