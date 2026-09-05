"use client"

import { Button, Card, Typography } from "@/components"
import { useI18n } from "@/i18n"

const { Title, Text, Paragraph } = Typography

export default function NotFoundPage() {
  const { t } = useI18n()

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#F8FAFC", padding: 20 }}>
      <Card style={{ maxWidth: 560, width: "100%", borderRadius: 20, border: "1px solid #EBF1FF", textAlign: "center" }} styles={{ body: { padding: 28 } }}>
        <Title level={1} style={{ margin: 0, color: "#7C3AED" }}>
          404
        </Title>
        <Title level={3} style={{ marginTop: 8, color: "#1E293B" }}>
          {t("notFound.title")}
        </Title>
        <Paragraph style={{ color: "#64748B", marginBottom: 24 }}>
          {t("notFound.description")}
        </Paragraph>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button type="primary" href="/" style={{ background: "#7C3AED" }}>
            {t("notFound.home")}
          </Button>
          <Button href="/">
            {t("notFound.dashboard")}
          </Button>
        </div>
        <Text style={{ display: "block", marginTop: 20, color: "#64748B" }}>
          {t("notFound.product")}
        </Text>
      </Card>
    </main>
  )
}
