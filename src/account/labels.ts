export const accountLabels = {
    template: {
        pageTitle: "账户管理",
        brandTitle: "EVORSIO",
        navTitle: "账户导航",
        navCardTitle: "账户管理",
        navItems: {
            account: "账户概览",
            password: "修改密码",
            totp: "双因素认证",
            social: "关联账号",
            sessions: "会话管理",
            applications: "授权应用",
            log: "登录记录",
            authorization: "我的资源"
        },
        backTo: (name: string) => `返回 ${name}`,
        signOut: "退出登录",
        openNavigation: "打开导航"
    },
    common: {
        requiredFields: "必填项",
        allFieldsRequired: "所有字段均为必填项",
        save: "保存",
        cancel: "取消",
        remove: "删除",
        add: "添加",
        revoke: "撤销授权",
        logoutAllSessions: "退出所有会话",
        backToApplication: "返回应用",
        username: "用户名",
        email: "电子邮箱",
        firstName: "名字",
        lastName: "姓氏",
        password: "密码",
        newPassword: "新密码",
        confirmPassword: "确认密码",
        authenticatorCode: "一次性验证码",
        deviceName: "设备名称",
        clients: "客户端",
        ip: "IP 地址",
        started: "开始时间",
        lastAccess: "最后访问",
        expires: "过期时间",
        date: "日期",
        event: "事件",
        details: "详情",
        action: "操作",
        availableRoles: "可用角色",
        grantedPermissions: "已授权权限",
        additionalGrants: "附加授权",
        application: "应用",
        fullAccess: "全部权限",
        inResource: "资源",
    },
    account: {
        title: "编辑账户",
        profileSection: "基本信息",
        changePasswordSection: "修改密码",
        backToApplication: "返回应用",
        profileUpdated: "个人资料已更新",
        profileUnchanged: "个人资料未更改",
        passwordUpdated: "密码已更新",
        passwordUnchanged: "密码未更改",
        updateProfileViaLoginTheme: "通过登录主题更新资料",
        deleteAccount: "删除账户"
    },
    password: {
        title: "修改密码",
        description: "所有字段均为必填项",
        currentPassword: "当前密码",
        newPassword: "新密码",
        confirmPassword: "确认密码",
        sameAsOldError: "新密码不能与旧密码相同",
        confirmMismatchError: "两次输入的密码不一致"
    },
    applications: {
        title: "授权应用",
        unknownClient: "未命名客户端",
        revoke: "撤销授权",
        granted: "已授权权限",
        additionalGrants: "附加授权"
    },
    federatedIdentity: {
        title: "关联账户",
        remove: "解除关联",
        add: "添加关联"
    },
    log: {
        title: "登录记录"
    },
    sessions: {
        title: "会话管理"
    },
    totp: {
        title: "双因素认证",
        configureAuthenticators: "配置双因素认证",
        mobile: "移动设备",
        step1: "在设备上安装 FreeOTP、Google Authenticator 或其他兼容应用。",
        step2: "打开应用并扫描二维码，输入生成的验证码。",
        step3: "输入一次性验证码后点击“保存”完成绑定。",
        step3DeviceName: "为设备设置一个名称，方便管理。",
        unableToScan: "无法扫描？",
        manualStep2: "打开应用并手动输入密钥：",
        manualStep3: "如果应用支持，请按照以下配置。",
        scanBarcode: "扫描条形码？",
        typeLabel: "类型",
        algorithmLabel: "算法",
        digitsLabel: "位数",
        intervalLabel: "时间间隔",
        counterLabel: "计数器",
        policyType: {
            totp: "基于时间",
            hotp: "基于计数"
        }
    },
    messages: {
        types: {
            error: "错误",
            success: "成功",
            info: "提示",
            warning: "警告"
        } as Record<string, string>,
        overrides: {
            "Invalid existing password.": "旧密码不正确",
            "Invalid username or password.": "用户名或密码不正确",
            "You do not have permission to manage existing sessions.": "您没有权限管理当前会话。"
        } as Record<string, string>
    }
};
