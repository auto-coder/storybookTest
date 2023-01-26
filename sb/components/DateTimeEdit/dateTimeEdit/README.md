# @logo-rn/logo-date-time-edit

<LogoDateTimeEdit/> allows user to select the date and time.

[![npm version](https://badgen.net/npm/v/@logo-rn/logo-date-time-edit)](https://www.npmjs.com/package/@logo-rn/logo-date-time-edit)

## Installation

Install the component:

```sh
npm i @logo-rn/logo-date-time-edit -s
```

## Usage

Once installed, import the component in your application:

```js
import {LogoDateTimeEdit} from '@logo-rn/logo-date-time-edit';
```

```js
const [date, setDate] = React.useState(null);
     const [time, setTime] = React.useState(null);
     <LogoDateTimeEdit
        id="datetime"
        time={time}
        setTime={setTime}
        mode="DateTime"
        lang={lang}
        dateTime={date}
        setDate={(date: any) => setDate(date)}
    />
```

### For more detailed information, please visit:
[Logo Elements Documentation ↗](http://elements.logo.com.tr)
