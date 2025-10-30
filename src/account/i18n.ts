/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/account";
import type { ThemeName } from "../kc.gen";

// Custom translations for our theme
const customTranslations = {
    en: {
        "accountSettingsSidebarTitle": "Account Settings",
        "operationSuccess": "Operation Successful",
        "operationError": "Operation Error",
        "profileSuccessfullyUpdated": "Profile successfully updated",
        "profileUnchanged": "Profile unchanged",
        "updateProfileViaLoginTheme": "Update profile (via Login theme)",
        "deleteAccount": "Delete Account",
        "passwordSuccessfullyUpdated": "Password successfully updated",
        "passwordUnchanged": "Password unchanged",
        "delete": "Delete"
    },
    "zh-CN": {
        "accountSettingsSidebarTitle": "账户设置",
        "operationSuccess": "操作成功",
        "operationError": "发生错误",
        "profileSuccessfullyUpdated": "个人资料更新成功",
        "profileUnchanged": "个人资料未更改",
        "updateProfileViaLoginTheme": "通过登录主题更新个人资料",
        "deleteAccount": "删除账户",
        "passwordSuccessfullyUpdated": "密码更新成功",
        "passwordUnchanged": "密码未更改",
        "delete": "删除"
    }
};

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations(customTranslations)
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
