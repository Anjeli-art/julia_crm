type MonthsType = {
    [key: string]: string
}

export function getCurrentDateTime() {

    const currentDate = new Date();
    const months: MonthsType[] = [{'01': 'Январь'}, {'02': 'Февраль'}, {'03': 'Март'}, {'04': 'Апрель'}
        , {'05': 'Май'}, {'06': 'Июнь'}, {'07': 'Июль'}, {'08': 'Август'}, {'09': 'Сентябрь'}, {'10': 'Октябрь'}, {'11': 'Ноябрь'}, {'12': 'Декабрь'}]
    const year = currentDate.getFullYear();
    const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const monthString = months.find(m => m[month])

    const dateTimeString = `${hours}:${minutes}:${seconds} ${day} ${monthString![month]} ${year}`

    return dateTimeString;
}

export function getDateForClass(){
    const currentDate = new Date();
    const day = String(currentDate.getDate());
    return day
}
