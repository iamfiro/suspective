// import style from './style.module.scss';
import MacProgram from "../../index.tsx";

export const Kakaotalk = ({id}: {id: string}) => {
    return (
        <MacProgram
            id={id}
            title="Calculator"
            icon="/icons/calculator.png"
        >
            <div>
                <span>하이</span>
                {/* 계산기 내용 */}
                <input type="number" />
                <button>+</button>
                <button>-</button>
            </div>
        </MacProgram>
    )
}