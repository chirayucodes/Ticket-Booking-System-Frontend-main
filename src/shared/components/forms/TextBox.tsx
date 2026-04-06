import { useState } from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface TextBoxProps<TForm extends FieldValues> {
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  name?: Path<TForm>;
  control?: Control<TForm>;
  errorMessage?: string;
  value?: string;
  onChange?: (v: string) => void;
  rules?: RegisterOptions<TForm, Path<TForm>>;
}

export default function TextBox<TForm extends FieldValues>(
  props: TextBoxProps<TForm>,
) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = props.type === "password";
  const inputType =
    isPasswordField && showPassword ? "text" : props.type || "text";

  const inputClasses = `
    w-full py-3 pl-4 pr-12 rounded-xl 
    bg-white/10 border border-white/20 
    text-white placeholder-gray-400 
    backdrop-blur-sm transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-[#F84464]/50 focus:border-[#F84464]/50
  `;

  return (
    <div className="mb-5">
      <label className="block text-gray-200 text-sm font-semibold mb-2 ml-1">
        {props.label}
      </label>

      {!props.control ? (
        <div className="relative">
          <input
            className={inputClasses}
            type={inputType}
            placeholder={props.placeholder}
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
          />
          {props.errorMessage && (
            <p className="text-red-400 text-xs mt-1 ml-1">
              {props.errorMessage}
            </p>
          )}
        </div>
      ) : (
        <Controller
          name={props.name!}
          control={props.control}
          rules={props.rules}
          render={({ field, fieldState }) => (
            <div className="relative">
              <input
                {...field}
                className={`${inputClasses} ${fieldState.error ? "border-red-500 ring-1 ring-red-500" : ""}`}
                type={inputType}
                placeholder={props.placeholder}
              />

              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-[#F84464] transition-colors px-2 py-1"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              )}

              {fieldState.error && (
                <p className="text-red-400 text-xs mt-1 ml-1 font-medium italic">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
}
