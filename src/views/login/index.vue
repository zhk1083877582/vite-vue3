<!-- filepath: /c:/tospur/vue3+vite/my-vue-app/src/views/Login.vue -->
<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
                <h1>非车理赔系统</h1>
                <p class="subtitle">
                    Property Insurance Claims Management System
                </p>
            </div>

            <div class="login-form">
                <el-form ref="formRef" :model="formState" :rules="ruleValidate">
                    <el-form-item prop="username">
                        <el-input
                            v-model="formState.username"
                            size="large"
                            placeholder="用户名"
                        >
                            <template #append
                                ><el-icon><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            v-model="formState.password"
                            :type="isShowPassWord ? 'text' : 'password'"
                            size="large"
                            placeholder="密码"
                        >
                            <template #append>
                                <el-icon @click="showPassWord"
                                    ><Hide v-show="isShowPassWord" />
                                    <View v-show="!isShowPassWord" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            style="width: 100%"
                            type="primary"
                            size="large"
                            :loading="loading"
                            @click="handleSubmit"
                        >
                            {{ loading ? "登录中..." : "登录" }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="login-footer">
                <p>
                    © {{ new Date().getFullYear() }} 保险公司. All Rights
                    Reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuth } from "@/hooks/useAuth";

const { loading, login } = useAuth();
const formRef = ref(null);
const isShowPassWord = ref(false);
const formState = reactive({
    username: "admin",
    password: "111",
});

const ruleValidate = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            type: "string",
            min: 3,
            message: "密码长度不能小于6位",
            trigger: "blur",
        },
    ],
};

const handleSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            await login(formState);
        }
    });
};
const showPassWord = () => {
    isShowPassWord.value = !isShowPassWord.value;
    console.log("showPassWord");
};
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: end;
    align-items: center;
    min-height: 100vh;
    // background: linear-gradient(135deg, #2d8cf0 0%, #2b85e4 100%);
    background: url("@/assets/images/login.png") no-repeat;
    background-size: cover;

    .login-box {
        width: 400px;
        padding: 40px;
        background: rgba(255, 255, 255, 0.98);
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        margin-right: 20px;
        .login-header {
            text-align: center;
            margin-bottom: 40px;

            .logo {
                width: 84px;
                height: 84px;
                margin-bottom: 16px;
            }

            h1 {
                font-size: 24px;
                color: #17233d;
                margin-bottom: 8px;
                font-weight: 500;
            }

            .subtitle {
                font-size: 14px;
                color: #808695;
            }
        }

        .login-form {
            :deep(.ivu-input-wrapper) {
                .ivu-input {
                    height: 40px;
                }

                .ivu-icon {
                    color: #808695;
                }
            }

            :deep(.ivu-btn) {
                height: 40px;
                font-size: 16px;
                margin-top: 8px;
            }
        }

        .login-footer {
            text-align: center;
            margin-top: 24px;
            color: #808695;
            font-size: 12px;
        }
    }
}

// 响应式设计
@media (max-width: 576px) {
    .login-box {
        width: 90% !important;
        padding: 20px !important;
    }
}

// 添加动画效果
.login-box {
    animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// 添加输入框焦点效果
:deep(.ivu-input-wrapper-focus) {
    .ivu-input {
        box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    }
}

// 添加按钮悬停效果
:deep(.ivu-btn-primary) {
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(45, 140, 240, 0.4);
    }
    transition: all 0.3s ease;
}
</style>
