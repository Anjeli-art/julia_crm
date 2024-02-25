import s from "../Primary/Primary.module.css";
import {memo, useEffect, useState} from "react";
import {getCurrentDateTime} from "../chared/helpers";
import {DataForKindergartenType} from "../Kindergarten/Kindergarten";
import {CreditType} from "../Credit/Credit";
import {DataForRentType} from "../Rent/Rent";

type WeatherResponseType = {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}


export const Primary = memo(() => {

    const [weather, setWeather] = useState<WeatherResponseType>()

    const [tableDataGor, setTableDataGor] = useState<number>(() => {
        const savedData = localStorage.getItem('gor')
        if (savedData) {
            return JSON.parse(savedData).reduce((acc: number, el: DataForKindergartenType) => Number(el.sum) + acc, 0)
        }
    })
    const [tableDataKuz, setTableDataKuz] = useState<number>(() => {
        const savedData = localStorage.getItem('kuz')
        if (savedData) {
            return JSON.parse(savedData).reduce((acc: number, el: DataForKindergartenType) => Number(el.sum) + acc, 0)
        }
    })
    const [tableDataAnk, setTableDataAnk] = useState<number>(() => {
        const savedData = localStorage.getItem('ank')
        if (savedData) {
            return JSON.parse(savedData).reduce((acc: number, el: DataForKindergartenType) => Number(el.sum) + acc, 0)
        }
    })

    const [creditData, setCreditData] = useState<number>(() => {
        const savedData = localStorage.getItem('credit')
        if (savedData) {
            return JSON.parse(savedData).reduce((acc: number, el: CreditType) => Number(el.sum) + acc, 0)
        }
    })

    const [rentData, setRentData] = useState<number>(() => {
        const savedData = localStorage.getItem('rent')
        if (savedData) {
            return JSON.parse(savedData).reduce((acc: number, el: DataForRentType) => Number(el.sum) + acc, 0)
        }
    })

    const [date, setDate] = useState<string>('')

    useEffect(() => {
        let timeout = setTimeout(() => {
            const newDate = getCurrentDateTime()
            setDate(newDate)
        }, 1000)
        return () => clearTimeout(timeout)
    }, [date])


    useEffect(() => {
        const APIkey = 'f8d561866b001d4796fa6ed1b3dae7d2'
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=520555&appid=${APIkey}`).then((res) => {
            return res.json()
        }).then((res) => setWeather(res))
    }, [])

    const normalizeWeather = weather ? Math.floor(weather.main.temp - 273) : ''

    const normalizeTableDataGor = tableDataGor || 0
    const normalizeTableDataKuz = tableDataKuz || 0
    const normalizeTableDataAnk = tableDataAnk || 0
    const normalizeRentData = rentData || 0

    const normalizeSum = normalizeTableDataGor + normalizeTableDataKuz + normalizeTableDataAnk + normalizeRentData

    return (
        <section className={s.homework}>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.content__top}>
                        <div className={s.temperature}>
                            <h2 className={s.temperature__capture}>Погода<span
                                className={s.temperature__info}>&#128202;</span></h2>
                            <span
                                className={s.temperature__info}>{`температура воздуха: ${normalizeWeather}`}&deg;</span>
                            <span className={s.temperature__info}>{`скорость ветра: ${weather?.wind.speed} м/с`}</span>
                            <img className={s.temperature__img}
                                 src={`http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`}/>
                        </div>
                        <div className={s.date}>
                            <h2 className={s.date__capture}>Дата и время<span className={s.date__info}>&#8986;</span>
                            </h2>
                            <span className={s.date__info}>{date}</span>
                        </div>
                    </div>
                    <div className={s.content__bottom}>
                        <div className={s.overall}>
                            <h2 className={s.overall__capture}>Общий доход<span
                                className={s.date__info}>&#128092;</span></h2>
                            <p className={s.overall__text}>{`Гордеевка: ${tableDataGor || 0}`}</p>
                            <p className={s.overall__text}>{`Кузнечиха: ${tableDataKuz || 0}`}</p>
                            <p className={s.overall__text}>{`Анкудиновка: ${tableDataAnk || 0}`}</p>
                            <p className={s.overall__text}>{`Аренда: ${rentData || 0}`}</p>
                            <div className={s.overall__border}></div>
                            <p className={s.overall__text}>{`${normalizeSum}`}</p>
                        </div>
                        <div className={s.overall}>
                            <h2 className={s.overall__capture}>Общий Расход<span
                                className={s.date__info}>&#128091;</span></h2>
                            <p className={s.overall__text}>{`Кредиты: ${creditData || 0}`}</p>
                            <div className={s.overall__border}></div>
                            <p className={s.overall__text}>{`${creditData || 0}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})
