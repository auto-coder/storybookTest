import moment from "moment";
import 'moment/locale/tr';
import 'moment/locale/en-au';

export enum MODE {
    DATEONLY = "DateOnly",
    DATETIME = "DateTime",
    TIMEONLY = "TimeOnly"
}

export enum FORMAT {
    LONGDATETIME = "LongDateTime",
    SHORTDATETIME = "ShortDateTime",
    SHORTDATE = "ShortDate",
    LONGDATE = "LongDate",
    SHORTTIME = "ShortTime",
    LONGTIME = "LongTime"
}

export const formatDate = (date: Date | undefined, format: string) => {
    let returnedValue;
    if (!date) return "";
    switch (format) {
        case FORMAT.LONGDATETIME || FORMAT.LONGDATE: {
            returnedValue = moment(date).lang("tr").format("DD MMMM YYYY")
            break;
        }
        case FORMAT.SHORTDATE || FORMAT.SHORTDATETIME: {
            returnedValue = moment(date).format("DD.MM.YYYY")
            break;
        }
        default: {
            returnedValue = moment(date).format("DD.MM.YYYY")
            break;
        }
    }
    return returnedValue
}


export const formatTime = (time: string | undefined, format: string) => {
    let returnedValue;
    if (!time) return "";
    switch (format) {
        case FORMAT.LONGDATETIME || FORMAT.LONGTIME: {
            returnedValue = time + ":00"
            break;
        }
        case FORMAT.SHORTTIME || FORMAT.SHORTDATETIME: {
            returnedValue = time || ""
            break;
        }
        default: {
            returnedValue = time || ""
            break;
        }
    }
    return returnedValue
}

