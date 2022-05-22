# <Field />

`<Field />` component acts like a field in a form

# Example

## Code Sandbox

[https://codesandbox.io/embed/ecstatic-meadow-b31zxy?fontsize=14&hidenavigation=1&theme=dark](https://codesandbox.io/embed/ecstatic-meadow-b31zxy?fontsize=14&hidenavigation=1&theme=dark)

### App.js

```jsx
import React, { useState } from "react";

import { Form, FormikProvider, useFormik } from "formik";
import validationSchema from "./validationSchema";

import Field from "components/Field";

const App = () => {
  const [isFormGroup, setIsFormGroup] = useState(false);

  const formik = useFormik({
    // enable when you're on a edit mode
    // enableReinitialize: true,
    initialValues: {},
    validationSchema: validationSchema,
  });

  return (
    <FormikProvider value={{ validationSchema, ...formik }}>
      <h2>{isFormGroup ? "<Field.Group />" : "<Field />"}</h2>
      <Form>
        {isFormGroup ? (
          <Field.Group
            names={["firstName", "workExperience", "birthday", "resume"]}
          />
        ) : (
          <>
            {/* Regular Text Field */}
            <Field.Text
              name="firstName"
              label="نام"
              placeholder="نام خود را وارد کنید"
            />

            {/* Regular Number Field */}
            <Field.Number
              name="workExperience"
              label="سابفه کار(سال)"
              placeholder="سابقه کار خود را وارد نمایید"
            />

            {/* Date Field with date picker */}
            <Field.Date name="birthday" label="تاریخ تولد" />

            {/* File Field */}
            <Field.Uploader
              name="resume"
              label="رزومه"
              fileType="image"
              acceptFormat="image/*"
            />
          </>
        )}
      </Form>
      <br />
      <div className="is-form-group">
        <label htmlFor="isFormGroup">Form Group Example</label>
        <input
          id="isFormGroup"
          type="checkbox"
          onChange={(e) => setIsFormGroup(e.target.checked === true)}
        />
      </div>
    </FormikProvider>
  );
};

export default App;
```

### validationSchema.js

```jsx
import Yup from "adapters/yupAdapter";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .label("نام")
    .placeholder("نام خود را وارد کنید")
    .required("ورود نام الزامیست"),
  workExperience: Yup.number()
    .label("سابفه کار(سال)")
    .placeholder("سابقه کار خود را وارد نمایید")
    .min(0, "حداقل سال وارد شده برابر با صفر می باشد"),
  birthday: Yup.date().label("تاریخ تولد").required(""),
  resume: Yup.array()
    .label("رزومه")
    .of(Yup.mixed())
    .fieldComponent({
      type: "uploader",
      props: { fileType: "image", acceptFormat: "image/*" },
    }),
});

export default schema;
```

# Sub Components

[<Text />](Field%2053142d11701e4d35b664e7d08656ab76/Text%204fe2b2e565df4f6b9744790e865924d8.md)

[<Number />](Field%2053142d11701e4d35b664e7d08656ab76/Number%20a9e115590d754c4d8f8dfec8fc51e6b0.md)

[<Date />](Field%2053142d11701e4d35b664e7d08656ab76/Date%20c014ea7be23f4ee9b21e33d193e9357c.md)

# <Field.Text />

# <Field.Number />

# <Field.Date />

# <Field.Select />

# <Field.Uploader />

# <Field.Icon/>

# <Field.Location/>

You can add headings and subheadings in one of two ways:

You can add headings and subheadings in one of two ways:

- Type `/heading` or `/h1`, `/h2`, or `/h3` to choose the heading size you want.
- Use Markdown shortcuts, like `#`, `##`, and `###`.
    - Create inline code by wrapping text with ``` (or with the shortcut `cmd/ctrl + e`).
- Toggle lists streamline your content. Click the arrow to open.
    - Click the arrow again to hide this content.
    - Create a toggle by typing `/toggle` and pressing `enter`.
    - You can add anything to toggles, including images and embeds.

## Callout Blocks

<aside>
💡 Create a callout block like this by typing `/call` and pressing `enter`.
Helpful for adding inline instructions, warnings, disclaimers, and tips.
Change the emoji icon by clicking on it.

</aside>

## Code Blocks

You can add code notation to any Notion page:

- Type `/code` and press `enter`.
- Choose the language from the dropdown in the bottom right corner.
- Here's an example:

```html
Hover over this block to see the <b>Copy to Clipboard</b> option!
```

- Your teammates can select any code to comment on it.

## Organizing Pages

Instead of using folders, Notion lets you nest pages inside pages.

- Type `/page` and press `enter` to create a sub-page inside a page. Like this:

# Advanced Techniques

Check out this [Notion Editor 101](https://www.notion.so/Writing-editing-basics-68c7c67047494fdb87d50185429df93e) guide for more advanced tips and how-to's.