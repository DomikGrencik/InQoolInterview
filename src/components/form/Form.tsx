import { useForm } from "@tanstack/react-form";
import { parseFunction } from "@utils/parseFunction";
import { ZodSchema } from "zod";

interface FormProps<T, O, F> {
  onSubmit: (values: T) => Promise<void>;
  formOpts: O;
  formFields: F[];
  schema: ZodSchema<T>;
}

const Form = <
  T,
  O,
  F extends {
    name: string;
    label: string;
    type: string;
    validation?: { type: string; message: string };
    options?: string[];
  },
>({
  onSubmit,
  formFields,
  formOpts,
  schema, // Add the 'schema' parameter
}: FormProps<T, O, F>) => {
  const form = useForm({
    ...formOpts,
    onSubmit: async (values) => {
      const parsedValues = parseFunction(values.value, schema);

      try {
        await onSubmit(parsedValues as T);
      } catch (error) {
        console.error(error);
      }
      //console.log(values.value);
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {formFields.map((formField) => (
        <div key={formField.name}>
          <form.Field
            name={formField.name}
            {...(formField.validation && {
              validators: {
                onChange: ({ value }) =>
                  formField.validation?.type === "required" && !value
                    ? formField.validation.message
                    : undefined,
              },
            })}
            children={(field) => (
              <div className="fields-layout">
                <label htmlFor={field.name}>{formField.label}</label>
                {formField.type === "select" ? (
                  <select
                    className="input"
                    id={field.name}
                    value={field.state.value?.toString()}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    {formField.options?.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="input"
                    type={formField.type}
                    id={field.name}
                    autoComplete="on"
                    value={field.state.value?.toString()}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            )}
          />
        </div>
      ))}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            id="form-button"
            className="button"
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
    </form>
  );
};

export default Form;
