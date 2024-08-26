"use client"
import Link from "next/link"
import styles from "./header.module.scss"
const Header = () => {
	return (
		<header id="header" className={styles.header}>
			<div className={styles["header-container"]}>
				<Link href={"/"} className={styles["header-main"]}>
					<h1 className={styles["title"]}>Bitten</h1>
				</Link>
				<div>
					<a href="https://github.com/1kki/gpt3-ko">github</a>
					{/* <button onClick={() => color.setItem("light")}>Light</button>
					<button onClick={() => color.setItem("dark")}>Dark</button> */}
				</div>
			</div>
		</header>
	)
}

export default Header
