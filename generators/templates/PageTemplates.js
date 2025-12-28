// ================================================
// PAGE TEMPLATES
// ================================================

class PageTemplates {
  constructor(config) {
    this.config = config;
  }

  generateLoginPage() {
    const appName = this.config.getAppName();
    
    return `import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Card, Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuthStore()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      await login(values)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            ${appName}
          </Title>
          <Text type="secondary">
            आफ्नो खातामा लगइन गर्नुहोस्
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'कृपया इमेल प्रविष्ट गर्नुहोस्!' },
              { type: 'email', message: 'अमान्य इमेल ठेगाना!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="इमेल"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'कृपया पासवर्ड प्रविष्ट गर्नुहोस्!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="पासवर्ड"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>सम्झनुहोस्</Checkbox>
            </Form.Item>
            
            <Link to="/forgot-password" className="text-blue-600">
              पासवर्ड बिर्सनुभयो?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              लगइन गर्नुहोस्
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <Text type="secondary">
            खाता छैन?{' '}
            <Link to="/register" className="text-blue-600 font-medium">
              दर्ता गर्नुहोस्
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage`;
  }

  generateRegisterPage() {
    return `import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Card, Form, Input, Button, Typography } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, loading } = useAuthStore()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      await register(values)
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            नयाँ खाता सिर्जना गर्नुहोस्
          </Title>
          <Text type="secondary">
            तपाईंको व्यक्तिगत जानकारी प्रविष्ट गर्नुहोस्
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'कृपया नाम प्रविष्ट गर्नुहोस्!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="पूरा नाम"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'कृपया इमेल प्रविष्ट गर्नुहोस्!' },
              { type: 'email', message: 'अमान्य इमेल ठेगाना!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="इमेल"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'कृपया पासवर्ड प्रविष्ट गर्नुहोस्!' },
              { min: 6, message: 'पासवर्ड कम्तिमा ६ वर्णको हुनुपर्छ!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="पासवर्ड"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'कृपया पासवर्ड पुष्टि गर्नुहोस्!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('पासवर्डहरू मेल खाँदैनन्!'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="पासवर्ड पुष्टि गर्नुहोस्"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              दर्ता गर्नुहोस्
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <Text type="secondary">
            पहिले नै खाता छ?{' '}
            <Link to="/login" className="text-blue-600 font-medium">
              लगइन गर्नुहोस्
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage`;
  }
 // generateDynamicPage() function मा fix
generateDynamicPage(page) {
  const pageName = page.page_id.charAt(0).toUpperCase() + page.page_id.slice(1);
  const columns = this.config.getColumns(page.page_id);
  const formFields = this.config.getFormFields(page.page_id);
  
  return `import React, { useState, useMemo } from 'react'
import { Card, Table, Button, Modal, Form, Input, Select, message, Popconfirm, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useFetch } from '@/hooks/useFetch'
import { usePermission } from '@/hooks/usePermission'
import PageHeader from '@/components/PageHeader'

const ${pageName}Page = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [form] = Form.useForm()
  const { hasPermission } = usePermission()
  
  const { data, loading, refetch } = useFetch({
    endpoint: '/api/${page.page_id}',
    cacheKey: '${page.page_id}-data'
  })
  
  const columns = ${JSON.stringify(columns.map(col => ({
    title: col.label,
    dataIndex: col.field,
    key: col.field,
    width: col.width,
    sorter: col.sortable === 'YES' ? true : false
  })), null, 2)}
  
  const formFieldsConfig = ${JSON.stringify(formFields, null, 2)}
  
  const filteredData = useMemo(() => {
    if (!data || !searchText) return data || []
    return data.filter((item: any) =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    )
  }, [data, searchText])
  
  const handleCreate = () => {
    setEditingRecord(null)
    form.resetFields()
    setModalVisible(true)
  }
  
  const handleEdit = (record: any) => {
    setEditingRecord(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }
  
  const handleDelete = async (record: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      message.success('सफलतापूर्वक मेटियो')
      refetch()
    } catch (error) {
      message.error('मेट्न असफल भयो')
    }
  }
  
  const handleSubmit = async (values: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      message.success(editingRecord ? 'अपडेट भयो' : 'सिर्जना भयो')
      setModalVisible(false)
      refetch()
    } catch (error) {
      message.error('असफल भयो')
    }
  }
  
  return (
    <div className="p-6">
      <PageHeader
        title="${page.title}"
        subtitle="${page.title}को व्यवस्थापन गर्नुहोस्"
      >
        {hasPermission('create') && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            नयाँ थप्नुहोस्
          </Button>
        )}
      </PageHeader>
      
      <Card>
        <div className="mb-4">
          <Input.Search
            placeholder="खोजी गर्नुहोस्..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: 300 }}
            allowClear
          />
        </div>
        
        <Table
          columns={[
            ...columns,
            {
              title: 'क्रियाहरू',
              key: 'actions',
              width: 150,
              render: (_: any, record: any) => (
                <Space>
                  {hasPermission('update') && (
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                      size="small"
                    />
                  )}
                  {hasPermission('delete') && (
                    <Popconfirm
                      title="पक्का हुनुहुन्छ?"
                      onConfirm={() => handleDelete(record)}
                      okText="हो"
                      cancelText="होइन"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  )}
                </Space>
              )
            }
          ]}
          dataSource={filteredData}
          loading={loading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => \`कुल \${total} वटा\`,
            pageSizeOptions: ['10', '20', '50']
          }}
        />
      </Card>
      
      <Modal
        title={editingRecord ? 'सम्पादन गर्नुहोस्' : 'नयाँ थप्नुहोस्'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {formFieldsConfig.map((field: any) => (
            <Form.Item
              key={field.field}
              name={field.field}
              label={field.label}
              rules={field.required === 'YES' ? [{ required: true, message: 'यो फिल्ड आवश्यक छ' }] : []}
            >
              {field.type === 'select' ? (
                <Select placeholder={field.placeholder || 'छान्नुहोस्'}>
                  {field.options?.split(',').map((opt: string) => (
                    <Select.Option key={opt} value={opt}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
              ) : field.type === 'textarea' ? (
                <Input.TextArea 
                  rows={field.rows || 3} 
                  placeholder={field.placeholder || ''} 
                />
              ) : (
                <Input 
                  type={field.type}
                  placeholder={field.placeholder || ''}
                />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  )
}

export default ${pageName}Page`;
}
generateDashboardPage() {
  const currency = this.config.getGlobalValue('currency') || 'NPR';
  const appName = this.config.getAppName();
  
  return `import React from 'react'
import { Card, Row, Col, Statistic } from 'antd'
import { UserOutlined, ShoppingOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useFetch } from '@/hooks/useFetch'
import PageHeader from '@/components/PageHeader'

const DashboardPage = () => {
  const { data: statsData, loading: statsLoading } = useFetch({
    endpoint: '/api/dashboard/stats',
    cacheKey: 'dashboard-stats'
  })
  
  const stats = [
    { title: 'कुल प्रयोगकर्ता', value: statsData?.totalUsers || 0, icon: <UserOutlined />, color: '#1890ff' },
    { title: 'कुल सामान', value: statsData?.totalProducts || 0, icon: <ShoppingOutlined />, color: '#52c41a' },
    { title: 'कुल आम्दानी', value: \`${currency} \${statsData?.totalRevenue || 0}\`, icon: <DollarOutlined />, color: '#faad14' },
    { title: 'सक्रिय सत्र', value: statsData?.activeSessions || 0, icon: <CheckCircleOutlined />, color: '#f5222d' }
  ]
  
  return (
    <div className="p-6">
      <PageHeader
        title="ड्यासबोर्ड"
        subtitle="${appName} प्रबन्धन ड्यासबोर्ड"
      />
      
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="भर्खरको गतिविधिहरू">
            <p className="text-gray-500">गतिविधि डाटा यहाँ देखाइनेछ</p>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="प्रगति">
            <p className="text-gray-500">प्रगति डाटा यहाँ देखाइनेछ</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage`;
}
generateSettingsPage() {
  const appName = this.config.getAppName();
  const currency = this.config.getGlobalValue('currency') || 'NPR';
  const timezone = this.config.getGlobalValue('timezone') || 'Asia/Kathmandu';
  
  return `import React from 'react'
import { Card, Form, Input, Button, Select, Switch, message } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import PageHeader from '@/components/PageHeader'

const { Option } = Select

const SettingsPage = () => {
  const [form] = Form.useForm()
  
  const onFinish = async (values: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      message.success('सेटिङ्गहरू सेभ भयो')
    } catch (error) {
      message.error('सेभ गर्दा त्रुटि भयो')
    }
  }
  
  return (
    <div className="p-6">
      <PageHeader
        title="सेटिङ्गहरू"
        subtitle="प्रणाली सेटिङ्गहरू व्यवस्थापन"
      />
      
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            app_name: '${appName}',
            currency: '${currency}',
            timezone: '${timezone}'
          }}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="app_name"
              label="एपको नाम"
              rules={[{ required: true, message: 'एपको नाम आवश्यक छ' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="currency"
              label="मुद्रा"
              rules={[{ required: true, message: 'मुद्रा आवश्यक छ' }]}
            >
              <Select>
                <Option value="NPR">नेपाली रुपैयाँ (NPR)</Option>
                <Option value="USD">अमेरिकी डलर (USD)</Option>
                <Option value="EUR">युरो (EUR)</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="timezone"
              label="समय क्षेत्र"
              rules={[{ required: true, message: 'समय क्षेत्र आवश्यक छ' }]}
            >
              <Select>
                <Option value="Asia/Kathmandu">नेपाल समय</Option>
                <Option value="UTC">युटिसी</Option>
                <Option value="America/New_York">अमेरिकी समय</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="email_notifications"
              label="इमेल सूचना"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              सेटिङ्गहरू सेभ गर्नुहोस्
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage`;
}
generateProfilePage() {
  return `import React from 'react'
import { Card, Form, Input, Button, Avatar, message } from 'antd'
import { UserOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store/authStore'
import PageHeader from '@/components/PageHeader'

const ProfilePage = () => {
  const [form] = Form.useForm()
  const { user, updateProfile } = useAuthStore()
  
  const onFinish = async (values: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      updateProfile(values)
      message.success('प्रोफाइल अपडेट भयो')
    } catch (error) {
      message.error('अपडेट असफल भयो')
    }
  }
  
  return (
    <div className="p-6">
      <PageHeader
        title="प्रोफाइल"
        subtitle="तपाईंको प्रोफाइल व्यवस्थापन"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <div className="flex flex-col items-center">
            <Avatar
              size={120}
              icon={<UserOutlined />}
              className="mb-4"
            />
            <h3 className="text-lg font-medium">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500">{user?.role}</p>
          </div>
        </Card>
        
        <Card className="md:col-span-2">
          <Form
            form={form}
            layout="vertical"
            initialValues={user || {}}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="पूरा नाम"
              rules={[{ required: true, message: 'नाम आवश्यक छ' }]}
            >
              <Input 
                prefix={<UserOutlined />}
                placeholder="नाम लेख्नुहोस्"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="इमेल"
              rules={[
                { required: true, message: 'इमेल आवश्यक छ' },
                { type: 'email', message: 'मान्य इमेल हुनुपर्छ' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />}
                placeholder="email@example.com"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                अपडेट गर्नुहोस्
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage`;
}

