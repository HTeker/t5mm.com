'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import { NewsletterEnum } from "@t5mm/shared";
import { useTranslation } from "react-i18next";

export default function Home() {
	const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <main style={{ maxWidth: "30rem" }}>
        <Link href="/">
          <Image
            src="/img/t5mm-logo-dark-mode.svg"
            alt="T5MM Logo"
            width={81}
            height={24}
          />
        </Link>
        <br />
        <br />
        <h1>Become a better professional in 5 mins a day.</h1>
        <br />
        {/* <h3>Get free daily</h3> */}
        <h3>Newsletters</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.values(NewsletterEnum).map((newsletter, index) => (
            <label key={index}>
              <input type="checkbox" value={newsletter} />
              {t(newsletter)}
            </label>
          ))}
        </div>
        <br />
        <div>
          <input id="email" type="email" placeholder="you@company.com" />
          <button>Subscribe</button>
        </div>
        <p>The best news, insights and actionable tips from the web!</p>
      </main>
    </div>
  );
}
