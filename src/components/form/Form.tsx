import { useForm } from "@tanstack/react-form";
import { FC } from "react";
import { UserFormData } from "./form-types";

interface FormProps {
  onSubmit: (values: UserFormData) => Promise<void>;
  formOpts: any;
  formFields: any[];
}

const Form: FC<FormProps> = ({ onSubmit, formFields, formOpts }) => {
  const form = useForm({
    ...formOpts,
    onSubmit: async (values) => {
      try {
        await onSubmit(values.value as UserFormData);
      } catch (error) {
        console.error(error);
      }
      console.log(values.value);
      form.reset();
    },
  });

  return (
    <div>
      <div>form</div>
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
                    formField.validation.type === "required" && !value
                      ? formField.validation.message
                      : undefined,
                },
              })}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>{formField.label}</label>
                  {formField.type === "select" ? (
                    <select
                      id={field.name}
                      value={field.state.value?.toString()}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          formField.optionsType === "boolean"
                            ? e.target.value === "true"
                              ? true
                              : false
                            : e.target.value
                        )
                      }
                    >
                      {formField.options.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
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
                </>
              )}
            />
          </div>
        ))}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default Form;
