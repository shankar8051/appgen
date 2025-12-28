// ================================================
// LANDING PAGE TEMPLATES
// ================================================

class LandingPageTemplates {
  constructor(config) {
    this.config = config;
  }

  generateLandingHomePage() {
    const appName = this.config.getAppName();
    const appDescription = this.config.getGlobalValue('app_description') || 'हाम्रो आधुनिक वेब अनुप्रयोग';
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined, CheckCircleOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingHomePage = () => {
  const features = [
    {
      title: 'द्रुत र सजिलो',
      description: 'हाम्रो प्रणाली द्रुत र सजिलोसँग काम गर्दछ',
      icon: <RocketOutlined className="text-blue-500" />
    },
    {
      title: 'विश्वसनीय',
      description: 'पूर्ण रूपमा विश्वसनीय र सुरक्षित समाधान',
      icon: <CheckCircleOutlined className="text-green-500" />
    },
    {
      title: 'सहयोगी टोली',
      description: 'अनुभवी टोलीद्वारा समर्थित',
      icon: <TeamOutlined className="text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-6">
            ${appName}
          </Title>
          <Paragraph className="text-xl mb-10 opacity-90">
            ${appDescription}
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button type="primary" size="large" className="bg-white text-blue-600 hover:bg-gray-100">
                सुरु गर्नुहोस् <ArrowRightOutlined />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="large" className="bg-transparent border-white text-white hover:bg-white/10">
                थप जानकारी
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            हाम्रो विशेषताहरू
          </Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">
            तयार हुनुभयो?
          </Title>
          <Paragraph className="text-xl mb-8 opacity-90">
            आजै हाम्रो सँग जोडिनुहोस् र फाइदा उठाउनुहोस्
          </Paragraph>
          <Link to="/register">
            <Button type="primary" size="large" className="bg-white text-green-600 hover:bg-gray-100">
              निःशुल्क सदस्यता लिनुहोस्
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingHomePage;`;
  }

  generateLandingAboutPage() {
    const appName = this.config.getAppName();
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Typography, Timeline, Avatar } from 'antd';
import { CheckCircleOutlined, TeamOutlined, TrophyOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingAboutPage = () => {
  const teamMembers = [
    { name: 'राम बहादुर', role: 'संस्थापक', avatar: 'RB' },
    { name: 'सीता कुमारी', role: 'प्रवन्धक', avatar: 'SK' },
    { name: 'हरि प्रसाद', role: 'विकासकर्ता', avatar: 'HP' },
    { name: 'गीता देवी', role: 'डिजाइनर', avatar: 'GD' }
  ];

  const milestones = [
    { year: '२०२०', event: 'कम्पनीको स्थापना', description: 'सानो टोलीको रूपमा सुरुवात' },
    { year: '२०२१', event: 'पहिलो उत्पादन', description: 'हाम्रो पहिलो उत्पादन बजारमा' },
    { year: '२०२२', event: '१००+ ग्राहक', description: '१०० भन्दा बढी सन्तुष्ट ग्राहक' },
    { year: '२०२३', event: 'नयाँ संस्करण', description: 'पूर्ण नयाँ संस्करण सार्वजनिक' }
  ];

  const values = [
    { icon: <CheckCircleOutlined />, title: 'गुणस्तर', description: 'उच्च गुणस्तरको सेवा प्रदान' },
    { icon: <TeamOutlined />, title: 'सहकार्य', description: 'टोली सहकार्यमा विश्वास' },
    { icon: <TrophyOutlined />, title: 'उत्कृष्टता', description: 'सधैं उत्कृष्टता खोज्ने' },
    { icon: <GlobalOutlined />, title: 'नवीनता', description: 'नयाँ विचार र प्रविधि' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-6">
            हाम्रो बारेमा
          </Title>
          <Paragraph className="text-xl opacity-90">
            ${appName} को इतिहास, मूल्य र उद्देश्य
          </Paragraph>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Card className="h-full">
                <Title level={3}>हाम्रो मिशन</Title>
                <Paragraph className="text-lg">
                  हाम्रो मिशन भनेको उच्च गुणस्तरको डिजिटल समाधान प्रदान गर्नु हो जसले व्यवसायहरूलाई सजिलो र 
                  प्रभावकारी रूपमा विकास गर्न मद्दत गर्दछ।
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="h-full">
                <Title level={3}>हाम्रो दृष्टि</Title>
                <Paragraph className="text-lg">
                  नेपालको अग्रणी प्रविधि कम्पनी बन्ने हाम्रो दृष्टि छ, जहाँ हामी नवीनता र गुणस्तरलाई 
                  प्राथमिकता दिन्छौं।
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            हाम्रा मूल्यहरू
          </Title>
          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center">
                  <div className="text-3xl text-blue-500 mb-4">{value.icon}</div>
                  <Title level={4}>{value.title}</Title>
                  <Paragraph className="text-gray-600">{value.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            हाम्रो टोली
          </Title>
          <Row gutter={[24, 24]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center">
                  <Avatar size={80} className="bg-blue-500 mb-4">
                    {member.avatar}
                  </Avatar>
                  <Title level={4}>{member.name}</Title>
                  <Paragraph className="text-blue-600">{member.role}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            हाम्रो यात्रा
          </Title>
          <div className="max-w-3xl mx-auto">
            <Timeline
              mode="alternate"
              items={milestones.map(milestone => ({
                children: (
                  <div>
                    <Title level={4}>{milestone.year} - {milestone.event}</Title>
                    <Paragraph>{milestone.description}</Paragraph>
                  </div>
                )
              }))}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-white mb-6">
            हाम्रो सँग जोडिनुहोस्
          </Title>
          <Paragraph className="text-xl mb-8 opacity-90">
            हाम्रो यात्रामा सहभागी हुनुहोस्
          </Paragraph>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button type="primary" size="large" className="bg-white text-red-600 hover:bg-gray-100">
                सम्पर्क गर्नुहोस्
              </Button>
            </Link>
            <Link to="/">
              <Button size="large" className="bg-transparent border-white text-white hover:bg-white/10">
                गृह पृष्ठ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingAboutPage;`;
  }

  generateLandingContactPage() {
    const appName = this.config.getAppName();
    const contactEmail = this.config.getGlobalValue('contact_email') || 'info@example.com';
    const contactPhone = this.config.getGlobalValue('contact_phone') || '+977-1-XXXXXXX';
    const contactAddress = this.config.getGlobalValue('contact_address') || 'काठमाडौं, नेपाल';
    
    return `import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('तपाईंको सन्देश सफलतापूर्वक पठाइयो!');
      form.resetFields();
    } catch (error) {
      message.error('सन्देश पठाउन असफल भयो। पुनः प्रयास गर्नुहोस्।');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MailOutlined className="text-blue-500" />,
      title: 'इमेल',
      details: ['${contactEmail}', 'support@example.com']
    },
    {
      icon: <PhoneOutlined className="text-green-500" />,
      title: 'फोन',
      details: ['${contactPhone}', '+977-XXXXXXXXXX']
    },
    {
      icon: <EnvironmentOutlined className="text-red-500" />,
      title: 'ठेगाना',
      details: ['${contactAddress}', 'सोफ्टवेयर पार्क, काठमाडौं']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-6">
            सम्पर्क गर्नुहोस्
          </Title>
          <Paragraph className="text-xl opacity-90">
            हामीलाई सिधै सम्पर्क गर्नुहोस्, हामी तपाईंको लागि तयार छौं
          </Paragraph>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} lg={16}>
            <Card>
              <Title level={3} className="mb-6">
                हामीलाई सन्देश पठाउनुहोस्
              </Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="पूरा नाम"
                      rules={[{ required: true, message: 'कृपया आफ्नो नाम लेख्नुहोस्' }]}
                    >
                      <Input size="large" placeholder="तपाईंको नाम" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="इमेल"
                      rules={[
                        { required: true, message: 'कृपया इमेल लेख्नुहोस्' },
                        { type: 'email', message: 'मान्य इमेल हुनुपर्छ' }
                      ]}
                    >
                      <Input size="large" placeholder="email@example.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="subject"
                  label="विषय"
                  rules={[{ required: true, message: 'कृपया विषय लेख्नुहोस्' }]}
                >
                  <Input size="large" placeholder="सन्देशको विषय" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="सन्देश"
                  rules={[{ required: true, message: 'कृपया सन्देश लेख्नुहोस्' }]}
                >
                  <Input.TextArea 
                    rows={6} 
                    placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    icon={<SendOutlined />}
                  >
                    सन्देश पठाउनुहोस्
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col xs={24} lg={8}>
            <Card>
              <Title level={3} className="mb-6">
                सम्पर्क जानकारी
              </Title>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <Paragraph key={idx} className="text-gray-600 mb-0">
                          {detail}
                        </Paragraph>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <Title level={4} className="mb-4">
                  कार्य समय
                </Title>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>सोमबार - शुक्रबार:</span>
                    <span className="font-medium">९:०० AM - ६:०० PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>शनिबार:</span>
                    <span className="font-medium">१०:०० AM - ४:०० PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>आइतबार:</span>
                    <span className="font-medium text-red-500">बिदा</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <Title level={4} className="mb-4">
                  ${appName} को नक्सा
                </Title>
                <div className="bg-gray-200 h-48 flex items-center justify-center rounded-lg">
                  <Paragraph className="text-gray-500">
                    यहाँ गुगल म्याप हुनेछ
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            प्राय सोधिने प्रश्नहरू
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card title="हामीलाई कसरी सम्पर्क गर्ने?" className="h-full">
                <Paragraph>
                  तपाईं माथिको फर्म प्रयोग गरेर वा हाम्रो इमेल/फोन नम्बरमा सिधै सम्पर्क गर्न सक्नुहुन्छ।
                  हामी २४ घण्टामा जवाफ दिनेछौं।
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="सेवा सुरु गर्न कति समय लाग्छ?" className="h-full">
                <Paragraph>
                  प्रारम्भिक सम्पर्क पश्चात्, हामी १-२ कार्यदिनभित्र तपाईंको आवश्यकता अनुसार 
                  सेवा सुरु गर्न सक्छौं।
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default LandingContactPage;`;
  }

  generateLanding404Page() {
    const appName = this.config.getAppName();
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result, Typography } from 'antd';
import { HomeOutlined, FrownOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        icon={<FrownOutlined className="text-gray-400" />}
        title="४०४"
        subTitle="माफ गर्नुहोस्, तपाईंले खोज्नुभएको पृष्ठ भेटिएन"
        extra={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button type="primary" icon={<HomeOutlined />}>
                गृह पृष्ठमा जानुहोस्
              </Button>
            </Link>
            <Link to="/contact">
              <Button>
                सम्पर्क गर्नुहोस्
              </Button>
            </Link>
          </div>
        }
      >
        <div className="text-center">
          <Paragraph className="text-gray-600">
            सम्भवतः तपाईंले गलत URL प्रविष्ट गर्नुभएको वा पृष्ठ सारिएको हुनसक्छ।
          </Paragraph>
          <Paragraph className="text-gray-500">
            यदि तपाईंलाई लाग्छ यो त्रुटि हो भने, कृपया ${appName} सम्पर्क गर्नुहोस्।
          </Paragraph>
        </div>
      </Result>
    </div>
  );
};

export default NotFoundPage;`;
  }

  generateLandingServicesPage() {
    const appName = this.config.getAppName();
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, List } from 'antd';
import { CheckCircleOutlined, SettingOutlined, CloudOutlined, SecurityScanOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingServicesPage = () => {
  const services = [
    {
      icon: <SettingOutlined className="text-blue-500" />,
      title: 'वेब डिभेलपमेन्ट',
      description: 'आधुनिक र स्केलेबल वेब अनुप्रयोगहरू',
      features: ['React.js', 'Node.js', 'Database Design']
    },
    {
      icon: <CloudOutlined className="text-green-500" />,
      title: 'क्लाउड सेवा',
      description: 'क्लाउड आधारित समाधानहरू',
      features: ['AWS', 'Google Cloud', 'Azure']
    },
    {
      icon: <SecurityScanOutlined className="text-red-500" />,
      title: 'साइबर सुरक्षा',
      description: 'सुरक्षा समाधान र परामर्श',
      features: ['Security Audit', 'Penetration Testing', 'Encryption']
    },
    {
      icon: <TeamOutlined className="text-purple-500" />,
      title: 'आउटसोर्सिङ',
      description: 'विशेषज्ञ टोली आउटसोर्सिङ',
      features: ['Dedicated Team', 'Project Based', 'Hourly Rate']
    },
    {
      icon: <RocketOutlined className="text-orange-500" />,
      title: 'डिजिटल मार्केटिङ',
      description: 'ऑनलाइन उपस्थिति बढाउने सेवा',
      features: ['SEO', 'Social Media', 'Content Marketing']
    }
  ];

  const pricingPlans = [
    {
      name: 'मूलभूत',
      price: 'रु १०,०००',
      period: '/ महिना',
      features: ['५ वेब पेजहरू', 'मूल SEO', 'ईमेल समर्थन'],
      recommended: false
    },
    {
      name: 'मानक',
      price: 'रु २५,०००',
      period: '/ महिना',
      features: ['१५ वेब पेजहरू', 'उन्नत SEO', '२४/७ समर्थन', 'मोबाइल एप'],
      recommended: true
    },
    {
      name: 'प्रिमियम',
      price: 'रु ५०,०००',
      period: '/ महिना',
      features: ['असीमित पेजहरू', 'पूर्ण SEO', 'डेडिकेटेड समर्थन', 'एप डिभेलपमेन्ट'],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-6">
            हाम्रो सेवाहरू
          </Title>
          <Paragraph className="text-xl opacity-90">
            ${appName} ले प्रदान गर्ने विभिन्न प्रविधि सेवाहरू
          </Paragraph>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            सेवाहरू
          </Title>
          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <Title level={4}>{service.title}</Title>
                  <Paragraph className="text-gray-600 mb-4">{service.description}</Paragraph>
                  <List
                    size="small"
                    dataSource={service.features}
                    renderItem={item => (
                      <List.Item className="!pl-0">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            मूल्य निर्धारण
          </Title>
          <Row gutter={[24, 24]}>
            {pricingPlans.map((plan, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  className={\`h-full text-center \${plan.recommended ? 'border-2 border-blue-500 relative' : ''}\`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg">
                      सिफारिश गरिएको
                    </div>
                  )}
                  <Title level={3} className="mb-2">{plan.name}</Title>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <List
                    dataSource={plan.features}
                    renderItem={item => (
                      <List.Item className="!px-0">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        {item}
                      </List.Item>
                    )}
                  />
                  <Button 
                    type={plan.recommended ? "primary" : "default"} 
                    block 
                    className="mt-6"
                    size="large"
                  >
                    छान्नुहोस्
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-white mb-6">
            तपाईंको परियोजना शुरू गर्नुहोस्
          </Title>
          <Paragraph className="text-xl mb-8 opacity-90">
            हामीलाई आफ्नो आवश्यकता बताउनुहोस्, हामी उत्तम समाधान दिनेछौं
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button type="primary" size="large" className="bg-white text-teal-600 hover:bg-gray-100">
                निःशुल्क परामर्श
              </Button>
            </Link>
            <Link to="/about">
              <Button size="large" className="bg-transparent border-white text-white hover:bg-white/10">
                हाम्रो बारेमा
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingServicesPage;`;
  }
}

module.exports = LandingPageTemplates;