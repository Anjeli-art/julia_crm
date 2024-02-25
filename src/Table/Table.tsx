import React, {memo} from "react";
import s from "../Table/Table.module.css";
import {InputGroup} from "../InputGroup/InputGroup";
import {DataForKindergartenType} from "../Kindergarten/Kindergarten";
import {DataForRentType} from "../Rent/Rent";
import {CreditType} from "../Credit/Credit";
import {getDateForClass} from "../chared/helpers";


export type FormDateType = {
    [key: string]: string
}


type TableType = {
    keyHeader: FormDateType
    tableData: DataForKindergartenType[] | DataForRentType[] | CreditType[]
    name: string
    onDelete: (id: string) => void
    onAdd: (formData: any) => void
}

export const Table = memo(({keyHeader, tableData, name, onAdd, onDelete}: TableType) => {

    const flag = tableData.length > 0 ? true : false
    const day = getDateForClass()

    return (
        <>
            <InputGroup name={name} keyHeader={keyHeader} onAdd={onAdd}/>
            {flag && <table className={s.table}>
                <thead className={s.table__head}>
                <tr className={s.table__headline}>
                    {Object.values(keyHeader).map((head, index) => <th className={s.table__string}
                                                                       key={index}>{head}</th>)}
                </tr>
                </thead>
                <tbody className={s.table__body}>
                {tableData.map((row, index) =>
                    <tr className={`${s.table__row} ${day === row.date? s.table__active : ''}`} key={index}>
                        {
                            Object.values(row).map((el, index) => row.id !== el &&
                                < td className={s.table__string} key={index}>{el}</td>)
                        }
                        <button className={s.table__button} onClick={() => onDelete(row.id)}>удалить</button>
                    </tr>
                )}
                </tbody>
            </table>}
        </>
    )
})
