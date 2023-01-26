# @logo-rn/logo-numeric-edit

<LogoNumericEdit/> allows user to enter and edit text with type of numbers

[![npm version](https://badgen.net/npm/v/@logo-rn/logo-numeric-edit)](https://www.npmjs.com/package/@logo-rn/logo-numeric-edit)

## Installation

Install the component:

```sh
npm i @logo-rn/logo-numeric-edit -s
```

## Usage

Once installed, import the component in your application:

```js
import {LogoNumericEdit} from '@logo-rn/logo-numeric-edit';
```

```js
  const [value, setvalue] = useState("");
  //...
  <LogoNumericEdit
      maxValue={100} 
      id="NUMERIC_EDIT"
      value={value}
      onChangeText={setValue}
  />
```

### For more detailed information, please visit:
[Logo Elements Documentation ↗](http://elements.logo.com.tr)
