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
			</div>
		</header>
	)
}

export default Header
