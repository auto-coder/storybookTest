# @logo-rn/logo-memo-edit

<LogoMemoEdit/> allows user to enter and edit multiline text.

[![npm version](https://badgen.net/npm/v/@logo-rn/logo-memo-edit)](https://www.npmjs.com/package/@logo-rn/logo-memo-edit)

## Installation

Install the component:

```sh
npm i @logo-rn/logo-memo-edit -s
```

## Usage

Once installed, import the component in your application:

```js
import {LogoMemoEdit} from '@logo-rn/logo-memo-edit';
```

```js
  const [value, setvalue] = useState("");
  //...
  <LogoMemoEdit 
      id="TextEdit" 
      text={value} 
      onChangeText={setvalue} 
      rows={4}
   />
```

### For more detailed information, please visit:
[Logo Elements Documentation ↗](http://elements.logo.com.tr)
