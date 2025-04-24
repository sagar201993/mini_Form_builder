import React, { useState, useEffect, useRef } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../stateManagement/store";
import {
  addField,
  deleteField,
  updateField,
} from "../../stateManagement/formState/formSlice";

import { FieldType } from "../../types/formTypes";
import {
  TextField,
  ButtonField,
  DropdownField,
  RadioButtonField,
  CheckboxField,
  SwitchField,
} from "../FormField";
import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

// Props expected from the parent component
interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

// Main FormBuilder component
const FormBuilder: React.FC<Props> = ({ register, errors }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Pulling state from Redux store
  const { backgroundColor, showLabels, fontFamily, fields, language } =
    useSelector((state: RootState) => state.form);

  //Language  Translation hook
  const { t: rawT } = useTranslation();
  const t = rawT as (key: string) => string;

  // Local component state
  const [showSelector, setShowSelector] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null); // Ref for menu dropdown (ckeck for outside click detection)

  // Close menu check when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }

    if (menuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Available field types to add field
  const fieldTypes = [
    { value: "text", label: t("textField") },
    { value: "button", label: t("button") },
    { value: "dropdown", label: t("dropdown") },
    { value: "radio", label: t("radioButton") },
    { value: "checkbox", label: t("checkbox") },
    { value: "switch", label: t("switchOption") },
  ];

  // Filtered options based on user input
  const filtered = fieldTypes.filter((f) =>
    f.label.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle menu open state
  const openMenu = (index: number) =>
    setMenuOpen(menuOpen === index ? null : index);

  // used for  editing of a field
  const startEdit = (index: number) => {
    const field = fields[index];
    setEditingIndex(index);
    setEditLabel(field.label[language] || "");
    setEditPlaceholder(field.placeholder?.[language] || "");
    setMenuOpen(null);
  };

  // Save function for edited label/placeholder
  const saveEdit = (index: number) => {
    dispatch(updateField({ index, label: editLabel }));

    // Only text and dropdown fields use a placeholder
    if (["text", "dropdown"].includes(fields[index].type)) {
      dispatch(updateField({ index, placeholder: editPlaceholder }));
    }

    setEditingIndex(null);
  };

  // Safely get localized value from an object
  const getLocalized = (
    obj: Record<string, string> | undefined,
    lang: string
  ): string => {
    if (!obj) return "";
    return obj[lang] || obj["en"] || Object.values(obj)[0] || "";
  };

  const resolveLabel = (label: string) => {
    return t(label) !== label ? t(label) : label;
  };

  return (
    <div className={`form-container ${backgroundColor}`} style={{ fontFamily }}>
      <h2
        className={`form-title ${
          backgroundColor === "bg-black" ? "text-white" : "text-black"
        }`}
      >
        {t("untitledForm")}
      </h2>

      <div className="space-y-4">
        {/* Loop through each and every  field and render it */}
        {fields.map((field, i) => (
          <div key={i} className="field-wrapper">
            {editingIndex === i ? (
              // Editing UI
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editLabel}
                  placeholder={t("labelPlaceholder")}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="input-edit"
                />
                {field.type === "text" && (
                  <input
                    type="text"
                    value={editPlaceholder}
                    placeholder={t("valuePlaceholder")}
                    onChange={(e) => setEditPlaceholder(e.target.value)}
                    className="input-edit"
                  />
                )}
                <div className="edit-buttons">
                  <button
                    type="button"
                    onClick={() => saveEdit(i)}
                    className="button-save"
                  >
                    {t("save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingIndex(null)}
                    className="button-cancel"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            ) : (
              // Normal view mode with action menu
              <div className="field-actions">
                <div className="flex-1">
                  {/* Dynamically render field component based on type */}
                  {field.type === "text" && (
                    <TextField
                      name={field.name}
                      label={resolveLabel(getLocalized(field.label, language))}
                      register={register}
                      placeholder={getLocalized(field.placeholder, language)}
                      errorMessage={errors[field.name]?.message as string}
                      showLabels={showLabels}
                    />
                  )}
                  {field.type === "button" && (
                    <ButtonField
                      label={resolveLabel(getLocalized(field.label, language))}
                      showLabels={showLabels}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <DropdownField
                      name={field.name}
                      label={resolveLabel(getLocalized(field.label, language))}
                      register={register}
                      errorMessage={errors[field.name]?.message as string}
                      showLabels={showLabels}
                    />
                  )}
                  {field.type === "radio" && (
                    <RadioButtonField
                      name={field.name}
                      label={resolveLabel(getLocalized(field.label, language))}
                      register={register}
                      errorMessage={errors[field.name]?.message as string}
                      showLabels={showLabels}
                    />
                  )}
                  {field.type === "checkbox" && (
                    <CheckboxField
                      name={field.name}
                      label={resolveLabel(getLocalized(field.label, language))}
                      register={register}
                      errorMessage={errors[field.name]?.message as string}
                      showLabels={showLabels}
                    />
                  )}
                  {field.type === "switch" && (
                    <SwitchField
                      name={field.name}
                      label={resolveLabel(getLocalized(field.label, language))}
                      register={register}
                      errorMessage={errors[field.name]?.message as string}
                      showLabels={showLabels}
                    />
                  )}
                </div>

                {/* Field options menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => openMenu(i)}
                    className={`menu-button ${showLabels ? "top-6" : "top-1"}`}
                  >
                    <MoreVertical size={18} />
                  </button>
                  {menuOpen === i && (
                    <div ref={menuRef} className="menu">
                      <button
                        onClick={() => startEdit(i)}
                        className="menu-item"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => dispatch(deleteField(i))}
                        className="menu-item menu-delete"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Field type selector dropdown */}
        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => setShowSelector(!showSelector)}
            className="add-field-btn"
          >
            + {t("addNewField")}
          </button>

          {showSelector && (
            <div className="selector-menu">
              <div className="selector-search">
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder={t("search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filtered.map((ft) => (
                  <div
                    key={ft.value}
                    onClick={() => {
                      dispatch(addField({ type: ft.value as FieldType }));
                      setSearch("");
                      setShowSelector(false);
                    }}
                    className="selector-option"
                  >
                    {ft.label}
                  </div>
                ))}
                {!filtered.length && (
                  <div className="selector-no-match">{t("noMatchesFound")}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
