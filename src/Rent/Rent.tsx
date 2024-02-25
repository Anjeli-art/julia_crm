import React, {memo, useEffect, useState} from "react";
import {v1} from "uuid";
import s from "../Rent/Rent.module.css";
import {Table} from "../Table/Table";


export type DataForRentType = {
    id: string
    date: string,
    address?: string,
    sum: string,
    comment: string
}

export const Rent = memo(() => {

    const headerTable = {address: "адрес", date: "дата платежа", sum: "сумма", comment: "комментарий", del: ""}
    const [tableData, setTableData] = useState<DataForRentType[]>(() => {
        const savedData = localStorage.getItem('rent')
        return savedData ? JSON.parse(savedData) : []
    })

    const addDateHandler = (formData: DataForRentType) => {
        console.log(formData)
        const newData = [...tableData, {
            id: v1(),
            address: formData.address || ' ',
            date: formData.date || ' ',
            sum: formData.sum || ' ',
            comment: formData.comment || ' '
        }]
        console.log(newData)
        setTableData(newData)
    }

    const deleteDateHandler = (id: string) => {
        const filterData = tableData.filter(el => el.id !== id)
        setTableData(filterData)
    }

    useEffect(() => {
        localStorage.setItem('rent', JSON.stringify(tableData))
    }, [tableData])

    return (
        <section className={s.rent}>
            <div className={s.container}>
                <Table keyHeader={headerTable} tableData={tableData} name={"Аренда"} onDelete={deleteDateHandler}
                       onAdd={addDateHandler}/>
            </div>
        </section>
    )
})
