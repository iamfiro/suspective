import {useEffect, useState} from 'react';
import styles from '../../../styles/scene/intranet/boot.module.scss';
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";

const IntranetBoot = () => {
	const [logs, setLogs] = useState<string[]>([]);

	const bootMessages: string[] = [
		"[ OK ] Started Show Plymouth Boot Screen",
		"[    0.000000] Linux version 5.4.0-42-generic (buildd@lcy01-amd64-026)",
		"[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.4.0-42-generic",
		"[    0.000000] KERNEL supported cpus:",
		"[    0.000000]   Intel GenuineIntel",
		"[    0.000000]   AMD AuthenticAMD",
		"[    0.000000]   Hygon HygonGenuine",
		"[    0.000000]   Centaur CentaurHauls",
		"[    0.267589] Memory: 8046284K/8373244K available (10240k kernel code, 1324k rwdata)",
		"[    0.456123] CPU0: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz stepping 10",
		"[    0.489234] Performance Events: PEBS fmt3+, Skylake events, 32-deep LBR",
		"[    0.567890] rcu: Hierarchical SRCU implementation.",
		"[    0.789234] Initializing cgroup subsys cpu",
		"[    0.823456] NMI watchdog: Enabled",
		"[    0.945678] smpboot: CPU0: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz (family: 0x6, model: 0x9e)",
		"[    1.123456] systemd[1]: Detected architecture x86-64",
		"[    1.234567] Bluetooth: Core ver 2.22",
		"[    1.345678] Bluetooth: HCI device and connection manager initialized",
		"[    1.445678] usb 1-1: New USB device found, idVendor=0x8087, idProduct=0x0029",
		"[    1.567890] eth0: Link is up at 1000 Mbps, full duplex, flow control rx/tx",
		"[    1.678901] Starting network manager...",
		"[ OK ] Started Network Manager",
		"[    1.789012] Loading initial ramdisk...",
		"[    1.890123] Checking file systems...",
		"[ OK ] Started File System Check on Root Device",
		"[    2.012345] Mounting root filesystem...",
		"[ OK ] Mounted Root File System",
		"[    2.123456] Starting system logger...",
		"[ OK ] Started System Logging Service",
		"[    2.234567] Initializing random number generator...",
		"[    2.345678] Starting system message bus...",
		"[ OK ] Started D-Bus System Message Bus",
		"[    2.456789] Starting OpenSSH server...",
		"[ OK ] Started OpenSSH Server",
		"[    2.567890] Starting Apache Web Server...",
		"[ OK ] Started Apache Web Server",
		"[    2.678901] Starting MySQL database server...",
		"[ OK ] Started MySQL Community Server",
		"[    2.789012] Starting firewall...",
		"[ OK ] Started Firewall",
		"[    2.890123] Starting user manager for UID 0...",
		"[ OK ] Started User Manager for UID 0",
		"[    3.012345] System startup complete.",
		"Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-42-generic x86_64)",
		"",
		"* Documentation:  https://help.ubuntu.com",
		"* Management:     https://landscape.canonical.com",
		"* Support:        https://ubuntu.com/advantage",
		"",
		"Loading system services... Please wait..."
	];

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < bootMessages.length) {
                setLogs(prev => [...prev, bootMessages[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {logs.map((log, index) => {
                    const isOK = log?.includes("[ OK ]");
                    const isError = log?.includes("[ERROR]");

                    return (
                        <div
                            key={index}
                            className={`${styles.logLine} ${
                                isOK ? styles.success :
                                isError ? styles.error :
                                styles.normal
                            }`}
                        >
                            {log}
                        </div>
                    );
                })}
            </div>
	        <USPoliceLogo />
        </div>
    );
}

export default IntranetBoot;