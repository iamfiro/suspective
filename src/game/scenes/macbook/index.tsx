import style from '../../../styles/scene/macbook/index.module.scss'
import MenuBar from "../../components/macbook/menuBar.tsx";

export const Macbook = () => {
    return (
        <main className={style.container}>
            <MenuBar />
        </main>
    )
}

export default Macbook;