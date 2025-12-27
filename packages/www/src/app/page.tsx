import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import { NewsletterEnum } from "@t5mm/shared";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
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
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {Object.values(NewsletterEnum).map((newsletter, index) => (
            <label key={index}>
              <input type="checkbox" value={newsletter} />
              {newsletter}
            </label>
          ))}
        </div>
        <div>
          <input type="email" placeholder="you@company.com" />
          <button>Subscribe</button>
        </div>
        <p>Join other professionals for one daily email!</p>
      </main>
    </div>
  );
}
