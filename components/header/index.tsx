import Link from "next/link"
import styles from "./header.module.scss"
const Header = () => {
	return (
		<header id="header" className={styles.header}>
			<div className={styles["header-container"]}>
				<div>
					<Link href={"/"}>로고</Link>
				</div>
				<div>
					<a href="https://github.com/1kki/gpt3-ko">github</a>
				</div>
			</div>
		</header>
	)
}

export default Header
