# CKD Vue Select

A foundational select input component that aims to be as simple and bare bones as possible so that it can be extended from in other components that add needed features. It is meant to "just work," with behavior that mimics native select inputs as close as possible.

## Installation

```
yarn add @ckd/vue-select@0.1.1-alpha.7
```

## Demo

A simple demo of several component implementations can be found in the package's /demo directory. It can be run using `yarn serve`

## Usage

Register the component for use in a Vue application

```
import Select from '@ckd/vue-select'
import '@ckd/vue-select/dist/@ckd/vue-select.css'
Vue.component('v-select', Select)
```

or, use UMD:

```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@ckd/vue-select"></script>

<link rel="stylesheet" href="https://unpkg.com/@ckd/vue-select@0.1.1-alpha.7/dist/@ckd/vue-select.css">

<script>
new Vue({
  components: {
    'v-select': window['@ckd/vue-select']
  }
}).$mount('#app')
</script>
```

Then, use the component in your markup
```
<v-select v-model="selection" :options="options"></v-select>
```

Options are always defined as an array of objects, where each object represents an option or option group, in the following format:

```
[
    {
        "label": "Option A",
        "value": 0
    },
    {
        "label": "Option B",
        "value": 1,
        "disabled": true,                                  // Disable the option
        "item": "<strong>Option B is not allowed</strong>" // Define the "item" key to style the look of the text when in an option component
    },
    {
        "label": "Option C",
        "options": [                                       // Providing an "options" key makes the option an optgroup
            {
                "label": "Option D",
                "value": 2
            }
        ]
    }
]
```

Things to note about the options input data.

In the case of options:
- Reserved keys for options are `label`, `value`, `item`, `disabled`, `options`, `selected`, and `state`
    - Any other keys defined are still valid, and will simply be passed through to the option components `option` prop.
    - The `state` key that appears on the resulting option object is itself a hash that holds data relating to the current state of the option, such as whether it is hovered/highlighted, it's index in the list, it's "depth" relative to any parent optgroups, etc.
- The bare minimum to have a functioning component is to provide the `label` and `value` keys.
- The difference between `label` and the optional `item` keys is in where each is used. Rendered options by default will display the value of `item` (which by default is just the value of `label`), but in selected "token" boxes, the `label` value will be used. Both support HTML markup.

In the case of optgroups:
- Any "option" that itself defines an `options` key becomes an optgroup. The `value` and `selected` keys are not needed for optgroups since they are irrelevant.
- Setting `disabled` on optgroups will also disable every child option & optgroup.

### Extending Option or Optgroup components

If you want to customize the markup/functionality of options or optgroups you can provide your own component (see `option` and `optgroup` options below), or extend the existing option or optgroup components like so:

```
import { Option, Optgroup } from '@ckd/vue-select'

// Your custom option component...
export default {
  name: 'VCustomOption',
  extends: Option,
  props: {
    option: {
      type: Object,
      required: true
    }
  }
}

// Your custom optgroup component...
export default {
  name: 'VCustomOptgroup',
  extends: Optgroup,
  props: {
    group: {
      type: Object,
      required: true
    }
  }
}
```

## Options

CKD Select supports the following options, all of which are passed as props on the component markup

| *Option*    | *Accepted Value*   | *Default*      | *Description*                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------|--------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options     | Array              | (empty array)  | The source of the select options. See Usage for details on how the array should be formatted.                                                                                                                                                                                                                                                                                                                                                       |
| placeholder | String             | (empty string) | Defines the placeholder text that appears in the text input field. The text input will be resized to fit the placeholder text automatically.                                                                                                                                                                                                                                                                                                        |
| size        | Number             | `400`          | The maximum height of the dropdown, in pixels. Depending on the available space on the screen at any given moment, the dropdown may appear smaller.                                                                                                                                                                                                                                                                                                 |
| disabled    | Boolean            | `false`        | Disables the input, as well as adds an `is-disabled` class to the components root element so it can be styled accordingly.                                                                                                                                                                                                                                                                                                                          |
| native      | Boolean / Function | `true`         | If `true`, the native input will be used only if a mobile browser is detected. If `false`, the native select input will never be used. If a function, the truthiness of the return value from that function will determine whether or not to use the native input. The function receives one argument, which is the value of `navigator.userAgent`, so you can write your own algorithm to determine whether or not to use the native select input. |
| selected    | String / Number    | `null`         | If defined, auto selects the option in the list with the matching value. If more than one option exists with the same value, the first will be selected.                                                                                                                                                                                                                                                                                            |
| option      | Vue Component      | VOption        | Allows overriding the rendered option component for each option in the dropdown, to further customize the markup/layout. See the package source's option.vue file to reference the current markup/attributes.                                                                                                                                                                                                                                       |
| optgroup    | Vue Component      | VOptgroup      | Allows overriding the rendered optgroup component for each "optgroup" in the dropdown. See the package source's optgroup.vue file to reference the current optgroup markup/attributes.                                                                                                                                                                                                                                                              |

## Tests

Tests are written with jest, and can be run with `yarn test`

## TODO

- Improve ADA, more aria-* and such
- Add autofocus functionality