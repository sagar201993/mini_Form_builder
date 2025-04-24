import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FormBuilder from "../components/Forms/FormBuilder";
import SettingsPanel from "../components/UI/SettingPannel";
import { RootState } from "../stateManagement/store";
import { useLogoutMutation } from "../services/authApi";
import { buildValidationSchema } from "../utils/Validations";

const FormLayout: React.FC = () => {
  const { t: rawT } = useTranslation();
  const t = rawT as (key: string) => string;

  // Access form configuration state from Redux
  const formState = useSelector((state: RootState) => state.form);

  const navigate = useNavigate();
  const [logout] = useLogoutMutation(); // RTK Query logout mutation

  // Memoized validation schema based on form fields
  const schema = useMemo(
    () => buildValidationSchema(formState.fields),
    [formState.fields]
  );

  // React Hook Form setup with Yup schema validation
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validate on blur
  });

  // Submit handler
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", {
      ...formState,
      values: data,
    });
    // Handle submission logic (e.g., store, send to API, etc.)
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="layout-form">
      {/* Sidebar with navigation */}
      <div className="sidebar">
        <h2 className="sidebar-title">{t("formBuilder")}</h2>
        <nav className="sidebar-nav">
          <div className="sidebar-link">{t("myForms")}</div>
          <div className="sidebar-link">{t("analytics")}</div>
          <div className="sidebar-link">{t("knowledgeBase")}</div>
          <div className="sidebar-link">{t("helpSupport")}</div>
        </nav>

        {/* Profile & logout section */}
        <div className="mt-auto pt-6 border-t border-gray-700 space-y-2 text-sm">
          <div className="sidebar-link flex items-center gap-2">
            <span>👤</span> {t("myProfile")}
          </div>
          <div
            className="sidebar-link-logout flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <span>🚪</span> {t("logout")}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Page header and title */}
        <div className="page-header">{`${t("myForms")} > ${t(
          "createNewForm"
        )}`}</div>
        <h1 className="page-title">{t("createNewForm")}</h1>

        {/* Main content grid: Form builder + Settings panel */}
        <div className="builder-wrapper">
          {/* Form Builder Section */}
          <div className="formbuilder-container card-section">
            <div className="content-card">
              <FormBuilder register={register} errors={errors} />
            </div>
          </div>

          {/* Settings Panel Section */}
          <div className="settings-container settings-section">
            <div className="content-card">
              <SettingsPanel getValues={getValues} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormLayout;
