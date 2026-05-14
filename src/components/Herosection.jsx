import styles from './Herosection.module.css'
const Herosection = () => {
return(
    
    <section className={styles.hero}>
        <div className={styles.heroContent}>
            <h1>Track. Analyze. Improve.</h1>
            <p>Manage your study sessions, monitor total hours, and visualize subject-wise performance.</p>
            <div className={styles.heroButton}>
                <button>Start Tracking</button>
            </div>
        </div>
    </section>
)
}
export default Herosection;