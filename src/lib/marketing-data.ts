import type { MarketingSiteData } from "./marketing-api"

export const marketingSiteData: MarketingSiteData = {
  home: {
    stats: [
      { id: "salons", value: "500+", labelKey: "marketing.home.stats.salons" },
      { id: "bookings", value: "1M+", labelKey: "marketing.home.stats.bookings" },
      { id: "uptime", value: "99.9%", labelKey: "marketing.home.stats.uptime" },
      { id: "support", value: "7/7", labelKey: "marketing.home.stats.support" },
    ],
    features: [
      { id: "booking", icon: "CalendarOutlined", titleKey: "marketing.features.cards.booking.title", descriptionKey: "marketing.features.cards.booking.description" },
      { id: "pos", icon: "ShoppingCartOutlined", titleKey: "marketing.features.cards.pos.title", descriptionKey: "marketing.features.cards.pos.description" },
      { id: "staff", icon: "TeamOutlined", titleKey: "marketing.features.cards.staff.title", descriptionKey: "marketing.features.cards.staff.description" },
      { id: "inventory", icon: "InboxOutlined", titleKey: "marketing.features.cards.inventory.title", descriptionKey: "marketing.features.cards.inventory.description" },
    ],
  },
  features: {
    groups: [
      {
        id: "customer-experience",
        titleKey: "marketing.features.groups.customer.title",
        descriptionKey: "marketing.features.groups.customer.description",
        cards: [
          { id: "booking", icon: "CalendarOutlined", titleKey: "marketing.features.cards.booking.title", descriptionKey: "marketing.features.cards.booking.description" },
          { id: "members", icon: "ContactsOutlined", titleKey: "marketing.features.cards.members.title", descriptionKey: "marketing.features.cards.members.description" },
          { id: "whatsapp", icon: "MessageOutlined", titleKey: "marketing.features.cards.whatsapp.title", descriptionKey: "marketing.features.cards.whatsapp.description" },
        ],
      },
      {
        id: "operations",
        titleKey: "marketing.features.groups.operations.title",
        descriptionKey: "marketing.features.groups.operations.description",
        cards: [
          { id: "pos", icon: "ShoppingCartOutlined", titleKey: "marketing.features.cards.pos.title", descriptionKey: "marketing.features.cards.pos.description" },
          { id: "staff", icon: "TeamOutlined", titleKey: "marketing.features.cards.staff.title", descriptionKey: "marketing.features.cards.staff.description" },
          { id: "inventory", icon: "InboxOutlined", titleKey: "marketing.features.cards.inventory.title", descriptionKey: "marketing.features.cards.inventory.description" },
          { id: "reports", icon: "BarChartOutlined", titleKey: "marketing.features.cards.reports.title", descriptionKey: "marketing.features.cards.reports.description" },
        ],
      },
    ],
  },
  benefits: {
    cards: [
      { id: "save-time", icon: "ClockCircleOutlined", titleKey: "marketing.benefits.cards.saveTime.title", descriptionKey: "marketing.benefits.cards.saveTime.description" },
      { id: "reduce-no-shows", icon: "NotificationOutlined", titleKey: "marketing.benefits.cards.noShows.title", descriptionKey: "marketing.benefits.cards.noShows.description" },
      { id: "grow-revenue", icon: "RiseOutlined", titleKey: "marketing.benefits.cards.revenue.title", descriptionKey: "marketing.benefits.cards.revenue.description" },
      { id: "clear-decisions", icon: "FundOutlined", titleKey: "marketing.benefits.cards.decisions.title", descriptionKey: "marketing.benefits.cards.decisions.description" },
    ],
    stats: [
      { id: "admin-time", value: "10 hrs", labelKey: "marketing.benefits.stats.adminTime" },
      { id: "no-shows", value: "-35%", labelKey: "marketing.benefits.stats.noShows" },
      { id: "repeat-visits", value: "+24%", labelKey: "marketing.benefits.stats.repeatVisits" },
    ],
  },
  pricing: {
    highlights: [
      { id: "trial", icon: "GiftOutlined", titleKey: "marketing.pricing.highlights.trial.title", descriptionKey: "marketing.pricing.highlights.trial.description" },
      { id: "setup", icon: "ThunderboltOutlined", titleKey: "marketing.pricing.highlights.setup.title", descriptionKey: "marketing.pricing.highlights.setup.description" },
      { id: "support", icon: "CustomerServiceOutlined", titleKey: "marketing.pricing.highlights.support.title", descriptionKey: "marketing.pricing.highlights.support.description" },
    ],
    plans: [
      {
        id: "starter", icon: "ScissorOutlined", name: "marketing.pricing.plans.starter.name", nameKey: "marketing.pricing.plans.starter.name", descriptionKey: "marketing.pricing.plans.starter.description", price: "199000", currency: "IDR", periodKey: "marketing.pricing.perMonth", featured: false, ctaKey: "common.startFreeTrial",
        featureKeys: ["marketing.pricing.features.booking", "marketing.pricing.features.pos", "marketing.pricing.features.members"],
      },
      {
        id: "growth", icon: "RocketOutlined", name: "marketing.pricing.plans.growth.name", nameKey: "marketing.pricing.plans.growth.name", descriptionKey: "marketing.pricing.plans.growth.description", price: "399000", currency: "IDR", periodKey: "marketing.pricing.perMonth", featured: true, ctaKey: "common.startFreeTrial",
        featureKeys: ["marketing.pricing.features.allStarter", "marketing.pricing.features.staff", "marketing.pricing.features.inventory", "marketing.pricing.features.whatsapp", "marketing.pricing.features.reports"],
      },
      {
        id: "multi-branch", icon: "ShopOutlined", name: "marketing.pricing.plans.multiBranch.name", nameKey: "marketing.pricing.plans.multiBranch.name", descriptionKey: "marketing.pricing.plans.multiBranch.description", price: "", currency: "IDR", periodKey: "marketing.pricing.contactUs", featured: false, ctaKey: "common.contactSales",
        featureKeys: ["marketing.pricing.features.allGrowth", "marketing.pricing.features.multiBranch", "marketing.pricing.features.roles", "marketing.pricing.features.prioritySupport"],
      },
    ],
    comparison: [
      { id: "online-booking", labelKey: "marketing.pricing.comparison.booking", values: { starter: true, growth: true, "multi-branch": true } },
      { id: "pos", labelKey: "marketing.pricing.comparison.pos", values: { starter: true, growth: true, "multi-branch": true } },
      { id: "staff", labelKey: "marketing.pricing.comparison.staff", values: { starter: false, growth: true, "multi-branch": true } },
      { id: "inventory", labelKey: "marketing.pricing.comparison.inventory", values: { starter: false, growth: true, "multi-branch": true } },
      { id: "branches", labelKey: "marketing.pricing.comparison.branches", values: { starter: "marketing.pricing.values.oneBranch", growth: "marketing.pricing.values.oneBranch", "multi-branch": "marketing.pricing.values.unlimited" } },
    ],
  },
  about: {
    stats: [
      { id: "founded", value: "2022", labelKey: "marketing.home.about.stats.projects" },
      { id: "team", value: "30+", labelKey: "marketing.home.about.stats.clients" },
      { id: "cities", value: "25+", labelKey: "marketing.home.about.stats.industries" },
      { id: "customers", value: "500+", labelKey: "marketing.home.about.stats.satisfaction" },
    ],
    values: [
      { id: "salon-first", icon: "ShieldOutlined", titleKey: "marketing.about.values.salonFirst.title", descriptionKey: "marketing.about.values.salonFirst.description" },
      { id: "simple", icon: "BulbOutlined", titleKey: "marketing.about.values.simple.title", descriptionKey: "marketing.about.values.simple.description" },
      { id: "reliable", icon: "SafetyCertificateOutlined", titleKey: "marketing.about.values.reliable.title", descriptionKey: "marketing.about.values.reliable.description" },
      { id: "grow-together", icon: "TeamOutlined", titleKey: "marketing.about.values.grow.title", descriptionKey: "marketing.about.values.grow.description" },
    ],
  },
  contact: {
    promises: [
      { id: "fast-response", icon: "MessageOutlined", titleKey: "marketing.contact.promises.response.title", descriptionKey: "marketing.contact.promises.response.description" },
      { id: "tailored-demo", icon: "DesktopOutlined", titleKey: "marketing.contact.promises.demo.title", descriptionKey: "marketing.contact.promises.demo.description" },
      { id: "no-pressure", icon: "SmileOutlined", titleKey: "marketing.contact.promises.noPressure.title", descriptionKey: "marketing.contact.promises.noPressure.description" },
    ],
    info: [
      { id: "email", icon: "MailOutlined", labelKey: "form.email", value: "hello@kasera.id", href: "mailto:hello@kasera.id" },
      { id: "phone", icon: "PhoneOutlined", labelKey: "form.phone", value: "+6285117158205", href: "tel:+62215550199" },
      { id: "address", icon: "EnvironmentOutlined", labelKey: "form.address", value: "Jalan Bhakti Abri RT/RW: 003/008, Kel. Sukamaju Baru, Kec. Tapos, Kota/Kab. Depok, Provinsi Jawa Barat, Indonesia." },
    ],
    businessTypeOptions: [
      { id: "salon", labelKey: "form.options.business.salon" },
      { id: "barbershop", labelKey: "form.options.business.barbershop" },
      { id: "spa", labelKey: "form.options.business.spa" },
      { id: "clinic", labelKey: "form.options.business.clinic" },
      { id: "other", labelKey: "form.options.business.other" },
    ],
    teamSizeOptions: [
      { id: "1-5", labelKey: "form.options.team.oneToFive" },
      { id: "6-15", labelKey: "form.options.team.sixToFifteen" },
      { id: "16-50", labelKey: "form.options.team.sixteenToFifty" },
      { id: "51+", labelKey: "form.options.team.fiftyPlus" },
    ],
    visitBullets: [
      { id: "demo", icon: "CheckCircleOutlined", titleKey: "marketing.contact.visit.demo.title", descriptionKey: "marketing.contact.visit.demo.description" },
      { id: "workflow", icon: "CheckCircleOutlined", titleKey: "marketing.contact.visit.workflow.title", descriptionKey: "marketing.contact.visit.workflow.description" },
      { id: "migration", icon: "CheckCircleOutlined", titleKey: "marketing.contact.visit.migration.title", descriptionKey: "marketing.contact.visit.migration.description" },
    ],
  },
}
