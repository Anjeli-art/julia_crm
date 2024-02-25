import {ChangeEvent, memo, useState} from "react";
import s from "../InputGroup/InputGroup.module.css";
import {FormDateType} from "../Table/Table";

type InputGroupType = {
    name: string
    keyHeader: FormDateType
    onAdd: (formData: any) => void
}


export const InputGroup = memo(({name, keyHeader, onAdd}: InputGroupType) => {

    const [formData, setFormData] = useState<Record<string, string>>({})

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setFormData({
            ...formData,
            [name]: value || ""
        })
    }

    const clearData = () => {
        onAdd(formData)
        Object.keys(formData).map(el => formData[el] = "")
    }


    return (
        <div className={s.wrapper}>
            <span className={s.name}>{name}</span>
            {Object.keys(keyHeader).map((input: string, index: number) => input !== "del" &&
                <input key={index} className={s.input} type="text" placeholder={keyHeader[input]} name={input}
                       value={formData[input]}
                       onChange={onChangeInput}/>)}
            <button className={s.button} onClick={clearData}>добавить</button>
        </div>
    )
})
