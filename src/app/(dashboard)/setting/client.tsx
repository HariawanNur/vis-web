"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Typography,
} from "@/components";
import { useI18n } from "@/i18n";

const useStyles = createStyles(({ css }) => ({
  page: css`
    max-width: 1600px;
    margin: 0 auto;
  `,
  title: css`
    color: #17132d !important;
    font-size: 23px !important;
    font-weight: 800 !important;
    margin: 0 0 3px !important;
  `,
  subtitle: css`
    color: #858190 !important;
    font-size: 12px;
  `,
  card: css`
    border: 1px solid #ebeaf0 !important;
    box-shadow: 0 4px 15px rgba(28, 22, 49, 0.035) !important;
    .ant-card-body {
      padding: 17px !important;
    }
  `,
  sectionTitle: css`
    color: #272238 !important;
    font-size: 14px;
    font-weight: 800;
  `,
  label: css`
    color: #5f5a6d !important;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    display: block;
  `,
  input: css`
    height: 36px;
  `,
  saveBtn: css`
    box-shadow: 0 7px 16px rgba(101, 50, 214, 0.18);
  `,
  formSection: css`
    margin-bottom: 20px;
  `,
}));

export default function SettingClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const [form] = Form.useForm();

  return (
    <main className={styles.page}>
      <Flex
        justify="space-between"
        align="end"
        gap={12}
        wrap
        style={{ marginBottom: 16 }}
      >
        <div>
          <Typography.Title level={2} className={styles.title}>
            {t("setting.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("setting.subtitle")}
          </Typography>
        </div>
      </Flex>

      <Card className={styles.card}>
        <Tabs
          defaultActiveKey="organization"
          items={[
            {
              key: "organization",
              label: "Organization",
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    name: "Salon Cantik",
                    phone: "+62 812-3456-7890",
                    email: "info@saloncantik.id",
                    address: "Jl. Kemang Raya No. 88, Jakarta Selatan",
                    city: "Jakarta Selatan",
                    province: "DKI Jakarta",
                    timezone: "Asia/Jakarta",
                  }}
                >
                  <div className={styles.formSection}>
                    <Typography className={styles.sectionTitle}>
                      Basic Information
                    </Typography>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={
                            <span className={styles.label}>
                              Organization Name
                            </span>
                          }
                          name="name"
                        >
                          <Input className={styles.input} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={<span className={styles.label}>Phone</span>}
                          name="phone"
                        >
                          <Input className={styles.input} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={<span className={styles.label}>Email</span>}
                          name="email"
                        >
                          <Input className={styles.input} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={<span className={styles.label}>Timezone</span>}
                          name="timezone"
                        >
                          <Select
                            className={styles.input}
                            options={[
                              {
                                label: "Asia/Jakarta (WIB)",
                                value: "Asia/Jakarta",
                              },
                              {
                                label: "Asia/Makassar (WITA)",
                                value: "Asia/Makassar",
                              },
                              {
                                label: "Asia/Jayapura (WIT)",
                                value: "Asia/Jayapura",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          label={<span className={styles.label}>Address</span>}
                          name="address"
                        >
                          <Input.TextArea rows={2} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={<span className={styles.label}>City</span>}
                          name="city"
                        >
                          <Input className={styles.input} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={<span className={styles.label}>Province</span>}
                          name="province"
                        >
                          <Input className={styles.input} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      height: 1,
                      background: "#ebeaf0",
                      margin: "16px 0",
                    }}
                  />
                  <Flex justify="end">
                    <Button
                      type="primary"
                      className={styles.saveBtn}
                      icon={<Icon type="SaveOutlined" />}
                    >
                      {t("setting.save")}
                    </Button>
                  </Flex>
                </Form>
              ),
            },
            {
              key: "outlets",
              label: "Outlets",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Outlet Management
                  </Typography>
                  <Typography
                    className={styles.subtitle}
                    style={{ marginBottom: 12 }}
                  >
                    Manage your salon outlets and locations
                  </Typography>
                  <Button type="primary" icon={<Icon type="PlusOutlined" />}>
                    Add Outlet
                  </Button>
                </div>
              ),
            },
            {
              key: "users",
              label: "Users",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    User Management
                  </Typography>
                  <Typography
                    className={styles.subtitle}
                    style={{ marginBottom: 12 }}
                  >
                    Manage system users and access
                  </Typography>
                  <Button type="primary" icon={<Icon type="PlusOutlined" />}>
                    Add User
                  </Button>
                </div>
              ),
            },
            {
              key: "roles",
              label: "Roles & Permissions",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Roles & Permissions
                  </Typography>
                  <Typography
                    className={styles.subtitle}
                    style={{ marginBottom: 12 }}
                  >
                    Configure role-based access control
                  </Typography>
                  <Space orientation="vertical" style={{ width: "100%" }}>
                    {[
                      "Admin",
                      "Manager",
                      "Stylist",
                      "Cashier",
                      "Therapist",
                    ].map((role) => (
                      <Flex
                        key={role}
                        justify="space-between"
                        align="center"
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0eff4",
                        }}
                      >
                        <Typography.Text strong>{role}</Typography.Text>
                        <Button
                          size="small"
                          icon={<Icon type="EditOutlined" />}
                        >
                          Edit
                        </Button>
                      </Flex>
                    ))}
                  </Space>
                </div>
              ),
            },
            {
              key: "services",
              label: "Services",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Service Catalog
                  </Typography>
                  <Typography
                    className={styles.subtitle}
                    style={{ marginBottom: 12 }}
                  >
                    Manage services and pricing
                  </Typography>
                  <Button type="primary" icon={<Icon type="PlusOutlined" />}>
                    Add Service
                  </Button>
                </div>
              ),
            },
            {
              key: "payment",
              label: "Payment",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Payment Settings
                  </Typography>
                  <Space orientation="vertical" style={{ width: "100%" }}>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>Cash</Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          Accept cash payments
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>QRIS</Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          QR code payments
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>
                          Debit/Credit Card
                        </Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          Card terminal
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ padding: "8px 0" }}
                    >
                      <div>
                        <Typography.Text strong>Bank Transfer</Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          Manual transfer verification
                        </Typography.Text>
                      </div>
                      <Switch />
                    </Flex>
                  </Space>
                </div>
              ),
            },
            {
              key: "booking",
              label: "Booking Policy",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Booking Policy
                  </Typography>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span className={styles.label}>
                            Advance Booking (days)
                          </span>
                        }
                      >
                        <Input className={styles.input} defaultValue="30" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span className={styles.label}>
                            Cancellation Window (hours)
                          </span>
                        }
                      >
                        <Input className={styles.input} defaultValue="24" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span className={styles.label}>No-show Fee</span>
                        }
                      >
                        <Input
                          className={styles.input}
                          defaultValue="Rp 50.000"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span className={styles.label}>Deposit Required</span>
                        }
                      >
                        <Switch defaultChecked />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: "whatsapp",
              label: "WhatsApp",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    WhatsApp Integration
                  </Typography>
                  <Space orientation="vertical" style={{ width: "100%" }}>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>
                          Auto Confirmation
                        </Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          Send booking confirmation via WhatsApp
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>
                          Appointment Reminder
                        </Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          24h before appointment
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ padding: "8px 0" }}
                    >
                      <div>
                        <Typography.Text strong>Review Request</Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          After service completed
                        </Typography.Text>
                      </div>
                      <Switch defaultChecked />
                    </Flex>
                  </Space>
                </div>
              ),
            },
            {
              key: "audit",
              label: "Audit Log",
              children: (
                <div>
                  <Typography className={styles.sectionTitle}>
                    Audit Log
                  </Typography>
                  <Typography className={styles.subtitle}>
                    System activity and change history
                  </Typography>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
