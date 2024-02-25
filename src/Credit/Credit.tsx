import React, {memo, useEffect, useState} from "react";
import { v1 } from "uuid";
import s from "../Credit/Credit.module.css";
import {Table} from "../Table/Table";

export type CreditType = {
    id: string
    name?: string
    date: string
    sum: string
    comment: string
}

export const Credit = memo(() => {

    const headerTable = {name: "организация", date: "дата платежа", sum: "сумма", comment: "комментарий", del: ""}
    const [tableData, setTableData] = useState<CreditType[]>(() => {
        const savedData = localStorage.getItem('credit')
        return savedData ? JSON.parse(savedData) : []
    })

    const addDateHandler = (formData: CreditType) => {
        const newData = [...tableData, {
            id: v1(),
            name: formData.name || ' ',
            date: formData.date || ' ',
            sum: formData.sum || ' ',
            comment: formData.comment || ' '
        }]
        setTableData(newData)
    }

    const deleteDateHandler = (id: string) => {
        const filterData = tableData.filter(el => el.id !== id)
        setTableData(filterData)
    }

    useEffect(() => {
        localStorage.setItem('credit', JSON.stringify(tableData))
    }, [tableData])

    return (
        <section className={s.credit}>
            <div className={s.container}>
                <Table keyHeader={headerTable} tableData={tableData} name={"Кредиты"} onDelete={deleteDateHandler}
                       onAdd={addDateHandler}/>
            </div>
        </section>
    )
})
