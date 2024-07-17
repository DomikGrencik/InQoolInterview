import { useForm } from "@tanstack/react-form";
import { FC } from "react";
import { usersFormOpts } from "./FormOptions";

const Form: FC = () => {
  const form = useForm({
    ...usersFormOpts,
    onSubmit: async (values) => {
      console.log(values);
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
        <div>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? "Name is required" : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Name</label>
                <input
                  id={field.name}
                  autoComplete="on"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="gender"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Gender</label>
                <select
                  id={field.name}
                  autoComplete="on"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as "female" | "male" | "other"
                    )
                  }
                >
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="banned"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Banned</label>
                <select
                  id={field.name}
                  autoComplete="on"
                  value={field.state.value.toString()}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as unknown as boolean)
                  }
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            )}
          />
        </div>
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