  generateAppRoutes() {
    const pages = this.config.getPages();
    
    // Landing pages (public - no authentication required)
    // नोट: '404' को सट्टा 'notFound' प्रयोग गर्ने
    const landingPages = [
      { page_id: 'home', route: '/', isPublic: true },
      { page_id: 'about', route: '/about', isPublic: true },
      { page_id: 'contact', route: '/contact', isPublic: true },
      { page_id: 'services', route: '/services', isPublic: true },
      { page_id: 'notFound', route: '*', isPublic: true } // 404 page - नाम परिवर्तन गरिएको
    ];
    
    // Predefined pages हरू
    const predefinedPages = [
      { page_id: 'dashboard', route: '/dashboard', permissions: 'dashboard.view' },
      { page_id: 'profile', route: '/profile', permissions: 'profile.view' },
      { page_id: 'settings', route: '/settings', permissions: 'settings.view' }
    ];
    
    // Excel बाट आएका pages
    const excelPages = pages || [];
    
    // Unique pages merge गर्ने
    const allPages = [...landingPages];
    
    // Excel pages थप्ने
    excelPages.forEach(excelPage => {
      const exists = allPages.some(p => p.page_id === excelPage.page_id);
      if (!exists) {
        allPages.push({...excelPage, isPublic: false});
      }
    });
    
    // Predefined pages थप्ने
    predefinedPages.forEach(predefinedPage => {
      const exists = allPages.some(p => p.page_id === predefinedPage.page_id);
      if (!exists) {
        allPages.push({...predefinedPage, isPublic: false});
      }
    });
    
    // Import statements generate गर्ने
    const pageImports = allPages.map(p => {
      if (p.isPublic) {
        return `const ${p.page_id.charAt(0).toUpperCase() + p.page_id.slice(1)}Page = lazy(() => import('@/pages/landing/${p.page_id}'))`;
      } else {
        return `const ${p.page_id.charAt(0).toUpperCase() + p.page_id.slice(1)}Page = lazy(() => import('@/pages/${p.page_id}'))`;
      }
    }).join('\n');

    // Routes generate गर्ने
    const pageRoutes = allPages.map(p => {
      if (p.isPublic) {
        return `            <Route path="${p.route}" element={<${p.page_id.charAt(0).toUpperCase() + p.page_id.slice(1)}Page />} />`;
      } else if (p.page_id === 'notFound') {
        return `            <Route path="*" element={<${p.page_id.charAt(0).toUpperCase() + p.page_id.slice(1)}Page />} />`;
      } else {
        return `            <Route 
              path="${p.route}" 
              element={
                <ProtectedRoute requiredPermissions={${p.permissions ? `['${p.permissions}']` : '[]'}}>
                  <${p.page_id.charAt(0).toUpperCase() + p.page_id.slice(1)}Page />
                </ProtectedRoute>
              } 
            />`;
      }
    }).join('\n');

    return `import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from '@/layouts/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { initializeConfig } from '@/store/configStore'

// Lazy load pages
const LoginPage = lazy(() => import('@/pages/auth/Login'))
const RegisterPage = lazy(() => import('@/pages/auth/Register'))
${pageImports}

function App() {
  useEffect(() => {
    initializeConfig()
  }, [])
  
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">लोडिङ...</div>}>
        <Routes>
          {/* Public Landing Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Dashboard Pages */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={
              <ProtectedRoute requiredPermissions={['dashboard.view']}>
                <DashboardPage />
              </ProtectedRoute>
            } />
${pageRoutes.split('\n').filter(route => 
  !route.includes('"/"') && 
  !route.includes('"/about"') && 
  !route.includes('"/contact"') && 
  !route.includes('"/services"') &&
  !route.includes('"*"')
).join('\n')}
          </Route>
          
          {/* 404 Page - Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App`;
  }
}

module.exports = PageTemplates;