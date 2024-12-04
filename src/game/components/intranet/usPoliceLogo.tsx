import PoliceLogo from '../../../../public/images/us_police_logo.svg'
import styles from './usePoliceLogo.module.scss';

const USPoliceLogo = () => {
	return (
		<div className={styles.container}>
			<img className={styles.img} src={PoliceLogo} alt="US Police Logo" />
		</div>
	)
}

export default USPoliceLogo