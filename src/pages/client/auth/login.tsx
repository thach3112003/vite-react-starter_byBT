import { Button, Divider, Form, Input, App } from 'antd';
import { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import 'pages/client/auth/login.scss'
import { loginAPI } from '@/services/api';
import { useState } from 'react';
import { useCurrentApp } from '@/components/context/app.context';
type FieldType = {
    username: string;
    password: string;
}
const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { username, password } = values;
        console.log(">>Check values: ", values);
        const res = await loginAPI(username, password);
        if (res?.data) {
            setIsAuthenticated(true);
            setUser(res.data.user)
            localStorage.setItem('access_token', res.data.access_token);
            message.success("Đăng nhập thành công!");
            navigate("/");
        } else {
            message.error(res.message);
        }
        setIsSubmit(false);

    }
    return (
        <div className="login-container">
            <main className='main'>
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2>Đăng nhập</h2>
                            <Divider />
                        </div>
                        <Form name="form-login" onFinish={onFinish} autoComplete="off">
                            <Form.Item<FieldType> labelCol={{ span: 24 }} label="Username" name="username" rules={[{ required: true, message: "Không được để trống username!" }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType> labelCol={{ span: 24 }} label="Password" name="password" rules={[{ required: true, message: "Không được để trống password!" }]} >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' loading={isSubmit}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider />
                            <p>Chưa có tài khoản?
                                <span>
                                    <Link to='/register'>Đăng ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main >
        </div >
    )
}
export default LoginPage;