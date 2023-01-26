# @logo-rn/logo-text-edit

<LogoTextEdit/> allows user to enter and edit text.

[![npm version](https://badgen.net/npm/v/@logo-rn/logo-text-edit)](https://www.npmjs.com/package/@logo-rn/logo-text-edit)

## Installation

Install the component:

```sh
npm i @logo-rn/logo-text-edit -s
```

## Usage

Once installed, import the component in your application:

```js
import {LogoTextEdit} from '@logo-rn/logo-text-edit';
```

```js
 const [value, setvalue] = useState("");
  //...
  <LogoTextEdit 
      id="TextEdit" 
      text={value} 
      onChangeText={setvalue} 
      watermarkText={"placeholder"} watermarkEnabled 
   />
```

### For more detailed information, please visit:
[Logo Elements Documentation ↗](http://elements.logo.com.tr)
