import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div style={{ 
            minHeight: '100vh',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <div className={styles.loader} />
        </div>
    );
}
