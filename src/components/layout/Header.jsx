import styles from './Header.module.css'
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="src/assets/Logo.png" alt="Logo" />
                <p>Learn With Clarity</p>
                <div className={styles.headerStats}>
                    <button>Check Stats</button>
                </div>
            </div>
        </header>
    )

}
export default Header;