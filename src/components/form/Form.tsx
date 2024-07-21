import { useForm } from "@tanstack/react-form";

interface FormProps<T, O, F> {
  onSubmit: (values: T) => Promise<void>;
  formOpts: O;
  formFields: F[];
}

const Form = <
  T,
  O,
  F extends {
    name: string;
    label: string;
    type: string;
    validation?: (value: unknown) => string | undefined;
    options?: string[];
  },
>({
  onSubmit,
  formFields,
  formOpts,
}: FormProps<T, O, F>) => {
  const form = useForm({
    ...formOpts,
    onSubmit: async (values) => {
      try {
        await onSubmit(values.value as T);
        form.reset();
      } catch (error) {
        console.error(error);
      }
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
                  formField.validation?.(value) || undefined
              },
            })}
            children={(field) => (
              <div className="fields-layout">
                <label htmlFor={field.name}>{formField.label}</label>
                {formField.type === "select" && (
                  <select
                    className="input"
                    id={field.name}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    {formField.options?.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {formField.type === "text" && (
                  <input
                    className="input"
                    type={formField.type}
                    id={field.name}
                    autoComplete="on"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
                {formField.type === "number" && (
                  <input
                    className="input"
                    type={formField.type}
                    id={field.name}
                    autoComplete="on"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                )}
                {formField.type === "checkbox" && (
                  <input
                    className="input"
                    type={formField.type}
                    id={field.name}
                    checked={field.state.value as boolean}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      field.handleChange(e.target.checked);
                    }}
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
