"use client";

import { useState } from "react";
import {
  Button,
  Card,
  createStyles,
  Flex,
  Form,
  Input,
  Switch,
  Tabs,
  Typography,
} from "@/components";
import { useI18n } from "@/i18n";

const useStyles = createStyles({
  card: {
    border: "1px solid #ebeaf0",
    boxShadow: "0 4px 15px rgba(28,22,49,.035)",
  },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: "#272238" },
  label: { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 },
  sublabel: { fontSize: 12, color: "#6b7280", marginBottom: 16 },
});

export default function SettingsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Flex
      vertical={true}
      style={{
        maxWidth: 1600,
        margin: "0 auto",
      }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Typography style={{ fontSize: 20, fontWeight: 800, color: "#272238" }}>
          {t("admin.settings.title")}
        </Typography>
        <Button type="primary">{t("admin.settings.save")}</Button>
      </Flex>

      <Card className={styles.card} styles={{ body: { padding: 0 } }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "general",
              label: t("admin.settings.tabs.general"),
              children: (
                <div style={{ padding: 24 }}>
                  <Typography className={styles.sectionTitle}>
                    {t("admin.settings.general.title")}
                  </Typography>
                  <div
                    style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
                  />
                  <Form layout="vertical" style={{ maxWidth: 560 }}>
                    <Form.Item label={t("admin.settings.general.platformName")}>
                      <Input defaultValue="Vistara Teknologi Indonesia" />
                    </Form.Item>
                    <Form.Item label={t("admin.settings.general.supportEmail")}>
                      <Input defaultValue="support@vistara.id" />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.general.defaultTimezone")}
                    >
                      <Input defaultValue="Asia/Jakarta" />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.general.maintenanceMode")}
                    >
                      <Switch />
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: "security",
              label: t("admin.settings.tabs.security"),
              children: (
                <div style={{ padding: 24 }}>
                  <Typography className={styles.sectionTitle}>
                    {t("admin.settings.security.title")}
                  </Typography>
                  <div
                    style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
                  />
                  <Form layout="vertical" style={{ maxWidth: 560 }}>
                    <Form.Item
                      label={t("admin.settings.security.sessionTimeout")}
                    >
                      <Input type="number" defaultValue={30} />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.security.maxLoginAttempts")}
                    >
                      <Input type="number" defaultValue={5} />
                    </Form.Item>
                    <Form.Item label={t("admin.settings.security.enforce2FA")}>
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label={t("admin.settings.security.ipWhitelist")}>
                      <Input.TextArea
                        rows={3}
                        placeholder="103.28.14.0/24&#10;103.28.15.0/24"
                      />
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: "notifications",
              label: t("admin.settings.tabs.notifications"),
              children: (
                <div style={{ padding: 24 }}>
                  <Typography className={styles.sectionTitle}>
                    {t("admin.settings.notifications.title")}
                  </Typography>
                  <div
                    style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
                  />
                  <Form layout="vertical" style={{ maxWidth: 560 }}>
                    <Form.Item
                      label={t("admin.settings.notifications.smtpHost")}
                    >
                      <Input defaultValue="smtp.mailprovider.com" />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.notifications.smtpPort")}
                    >
                      <Input defaultValue={587} />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.notifications.emailEnabled")}
                    >
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.notifications.slackEnabled")}
                    >
                      <Switch />
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: "integrations",
              label: t("admin.settings.tabs.integrations"),
              children: (
                <div style={{ padding: 24 }}>
                  <Typography className={styles.sectionTitle}>
                    {t("admin.settings.integrations.title")}
                  </Typography>
                  <div
                    style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
                  />
                  <Form layout="vertical" style={{ maxWidth: 560 }}>
                    <Form.Item
                      label={t("admin.settings.integrations.midtransKey")}
                    >
                      <Input.Password defaultValue="SB-Mid-server-xxxx" />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.integrations.whatsappApi")}
                    >
                      <Input.Password defaultValue="https://graph.facebook.com/v17.0/xxx" />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.integrations.googleMaps")}
                    >
                      <Input.Password defaultValue="AIzaSyxxxx" />
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: "billing",
              label: t("admin.settings.tabs.billing"),
              children: (
                <div style={{ padding: 24 }}>
                  <Typography className={styles.sectionTitle}>
                    {t("admin.settings.billing.title")}
                  </Typography>
                  <div
                    style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
                  />
                  <Form layout="vertical" style={{ maxWidth: 560 }}>
                    <Form.Item label={t("admin.settings.billing.currency")}>
                      <Input defaultValue="IDR" />
                    </Form.Item>
                    <Form.Item label={t("admin.settings.billing.taxRate")}>
                      <Input type="number" defaultValue={11} />
                    </Form.Item>
                    <Form.Item
                      label={t("admin.settings.billing.autoGenerateInvoice")}
                    >
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label={t("admin.settings.billing.gracePeriod")}>
                      <Input type="number" defaultValue={7} />
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
