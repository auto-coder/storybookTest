# @logo-rn/logo-mask-edit

 <LogoMaskEdit/> allows user to enter and edit text with the given mask.

[![npm version](https://badgen.net/npm/v/@logo-rn/logo-mask-edit)](https://www.npmjs.com/package/@logo-rn/logo-mask-edit)

## Installation

Install the component:

```sh
npm i @logo-rn/logo-mask-edit -s
```

## Usage

Once installed, import the component in your application:

```js
import {LogoMaskEdit} from '@logo-rn/logo-mask-edit';
```

```js
   const [value, setvalue] = useState("");
  //...
   <LogoMaskEdit
      id="MASK_EDIT"
      text={value}
      onChangeText={setValue}
      maskOptions={{ editTemplates: "IPv6Address" }}
  />
```

### For more detailed information, please visit:
[Logo Elements Documentation ↗](http://elements.logo.com.tr)
