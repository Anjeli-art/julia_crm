import React, {memo, useEffect, useState} from "react";
import {v1} from "uuid";
import s from "../Kindergarten/Kindergarten.module.css";
import {Table} from "../Table/Table";
import {getDateForClass} from "../chared/helpers";

export type DataForKindergartenType = {
    id: string
    name?: string;
    date: string;
    sum: string
    phone?: string;
    comment: string;
}

export const Kindergarten = memo(() => {

    const headerTable = {
        name: "фио",
        date: "дата платежа",
        sum: "сумма",
        phone: "телефон",
        comment: "комментарий",
        del: ""
    }
    const [tableDataGor, setTableDataGor] = useState<DataForKindergartenType[]>(() => {
        const savedData = localStorage.getItem('gor')
        return savedData ? JSON.parse(savedData) : []
    })
    const [tableDataKuz, setTableDataKuz] = useState<DataForKindergartenType[]>(() => {
        const savedData = localStorage.getItem('kuz')
        return savedData ? JSON.parse(savedData) : []
    })
    const [tableDataAnk, setTableDataAnk] = useState<DataForKindergartenType[]>(() => {
        const savedData = localStorage.getItem('ank')
        return savedData ? JSON.parse(savedData) : []
    })

    const addDateHandlerGor = (formData: DataForKindergartenType) => {
        const newData = [...tableDataGor, {
            id: v1(),
            name: formData.name || ' ',
            date: formData.date || ' ',
            sum: formData.sum || ' ',
            phone: formData.phone || ' ',
            comment: formData.comment || ' '
        }]
        setTableDataGor(newData)
    }

    const deleteDateHandlerGor = (id: string) => {
        const filterData = tableDataGor.filter(el => el.id !== id)
        setTableDataGor(filterData)
    }

    const addDateHandlerKuz = (formData: DataForKindergartenType) => {
        const newData = [...tableDataKuz, {
            id: v1(),
            name: formData.name || ' ',
            date: formData.date || ' ',
            sum: formData.sum || ' ',
            phone: formData.phone || ' ',
            comment: formData.comment || ' '
        }]
        setTableDataKuz(newData)
    }

    const deleteDateHandlerKuz = (id: string) => {
        const filterData = tableDataKuz.filter(el => el.id !== id)
        setTableDataKuz(filterData)
    }

    const addDateHandlerAnk = (formData: DataForKindergartenType) => {
        const newData = [...tableDataAnk, {
            id: v1(),
            name: formData.name || ' ',
            date: formData.date || ' ',
            sum: formData.sum || ' ',
            phone: formData.phone || ' ',
            comment: formData.comment || ' '
        }]
        setTableDataAnk(newData)
    }

    const deleteDateHandlerAnk = (id: string) => {
        const filterData = tableDataAnk.filter(el => el.id !== id)
        setTableDataAnk(filterData)
    }

    useEffect(() => {
        localStorage.setItem('gor', JSON.stringify(tableDataGor))
    }, [tableDataGor])

    useEffect(() => {
        localStorage.setItem('kuz', JSON.stringify(tableDataKuz))
    }, [tableDataKuz])

    useEffect(() => {
        localStorage.setItem('ank', JSON.stringify(tableDataAnk))
    }, [tableDataAnk])

    return (
        <section className={s.kindergarten}>
            <div className={s.container}>
                <div>
                    <Table keyHeader={headerTable} tableData={tableDataGor} name={"Гордеевка"}
                           onDelete={deleteDateHandlerGor}
                           onAdd={addDateHandlerGor}/>
                    <Table keyHeader={headerTable} tableData={tableDataKuz} name={"Кузнечиха"}
                           onDelete={deleteDateHandlerKuz}
                           onAdd={addDateHandlerKuz}/>
                    <Table keyHeader={headerTable} tableData={tableDataAnk} name={"Анкудиновка"}
                           onDelete={deleteDateHandlerAnk} onAdd={addDateHandlerAnk}/>
                </div>
            </div>
        </section>
    )
})
